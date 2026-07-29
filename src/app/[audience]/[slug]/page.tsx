import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPage } from "@/lib/strapi";
import BlockRenderer from "@/components/BlockRenderer";
import Hero from "@/components/sections/Hero";

// Páginas de una audiencia: /personas/cuentas, /empresas/tarjetas, etc.
// 100% dirigidas por Strapi: cada page define su audiencia, slug y secciones
// (dynamic zone). Si no existe una página específica para la audiencia se
// busca el slug en cualquier audiencia (contenido compartido, como
// zona-digital o canales-de-atencion, que son iguales para todas).
async function resolvePage(slug: string, audience: string) {
  return (await getPage(slug, audience)) ?? (await getPage(slug));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ audience: string; slug: string }>;
}): Promise<Metadata> {
  const { audience, slug } = await params;
  const page = await resolvePage(slug, audience);
  return {
    // metaTitle del CMS es el título completo (sin re-aplicar el template
    // "%s | Banco Avanz" del layout, que lo duplicaría).
    title: page?.seo?.metaTitle
      ? { absolute: page.seo.metaTitle }
      : (page?.title ?? "Banco Avanz"),
    description: page?.seo?.metaDescription ?? undefined,
  };
}

export default async function AudiencePage({
  params,
}: {
  params: Promise<{ audience: string; slug: string }>;
}) {
  const { audience, slug } = await params;
  const page = await resolvePage(slug, audience);
  if (!page) notFound();

  const hasHero = page.sections.some(
    (s) => s.__component === "sections.hero" || s.__component === "sections.app-banner",
  );

  return (
    <>
      {!hasHero && <Hero layout="plain" title={page.title} />}
      <BlockRenderer sections={page.sections} />
    </>
  );
}
