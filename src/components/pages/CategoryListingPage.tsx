import { getProducts } from "@/lib/strapi";
import type { CategoryPageConfig } from "@/lib/categoryPages";
import CategoryHero from "@/components/CategoryHero";
import CategoryFilterNav from "@/components/CategoryFilterNav";
import ProductListing from "@/components/ProductListing";
import DocumentDownloadList from "@/components/DocumentDownloadList";

// Página de listado de una categoría de producto para una audiencia dada.
// Los productos se filtran por categoría + audiencia, así /personas/cuentas y
// /empresas/cuentas muestran contenidos distintos con la misma plantilla.
export default async function CategoryListingPage({
  config,
  audience,
}: {
  config: CategoryPageConfig;
  audience: string;
}) {
  const products = await getProducts({ category: config.category, audience });

  return (
    <>
      <CategoryHero
        title={config.title}
        subtitle={config.subtitle}
        backgroundImage={config.backgroundImage}
        ctaLabel="Solicitala aquí"
        ctaHref={`/${audience}/canales-de-atencion`}
      />
      <CategoryFilterNav
        items={products.map((p) => ({
          id: p.documentId,
          label: p.name,
          href: `#${p.slug}`,
        }))}
      />
      <ProductListing
        products={products}
        emphasized={config.emphasized}
        tall={config.tall}
        alternate={config.alternate ?? true}
      />
      {config.documents && config.documents.length > 0 && (
        <DocumentDownloadList items={config.documents} />
      )}
    </>
  );
}
