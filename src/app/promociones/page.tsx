import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import PromotionsList from "@/components/sections/PromotionsList";

export const metadata: Metadata = {
  title: "Promociones",
  description: "Promociones vigentes de Banco Avanz.",
};

export default function PromocionesPage() {
  return (
    <>
      <PageHero title="¡Entérate de las promociones que Avanz tiene para vos!" />
      <PromotionsList heading="Promociones vigentes" limit={100} />
    </>
  );
}
