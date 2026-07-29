import type { Metadata } from "next";
import { getPage } from "@/lib/strapi";
import BlockRenderer from "@/components/BlockRenderer";
import Hero from "@/components/sections/Hero";
import PromotionsList from "@/components/sections/PromotionsList";

export const metadata: Metadata = {
  title: "Promociones",
  description: "Promociones vigentes de Banco Avanz.",
};

// El contenido (hero + listado) se edita desde Strapi (page slug
// "promociones", sin audiencia). Fallback hardcodeado si aún no existe.
export default async function PromocionesPage() {
  const page = await getPage("promociones");
  if (page?.sections?.length) {
    return <BlockRenderer sections={page.sections} />;
  }
  return (
    <>
      <Hero layout="plain" title="¡Entérate de las promociones que Avanz tiene para vos!" />
      <PromotionsList heading="Promociones vigentes" limit={100} />
    </>
  );
}
