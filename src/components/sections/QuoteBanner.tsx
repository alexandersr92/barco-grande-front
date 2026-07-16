import Image from "next/image";
import type { StrapiMedia } from "@/lib/strapi";
import { getStrapiMedia } from "@/lib/strapi";

export interface QuoteBannerProps {
  kicker?: string;
  heading?: string;
  quote?: string;
  /** Párrafos bajo la cita, separados por línea en blanco → caen en 2 columnas. */
  body?: string;
  attribution?: string;
  image?: StrapiMedia | null;
  imagePosition?: "left" | "right";
  background?: "none" | "primary" | "primaryLight" | "secondary" | "surface";
}

const BG: Record<string, string> = {
  primary: "bg-primary",
  primaryLight: "bg-primary-light",
  secondary: "bg-secondary",
  surface: "bg-surface",
};

// Foto + cita destacada, con título, texto y fondo opcionales. Reutilizado por
// la sección naranja "Misión de Gestión de Talento" (con 2 columnas de texto
// bajo la cita) y por el testimonio final del diseño 1506:27127.
export default function QuoteBanner({
  kicker,
  heading,
  quote,
  body,
  attribution,
  image,
  imagePosition = "left",
  background = "none",
}: QuoteBannerProps) {
  const imageUrl = getStrapiMedia(image);
  if (!quote && !imageUrl && !heading) return null;

  const onColor = background === "primary" || background === "primaryLight" || background === "secondary";
  const bg = BG[background] ?? "";
  const paragraphs = (body ?? "").split(/\n{2,}/).filter((p) => p.trim());

  return (
    <section className={bg}>
      {(kicker || heading) && (
        <div className="mx-auto max-w-[1220px] px-5 pt-[70px] text-center">
          {kicker && (
            <p
              className={`pb-2 text-sm uppercase tracking-[2px] ${
                onColor ? "text-white/80" : "text-muted-light"
              }`}
            >
              {kicker}
            </p>
          )}
          {heading && (
            <h2
              className={`text-[32px] leading-[1.2] tracking-[-1px] md:text-[44px] ${
                onColor ? "text-white" : "text-secondary"
              }`}
            >
              {heading}
            </h2>
          )}
        </div>
      )}

      <div
        className={`mx-auto flex max-w-[1220px] flex-col items-center gap-10 px-5 py-[60px] lg:items-start lg:gap-16 ${
          imagePosition === "right" ? "lg:flex-row-reverse" : "lg:flex-row"
        }`}
      >
        {imageUrl && (
          <div className="w-full max-w-[480px] shrink-0">
            <Image
              src={imageUrl}
              alt=""
              width={480}
              height={420}
              className="h-auto w-full object-cover"
            />
          </div>
        )}
        <div className="flex-1">
          {quote && (
            <blockquote>
              <span
                aria-hidden
                className={`block font-serif text-[80px] leading-[0.6] ${
                  onColor ? "text-white/70" : "text-muted-light"
                }`}
              >
                &ldquo;
              </span>
              <p
                className={`mt-4 text-[22px] leading-8 tracking-[-0.5px] md:text-[28px] md:leading-[38px] ${
                  onColor ? "text-white" : "text-muted"
                }`}
              >
                {quote}
              </p>
              {attribution && (
                <footer
                  className={`mt-6 text-[15px] uppercase leading-6 tracking-[1px] ${
                    onColor ? "text-white/80" : "text-secondary"
                  }`}
                >
                  {attribution}
                </footer>
              )}
            </blockquote>
          )}
          {paragraphs.length > 0 && (
            <div className="mt-8 grid gap-8 sm:grid-cols-2">
              {paragraphs.map((p, i) => (
                <p
                  key={i}
                  className={`text-[17px] leading-7 ${
                    onColor ? "text-white" : "text-muted"
                  }`}
                >
                  {p.trim()}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
