import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ProductGrid from "@/components/sections/ProductGrid";

export const metadata: Metadata = {
  title: "Seguros",
  description: "Seguros de vida, vehiculares y de protección Avanz.",
};

export default function SegurosPage() {
  return (
    <>
      <PageHero
        title="Seguros"
        subtitle="Protección para vos, tu familia y tu patrimonio"
      />
      <ProductGrid category="seguro" audience="personas" />
    </>
  );
}
