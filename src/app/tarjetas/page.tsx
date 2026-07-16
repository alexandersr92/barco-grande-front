import type { Metadata } from "next";
import { getProducts } from "@/lib/strapi";
import CategoryHero from "@/components/CategoryHero";
import CategoryFilterNav from "@/components/CategoryFilterNav";
import ProductListing from "@/components/ProductListing";
import DocumentDownloadList from "@/components/DocumentDownloadList";

export const metadata: Metadata = {
  title: "Tarjetas",
  description: "Tarjetas de débito y crédito Avanz.",
};

// Documentación general de tarjetas (diseño 1506:51567).
const CARD_DOCUMENTS = [
  { id: 1, label: "Coberturas y sumas aseguradas", href: "#" },
  { id: 2, label: "Tabla de costos de tarjetas de crédito", href: "#" },
  { id: 3, label: "Información 3D Secure by Visa", href: "#" },
];

export default async function TarjetasPage() {
  const products = await getProducts({ category: "tarjeta", audience: "personas" });

  return (
    <>
      <CategoryHero
        title="Tarjetas"
        subtitle="¡Obtén una tarjeta de débito o crédito a tu medida! Vos podés personalizarla."
        backgroundImage="/images/category-hero-cards.jpg"
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
      <ProductListing products={products} emphasized tall alternate={false} />
      <DocumentDownloadList items={CARD_DOCUMENTS} />
    </>
  );
}
