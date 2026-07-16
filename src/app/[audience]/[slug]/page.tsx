import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPage } from "@/lib/strapi";
import BlockRenderer from "@/components/BlockRenderer";
import PageHero from "@/components/PageHero";

// Páginas de una audiencia: /personas/cuentas, /empresas/cuentas, etc.
// Misma estructura, contenido distinto según la audiencia — todo se compone
// desde Strapi con la dynamic zone de secciones.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ audience: string; slug: string }>;
}): Promise<Metadata> {
  const { audience, slug } = await params;
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
  const page = await getPage(slug, audience);
  if (!page) notFound();

  const hasHero = page.sections.some(
    (s) => s.__component === "sections.hero" || s.__component === "sections.category-hero",
  );

  return (
    <>
      {!hasHero && <PageHero title={page.title} />}
      <BlockRenderer sections={page.sections} />
    </>
  );
}
