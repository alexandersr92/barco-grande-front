import type { Product } from "@/lib/strapi";
import ProductShowcase from "@/components/sections/ProductShowcase";

// Lista de productos como secciones alternadas (imagen izquierda/derecha),
// siguiendo el patrón de las páginas de categoría del diseño (fondo blanco
// continuo, sin franjas; cada sección es un ancla para PillNav).
// `emphasized`/`tall` activan la variante tarjetas (texto negrita, foto
// retrato con la tarjeta flotante superpuesta).
export default function ProductListing({
  products,
  emphasized = false,
  tall = false,
  alternate = true,
  ctaLabel = "Solicitala aqui",
  detailLabel = "Ver más detalles",
}: {
  products: Product[];
  emphasized?: boolean;
  tall?: boolean;
  /** Alterna imagen izquierda/derecha (cuentas). En tarjetas es siempre izquierda. */
  alternate?: boolean;
  /** Textos de los botones de cada producto (editables desde la sección). */
  ctaLabel?: string;
  detailLabel?: string;
}) {
  return (
    <div className="bg-white">
      {products.map((product, i) => (
        <ProductShowcase
          key={product.documentId}
          id={product.slug}
          heading={product.name}
          description={product.shortDescription}
          features={product.features}
          photo={product.photo}
          cardImage={product.cardImage}
          imageLeft={alternate ? i % 2 === 0 : true}
          emphasized={emphasized}
          tall={tall}
          buttons={[
            {
              id: 1,
              label: ctaLabel,
              url: `/productos/${product.slug}`,
              variant: "primary",
            },
            {
              id: 2,
              label: detailLabel,
              url: `/productos/${product.slug}`,
              variant: "link",
            },
          ]}
        />
      ))}
    </div>
  );
}
