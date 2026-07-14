import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ProductGrid from "@/components/sections/ProductGrid";

export const metadata: Metadata = {
  title: "Transferencias",
  description: "Transferencias nacionales e internacionales Avanz.",
};

export default function TransferenciasPage() {
  return (
    <>
      <PageHero
        title="Transferencias"
        subtitle="Enviá y recibí dinero de forma rápida y segura"
      />
      <ProductGrid category="transferencia" audience="personas" />
    </>
  );
}
