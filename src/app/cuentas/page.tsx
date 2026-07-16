import type { Metadata } from "next";
import { getProducts } from "@/lib/strapi";
import CategoryHero from "@/components/CategoryHero";
import CategoryFilterNav from "@/components/CategoryFilterNav";
import ProductListing from "@/components/ProductListing";

export const metadata: Metadata = {
  title: "Cuentas",
  description: "Cuentas de ahorro y corriente para personas.",
};

export default async function CuentasPage() {
  const products = await getProducts({ category: "cuenta", audience: "personas" });

  return (
    <>
      <CategoryHero
        title="Cuentas"
        subtitle="Asegura tu dinero, ahorra y recibe beneficios."
        backgroundImage="/images/category-hero-family.jpg"
        ctaLabel="Solicitala aquí"
        ctaHref="/canales-de-atencion"
      />
      <CategoryFilterNav
        items={products.map((p) => ({
          id: p.documentId,
          label: p.name,
          href: `#${p.slug}`,
        }))}
      />
      <ProductListing products={products} />
    </>
  );
}
