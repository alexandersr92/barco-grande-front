import type { Metadata } from "next";
import { getPage } from "@/lib/strapi";
import BlockRenderer from "@/components/BlockRenderer";
import NewsList from "@/components/sections/NewsList";
import Hero from "@/components/sections/Hero";

export const metadata: Metadata = {
  title: "Noticias",
  description: "Noticias de Banco Avanz.",
};

// El contenido (hero + listado) se edita desde Strapi (page slug "noticias",
// sin audiencia). El fallback hardcodeado cubre el caso de backend sin esa
// página todavía.
export default async function NoticiasPage() {
  const page = await getPage("noticias");
  if (page?.sections?.length) {
    return <BlockRenderer sections={page.sections} />;
  }
  return (
    <>
      <Hero layout="plain" title="Noticias Avanz" />
      <NewsList heading="Últimas noticias" limit={100} />
    </>
  );
}
