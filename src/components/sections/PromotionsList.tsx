import Image from "next/image";
import { getPromotions, getStrapiMedia } from "@/lib/strapi";

export default async function PromotionsList({
  heading,
  limit = 2,
}: {
  heading?: string;
  limit?: number;
}) {
  const promotions = await getPromotions(limit);
  if (promotions.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 py-20">
      <h2 className="mb-10 text-center text-4xl font-bold tracking-[-1px] text-secondary">
        {heading ?? "Promociones"}
      </h2>
      <div className="grid gap-8 md:grid-cols-2">
        {promotions.map((promo) => {
          const imageUrl = getStrapiMedia(promo.image);
          return (
            <div
              key={promo.documentId}
              className="relative flex min-h-64 flex-col justify-end overflow-hidden rounded-lg bg-secondary p-8 text-white"
            >
              {imageUrl && (
                <Image
                  src={imageUrl}
                  alt={promo.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover opacity-40"
                />
              )}
              <div className="relative">
                <h3 className="text-2xl font-bold">{promo.title}</h3>
                {promo.description && (
                  <p className="mt-2 font-semibold text-white/85">
                    {promo.description}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
