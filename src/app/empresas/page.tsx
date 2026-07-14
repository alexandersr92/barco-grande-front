import type { Metadata } from "next";
import { getProducts } from "@/lib/strapi";
import PageHero from "@/components/PageHero";
import ProductListing from "@/components/ProductListing";

export const metadata: Metadata = {
  title: "Empresas",
  description: "Soluciones financieras para tu empresa.",
};

export default async function EmpresasPage() {
  const products = await getProducts({ audience: "empresas" });

  return (
    <>
      <PageHero
        title="Empresas"
        subtitle="Consolida todas las necesidades financieras de tu empresa en un solo lugar"
      />
      <ProductListing products={products} />
    </>
  );
}
