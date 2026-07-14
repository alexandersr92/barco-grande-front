import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getProduct, getProducts, getStrapiMedia } from "@/lib/strapi";
import ProductTabs from "@/components/ProductTabs";
import FaqAccordion from "@/components/FaqAccordion";
import RewardPlans from "@/components/RewardPlans";

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

function BreadcrumbSeparator() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden className="text-muted">
      <path
        d="M4.5 2.5 8 6l-3.5 3.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  const category = CATEGORY_LABEL[product.category];
  const audienceLabel =
    product.audience === "empresas" ? "Banca Empresas" : "Banca Personas";
  const audienceUrl = product.audience === "empresas" ? "/empresas" : "/";
  const photoUrl = getStrapiMedia(product.photo);
  const promoUrl = getStrapiMedia(product.promoImage);
  const cardUrl = getStrapiMedia(product.cardImage);

  return (
    <>
      {/* Migas de pan */}
      <div className="mx-auto flex max-w-[1220px] flex-wrap items-center gap-2.5 px-10 py-[19px] text-sm leading-[22.4px]">
        <Link href="/" className="text-primary hover:text-primary-dark">
          Inicio
        </Link>
        <BreadcrumbSeparator />
        <Link href={audienceUrl} className="text-primary hover:text-primary-dark">
          {audienceLabel}
        </Link>
        <BreadcrumbSeparator />
        <Link href={category.url} className="text-primary hover:text-primary-dark">
          {category.label}
        </Link>
        <BreadcrumbSeparator />
        <span className="text-muted">{product.name}</span>
      </div>

      {/* Banner producto */}
      {product.heroTheme === "dark" ? (
        // Variante oscura para tarjetas de crédito: gradiente configurable
        // desde Strapi, ala decorativa y tarjeta flotante
        <section
          className="relative overflow-hidden"
          style={{
            background:
              product.heroGradient ??
              "linear-gradient(90deg, #272727 0%, #808080 100%)",
          }}
        >
          <div className="mx-auto flex max-w-[1220px] flex-col items-center px-8 py-12 lg:min-h-[417px] lg:flex-row lg:py-0">
            <div className="w-full py-4 lg:w-[38%]">
              <h1 className="max-w-[340px] pb-5 text-[40px] leading-[1.15] tracking-[-1px] text-white md:text-[56px]">
                {product.name}
              </h1>
              {product.shortDescription && (
                <p className="max-w-[420px] pb-5 text-[17px] leading-7 text-white">
                  {product.shortDescription}
                </p>
              )}
              <Link
                href="/canales-de-atencion"
                className="inline-block bg-white px-[30px] pb-[15px] pt-[14px] text-base font-medium leading-[22.4px] text-primary transition-colors hover:bg-primary hover:text-white"
              >
                Solicitalá aquí
              </Link>
            </div>
            <div className="relative hidden min-h-[417px] flex-1 lg:block">
              <Image
                src="/icons/avanz-wing-watermark.svg"
                alt=""
                width={378}
                height={380}
                className="absolute left-[10%] top-[-40px] w-[378px] mix-blend-lighten"
              />
              {cardUrl && (
                <Image
                  src={cardUrl}
                  alt={product.name}
                  width={318}
                  height={345}
                  priority
                  className="absolute left-[45%] top-[40px] w-[318px] drop-shadow-2xl"
                />
              )}
            </div>
          </div>
        </section>
      ) : (
        // Variante clara: banda gris con foto y franja naranja
        <section className="bg-surface">
          <div className="flex flex-col lg:h-[600px] lg:flex-row">
            <div className="flex items-center justify-center px-8 py-16 lg:w-[38%] lg:px-0 lg:py-0">
              <div className="w-full max-w-[450px]">
                <h1 className="pb-5 text-[40px] leading-[1.15] tracking-[-1px] text-secondary md:text-[56px]">
                  {product.name}
                </h1>
                {product.shortDescription && (
                  <p className="text-[17px] leading-7 text-muted">
                    {product.shortDescription}
                  </p>
                )}
              </div>
            </div>
            <div className="relative min-h-[280px] flex-1 lg:min-h-0">
              {photoUrl ? (
                <Image
                  src={photoUrl}
                  alt={product.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 62vw"
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-secondary to-secondary-dark" />
              )}
              <div className="absolute inset-x-0 bottom-0 h-3 bg-primary" />
            </div>
          </div>
        </section>
      )}

      {/* Feature boxes con íconos (tarjetas de crédito) */}
      {product.featureBoxes && product.featureBoxes.length > 0 && (
        <section className="mx-auto max-w-[1220px] px-5 pt-[95px]">
          {product.featuresHeading && (
            <h2 className="whitespace-pre-line pb-16 text-center text-[34px] leading-[1.2] tracking-[-1px] text-secondary md:text-[44px]">
              {product.featuresHeading}
            </h2>
          )}
          <div className="grid gap-y-12 md:grid-cols-3 md:divide-x md:divide-line">
            {product.featureBoxes.map((box) => {
              const iconUrl = getStrapiMedia(box.icon);
              return (
                <div
                  key={box.id}
                  className="flex flex-col items-center gap-[15px] px-14 text-center"
                >
                  {iconUrl && (
                    <Image
                      src={iconUrl}
                      alt=""
                      width={72}
                      height={72}
                      className="h-[72px] w-[72px] object-contain"
                    />
                  )}
                  <h3 className="text-[24px] leading-[1.3] tracking-[-1px] text-secondary md:text-[28px]">
                    {box.title}
                  </h3>
                  <p className="text-[17px] leading-7 text-muted">{box.description}</p>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Intro + imagen promocional (solo cuando hay encabezado o imagen) */}
      {(product.introHeading || promoUrl) && (
        <section className="mx-auto flex max-w-[1220px] flex-col items-center gap-10 px-8 pt-[100px] lg:flex-row lg:gap-0">
          <div className="flex-1 lg:pr-10">
            {product.introHeading && (
              <h2 className="max-w-[616px] pb-[26px] text-[32px] leading-[1.2] tracking-[-1px] text-secondary md:text-[44px]">
                {product.introHeading}
              </h2>
            )}
            {product.description && (
              <p className="max-w-[656px] text-[17px] leading-7 text-muted">
                {product.description}
              </p>
            )}
          </div>
          {promoUrl && (
            <div className="w-full max-w-[464px] shrink-0">
              <Image
                src={promoUrl}
                alt={product.name}
                width={464}
                height={466}
                className="h-auto w-full object-cover"
              />
            </div>
          )}
        </section>
      )}

      {/* Lo que debes saber: tabs */}
      <section className="mx-auto max-w-[1220px] px-8 pt-[90px]">
        <h2 className="pb-10 text-center text-[34px] leading-[1.2] tracking-[-1px] text-secondary md:text-[44px]">
          Lo que debes saber
        </h2>
        <ProductTabs
          benefitsIntro={product.benefitsIntro}
          benefits={product.benefits?.length ? product.benefits : product.features}
          requirements={product.requirements}
          conditions={product.conditions}
          redeemIntro={product.redeemIntro}
          redeemItems={product.redeemItems}
        />
      </section>

      {/* Planes de recompensa (tarjetas de crédito) */}
      {product.rewardPlans && product.rewardPlans.length > 0 && (
        <RewardPlans plans={product.rewardPlans} />
      )}

      {/* Preguntas frecuentes */}
      {product.faqs && product.faqs.length > 0 && (
        <section className="mx-auto max-w-[1180px] px-8 pt-[90px]">
          <h2 className="pb-8 text-center text-[34px] leading-[1.2] tracking-[-1px] text-secondary md:text-[44px]">
            Preguntas Frecuentes
          </h2>
          <FaqAccordion faqs={product.faqs} />
        </section>
      )}

      {/* Descargar documentación */}
      {product.documents && product.documents.length > 0 && (
        <section className="mx-auto max-w-[1180px] px-8 py-[90px]">
          <h2 className="pb-8 text-center text-[34px] leading-[1.2] tracking-[-1px] text-secondary md:text-[44px]">
            Descargar Documentación
          </h2>
          <div>
            {product.documents.map((doc) => {
              const fileUrl = getStrapiMedia(doc.file) ?? doc.url ?? "#";
              return (
                <a
                  key={doc.id}
                  href={fileUrl}
                  target={fileUrl.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-4 border-b border-line py-6"
                >
                  <span className="text-lg leading-[24.3px] text-secondary group-hover:text-primary">
                    {doc.label}
                  </span>
                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 26 26"
                    fill="none"
                    aria-hidden
                    className="shrink-0 text-primary"
                  >
                    <path
                      d="M13 3.5v12m0 0 4.5-4.5M13 15.5 8.5 11M4.5 19.5h17v3h-17v-3Z"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              );
            })}
          </div>
        </section>
      )}
    </>
  );
}
