import type { Metadata } from "next";
import { getProducts } from "@/lib/strapi";
import PageHero from "@/components/PageHero";
import ProductListing from "@/components/ProductListing";

export const metadata: Metadata = {
  title: "Tarjetas",
  description: "Tarjetas de débito y crédito Avanz.",
};

export default async function TarjetasPage() {
  const products = await getProducts({ category: "tarjeta", audience: "personas" });

  return (
    <>
      <PageHero
        title="Tarjetas"
        subtitle="Para vos que buscas algo diferente, porque somos distintos"
      />
      <ProductListing products={products} />
    </>
  );
}
