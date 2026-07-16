import Image from "next/image";
import type { ButtonItem, FeatureItem, StrapiMedia } from "@/lib/strapi";
import { getStrapiMedia } from "@/lib/strapi";
import { CheckIcon, CtaButton } from "@/components/ui";

export interface ProductShowcaseProps {
  id?: string;
  heading: string;
  description?: string;
  features?: FeatureItem[];
  photo?: StrapiMedia | null;
  cardImage?: StrapiMedia | null;
  buttons?: ButtonItem[];
  imageLeft?: boolean;
  /** Texto en negrita (variante tarjetas del diseño). */
  emphasized?: boolean;
  /** Imagen retrato más alta con tarjeta flotante superpuesta (tarjetas). */
  tall?: boolean;
}

export default function ProductShowcase({
  id,
  heading,
  description,
  features,
  photo,
  cardImage,
  buttons,
  imageLeft = true,
  emphasized = false,
  tall = false,
}: ProductShowcaseProps) {
  const photoUrl = getStrapiMedia(photo);
  const cardUrl = getStrapiMedia(cardImage);
  const textWeight = emphasized ? "font-bold" : "";

  const imageWidth = tall ? "lg:w-[459px]" : "lg:w-[391px]";
  const imageHeight = tall ? "h-[420px] lg:h-[600px]" : "h-[300px] lg:h-[450px]";

  return (
    <section id={id} className="mx-auto max-w-[1220px] scroll-mt-32 px-5 py-8">
      <div
        className={`flex flex-col items-center gap-8 lg:flex-row ${
          tall ? "lg:gap-[100px]" : "lg:gap-5"
        } ${imageLeft ? "" : "lg:flex-row-reverse"}`}
      >
        {/* Imagen con tarjeta superpuesta */}
        <div className={`relative w-full shrink-0 ${imageWidth}`}>
          {photoUrl ? (
            <div className={`relative w-full overflow-hidden ${imageHeight}`}>
              <Image
                src={photoUrl}
                alt={heading}
                fill
                sizes="(max-width: 1024px) 100vw, 459px"
                className="object-cover"
              />
            </div>
          ) : (
            <div className={`w-full bg-surface ${imageHeight}`} />
          )}
          {cardUrl && (
            <Image
              src={cardUrl}
              alt=""
              width={354}
              height={406}
              className={
                tall
                  ? // Tarjeta flotante a la derecha de la foto (diseño: empieza
                    // al ~41% y se extiende más allá del borde derecho), rotada 10°.
                    "pointer-events-none absolute left-[40%] top-1/2 w-[220px] -translate-y-1/2 rotate-[10deg] drop-shadow-2xl sm:left-[42%] lg:w-[350px]"
                  : "absolute inset-y-0 -right-6 my-auto w-56 rotate-[10deg] drop-shadow-2xl md:-right-16 md:w-80"
              }
            />
          )}
        </div>

        {/* Contenido */}
        <div className="flex flex-1 flex-col gap-5 py-2">
          <h2
            className={`text-[32px] leading-[1.2] tracking-[-1px] text-secondary lg:text-[44px] lg:leading-[52.8px] ${textWeight}`}
          >
            {heading}
          </h2>
          {description && (
            <p className={`max-w-xl text-[17px] leading-7 text-muted ${textWeight}`}>
              {description}
            </p>
          )}
          {features && features.length > 0 && (
            <ul className="mt-2 space-y-3">
              {features.map((f) => (
                <li key={f.id} className="flex items-start gap-3">
                  <CheckIcon />
                  <span
                    className={`max-w-lg text-[17px] leading-7 text-muted ${textWeight}`}
                  >
                    {f.text}
                  </span>
                </li>
              ))}
            </ul>
          )}
          {buttons && buttons.length > 0 && (
            <div className="mt-2 flex flex-wrap items-center gap-5">
              {buttons.map((b) => (
                <CtaButton key={b.id} button={b} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
