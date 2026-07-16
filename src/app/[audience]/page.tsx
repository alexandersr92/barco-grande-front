import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAudiences, getPage } from "@/lib/strapi";
import BlockRenderer from "@/components/BlockRenderer";

// Home de cada audiencia: /personas, /empresas, /sobre-nosotros.
// Renderiza la página con slug "inicio" de esa audiencia.
export async function generateStaticParams() {
  const audiences = await getAudiences();
  return audiences.map((a) => ({ audience: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ audience: string }>;
}): Promise<Metadata> {
  const { audience } = await params;
  const page = await getPage("inicio", audience);
  return {
    title: page?.seo?.metaTitle ?? page?.title ?? "Banco Avanz",
    description: page?.seo?.metaDescription ?? undefined,
  };
}

export default async function AudienceHomePage({
  params,
}: {
  params: Promise<{ audience: string }>;
}) {
  const { audience } = await params;
  const page = await getPage("inicio", audience);
  if (!page) notFound();

  return <BlockRenderer sections={page.sections} />;
}
