import type { Product } from "@/lib/strapi";
import ProductShowcase from "@/components/sections/ProductShowcase";

// Lista de productos como secciones alternadas (imagen izquierda/derecha),
// siguiendo el patrón de las páginas de categoría del diseño.
export default function ProductListing({ products }: { products: Product[] }) {
  return (
    <>
      {products.map((product, i) => (
        <div key={product.documentId} className={i % 2 === 1 ? "bg-surface" : ""}>
          <ProductShowcase
            heading={product.name}
            description={product.shortDescription}
            features={product.features}
            photo={product.photo}
            cardImage={product.cardImage}
            imageLeft={i % 2 === 0}
            buttons={[
              {
                id: 1,
                label: "Solicitala aqui",
                url: `/productos/${product.slug}`,
                variant: "primary",
              },
              {
                id: 2,
                label: "Ver más detalles",
                url: `/productos/${product.slug}`,
                variant: "link",
              },
            ]}
          />
        </div>
      ))}
    </>
  );
}
