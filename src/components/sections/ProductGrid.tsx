import { getProducts } from "@/lib/strapi";
import { CtaButton } from "@/components/ui";
import PillNav from "@/components/sections/PillNav";
import ProductListing from "@/components/ProductListing";

export interface ProductGridProps {
  heading?: string;
  category?: string;
  audience?: string;
  /** listing: showcases apilados con barra de píldoras (páginas de categoría).
   * grid: tarjetas en cuadrícula (default). */
  layout?: "grid" | "listing";
  tall?: boolean;
  emphasized?: boolean;
  alternate?: boolean;
  ctaLabel?: string;
  detailLabel?: string;
}

export default async function ProductGrid({
  heading,
  category,
  audience,
  layout = "grid",
  tall = false,
  emphasized = false,
  alternate = true,
  ctaLabel,
  detailLabel,
}: ProductGridProps) {
  const products = await getProducts({ category, audience });
  if (products.length === 0) return null;

  if (layout === "listing") {
    return (
      <>
        <PillNav
          items={products.map((p) => ({
            id: p.id,
            label: p.name,
            url: `#${p.slug}`,
          }))}
        />
        <ProductListing
          products={products}
          emphasized={emphasized}
          tall={tall}
          alternate={alternate}
          ctaLabel={ctaLabel || undefined}
          detailLabel={detailLabel || undefined}
        />
      </>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-20">
      {heading && (
        <h2 className="mb-10 text-center text-4xl font-bold tracking-[-1px] text-secondary">
          {heading}
        </h2>
      )}
      <div className="grid gap-8 md:grid-cols-2">
        {products.map((product) => (
          <div
            key={product.documentId}
            className="flex flex-col gap-4 rounded-lg border border-gray-100 bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
          >
            <h3 className="text-2xl font-bold text-secondary">{product.name}</h3>
            <p className="flex-1 text-[15px] leading-6 text-muted">
              {product.shortDescription}
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <CtaButton
                button={{
                  id: product.id,
                  label: ctaLabel || "Solicitala aqui",
                  url: `/productos/${product.slug}`,
                  variant: "primary",
                }}
              />
              <CtaButton
                button={{
                  id: -product.id,
                  label: detailLabel || "Ver más detalles",
                  url: `/productos/${product.slug}`,
                  variant: "link",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
