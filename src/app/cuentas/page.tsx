import type { Metadata } from "next";
import { getProducts } from "@/lib/strapi";
import PageHero from "@/components/PageHero";
import ProductListing from "@/components/ProductListing";

export const metadata: Metadata = {
  title: "Cuentas",
  description: "Cuentas de ahorro y corriente para personas.",
};

export default async function CuentasPage() {
  const products = await getProducts({ category: "cuenta", audience: "personas" });

  return (
    <>
      <PageHero
        title="Cuentas"
        subtitle="Te brindamos las mejores soluciones para tu ahorro"
      />
      <ProductListing products={products} />
    </>
  );
}
