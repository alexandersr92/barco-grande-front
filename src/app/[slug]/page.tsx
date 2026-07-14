import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPage } from "@/lib/strapi";
import BlockRenderer from "@/components/BlockRenderer";
import PageHero from "@/components/PageHero";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPage(slug);
  return {
    title: page?.seo?.metaTitle ?? page?.title ?? "Banco Avanz",
    description: page?.seo?.metaDescription ?? undefined,
  };
}

export default async function GenericPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = await getPage(slug);
  if (!page) notFound();

  const hasHero = page.sections.some((s) => s.__component === "sections.hero");

  return (
    <>
      {!hasHero && <PageHero title={page.title} />}
      <BlockRenderer sections={page.sections} />
    </>
  );
}
