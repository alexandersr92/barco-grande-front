import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPage } from "@/lib/strapi";
import { CATEGORY_PAGES } from "@/lib/categoryPages";
import BlockRenderer from "@/components/BlockRenderer";
import PageHero from "@/components/PageHero";
import CategoryListingPage from "@/components/pages/CategoryListingPage";
import ChannelsPage from "@/components/pages/ChannelsPage";
import ZonaDigitalBody from "@/components/pages/ZonaDigitalBody";

// Audiencias válidas para las plantillas de listado (evita que /xyz/cuentas
// intente listar productos de una audiencia inexistente).
const PRODUCT_AUDIENCES = new Set(["personas", "empresas"]);

const SPECIAL_TITLES: Record<string, string> = {
  "canales-de-atencion": "Canales de atención",
  "zona-digital": "Zona Digital",
};

// Páginas de una audiencia: /personas/cuentas, /empresas/cuentas, etc.
// Dos orígenes de contenido:
//  - Plantillas de listado (productos/canales/zona digital), cuyo contenido se
//    filtra por audiencia desde Strapi.
//  - Páginas compuestas con la dynamic zone de secciones (Sobre nosotros…).
export async function generateMetadata({
  params,
}: {
  params: Promise<{ audience: string; slug: string }>;
}): Promise<Metadata> {
  const { audience, slug } = await params;
  const catConfig = CATEGORY_PAGES[slug];
  if (catConfig) return { title: catConfig.title };
  if (SPECIAL_TITLES[slug]) return { title: SPECIAL_TITLES[slug] };

  const page = await getPage(slug, audience);
  return {
    title: page?.seo?.metaTitle ?? page?.title ?? "Banco Avanz",
    description: page?.seo?.metaDescription ?? undefined,
  };
}

export default async function AudiencePage({
  params,
}: {
  params: Promise<{ audience: string; slug: string }>;
}) {
  const { audience, slug } = await params;

  // Plantillas de listado: contenido filtrado por audiencia.
  const catConfig = CATEGORY_PAGES[slug];
  if (catConfig && PRODUCT_AUDIENCES.has(audience)) {
    return <CategoryListingPage config={catConfig} audience={audience} />;
  }
  if (slug === "canales-de-atencion") return <ChannelsPage />;
  if (slug === "zona-digital") return <ZonaDigitalBody />;

  // Páginas compuestas desde Strapi (Sobre nosotros, etc.)
  const page = await getPage(slug, audience);
  if (!page) notFound();

  const hasHero = page.sections.some(
    (s) =>
      s.__component === "sections.hero" ||
      s.__component === "sections.category-hero",
  );

  return (
    <>
      {!hasHero && <PageHero title={page.title} />}
      <BlockRenderer sections={page.sections} />
    </>
  );
}
