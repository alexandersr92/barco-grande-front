import CategoryHero from "@/components/CategoryHero";
import CategoryFilterNav from "@/components/CategoryFilterNav";
import DocumentDownloadList from "@/components/DocumentDownloadList";
import ProductShowcase from "@/components/sections/ProductShowcase";
import { getProducts } from "@/lib/strapi";

// Página de Tarjetas para Empresas (diseño Figma 1517:21038): a diferencia del
// listado genérico de /personas/tarjetas, este diseño es fijo — dos tarjetas
// (Business y Débito) con foto + tarjeta flotante rotada (ProductShowcase con
// tall=true). El contenido (textos, features, fotos y la tarjeta flotante) se
// edita desde Strapi como productos audience=empresas category=tarjeta.
const DOCUMENTS = [
  { id: 1, label: "Coberturas y sumas aseguradas", href: "#" },
  { id: 2, label: "Tabla de costos de tarjetas de crédito", href: "#" },
  { id: 3, label: "Información 3D Secure by Visa", href: "#" },
];

export default async function EmpresasTarjetasPage() {
  const products = await getProducts({ audience: "empresas", category: "tarjeta" });

  return (
    <>
      <CategoryHero
        title="Tarjetas"
        subtitle="¡Obtén una tarjeta de débito o crédito a tu medida para tu negocio! Vos podés personalizarla."
        backgroundImage="/images/empresas-tarjetas-hero.jpg"
        ctaLabel="Solicitala aquí"
        ctaHref="/empresas/canales-de-atencion"
      />
      <CategoryFilterNav
        items={products.map((p) => ({
          id: p.slug,
          label: p.name,
          href: `#${p.slug}`,
        }))}
      />
      {products.map((p) => (
        <ProductShowcase
          key={p.id}
          id={p.slug}
          heading={p.name}
          description={p.shortDescription}
          features={p.features}
          photo={p.photo}
          cardImage={p.cardImage}
          tall
          buttons={[
            { id: 1, label: "Solicitala aqui", url: `/productos/${p.slug}`, variant: "primary" },
            { id: 2, label: "Ver más detalles", url: `/productos/${p.slug}`, variant: "link" },
          ]}
        />
      ))}
      <DocumentDownloadList items={DOCUMENTS} />
    </>
  );
}
