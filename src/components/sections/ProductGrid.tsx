import { getProducts } from "@/lib/strapi";
import { CtaButton } from "@/components/ui";

export default async function ProductGrid({
  heading,
  category,
  audience,
}: {
  heading?: string;
  category?: string;
  audience?: string;
}) {
  const products = await getProducts({ category, audience });
  if (products.length === 0) return null;

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
                  label: "Solicitala aqui",
                  url: `/productos/${product.slug}`,
                  variant: "primary",
                }}
              />
              <CtaButton
                button={{
                  id: -product.id,
                  label: "Ver más detalles",
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
