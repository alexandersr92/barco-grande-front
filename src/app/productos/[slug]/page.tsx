import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getProduct, getProducts } from "@/lib/strapi";
import ProductShowcase from "@/components/sections/ProductShowcase";
import { CheckIcon } from "@/components/ui";

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  return {
    title: product?.name ?? "Producto",
    description: product?.shortDescription ?? undefined,
  };
}

const CATEGORY_LABEL: Record<string, { label: string; url: string }> = {
  cuenta: { label: "Cuentas", url: "/cuentas" },
  tarjeta: { label: "Tarjetas", url: "/tarjetas" },
  credito: { label: "Créditos", url: "/creditos" },
  seguro: { label: "Seguros", url: "/seguros" },
  transferencia: { label: "Transferencias", url: "/transferencias" },
  servicio: { label: "Servicios", url: "/servicios" },
};

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  const category = CATEGORY_LABEL[product.category];

  return (
    <>
      {/* Migas de pan */}
      <div className="bg-surface">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-3 text-sm font-semibold text-muted">
          <Link href="/" className="hover:text-primary">
            Inicio
          </Link>
          <span>/</span>
          <Link href={category.url} className="hover:text-primary">
            {category.label}
          </Link>
          <span>/</span>
          <span className="text-secondary">{product.name}</span>
        </div>
      </div>

      <ProductShowcase
        heading={product.name}
        description={product.shortDescription}
        features={product.features}
        photo={product.photo}
        cardImage={product.cardImage}
        buttons={[
          { id: 1, label: "Solicitala aqui", url: "/canales-de-atencion", variant: "primary" },
        ]}
      />

      {product.description && (
        <section className="bg-surface py-16">
          <div className="mx-auto max-w-4xl px-4">
            <h2 className="mb-6 text-3xl font-bold tracking-[-1px] text-secondary">
              Lo que debes saber
            </h2>
            <p className="text-[17px] font-semibold leading-7 text-muted">
              {product.description}
            </p>
          </div>
        </section>
      )}

      {(product.benefits?.length || product.requirements?.length) && (
        <section className="mx-auto grid max-w-7xl gap-12 px-4 py-16 md:grid-cols-2">
          {product.benefits && product.benefits.length > 0 && (
            <div>
              <h2 className="mb-6 text-3xl font-bold tracking-[-1px] text-secondary">
                Beneficios
              </h2>
              <ul className="space-y-3">
                {product.benefits.map((b) => (
                  <li key={b.id} className="flex items-start gap-3">
                    <CheckIcon />
                    <span className="text-[16px] font-semibold leading-7 text-muted">
                      {b.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {product.requirements && product.requirements.length > 0 && (
            <div>
              <h2 className="mb-6 text-3xl font-bold tracking-[-1px] text-secondary">
                Requisitos generales
              </h2>
              <ul className="space-y-3">
                {product.requirements.map((r) => (
                  <li key={r.id} className="flex items-start gap-3">
                    <CheckIcon />
                    <span className="text-[16px] font-semibold leading-7 text-muted">
                      {r.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      )}
    </>
  );
}
