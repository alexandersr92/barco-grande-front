import type { Metadata } from "next";
import { getProducts } from "@/lib/strapi";
import PageHero from "@/components/PageHero";
import ProductListing from "@/components/ProductListing";

export const metadata: Metadata = {
  title: "Créditos",
  description: "Créditos personales, de vivienda y de vehículo.",
};

export default async function CreditosPage() {
  const products = await getProducts({ category: "credito", audience: "personas" });

  return (
    <>
      <PageHero
        title="Créditos"
        subtitle="Llevá a cabo tus metas con un crédito rápido y fácil"
      />
      <ProductListing products={products} />
    </>
  );
}
