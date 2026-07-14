import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ProductGrid from "@/components/sections/ProductGrid";

export const metadata: Metadata = {
  title: "Otros Servicios",
  description: "Pago de servicios, mesa de cambio y garantías bancarias.",
};

export default function ServiciosPage() {
  return (
    <>
      <PageHero
        title="Otros Servicios"
        subtitle="Más soluciones para tu día a día"
      />
      <ProductGrid category="servicio" audience="personas" />
    </>
  );
}
