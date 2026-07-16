import Image from "next/image";
import type { StrapiMedia } from "@/lib/strapi";
import { getStrapiMedia } from "@/lib/strapi";

export interface MediaTextProps {
  heading?: string;
  subheading?: string;
  body?: string;
  images?: StrapiMedia[] | null;
  background?: "none" | "primary" | "secondary";
}

// Bloque de texto (título + subtítulo + cuerpo) sobre fondo de color, con hasta
// dos imágenes: la primera bajo el texto (columna izquierda) y la segunda a la
// derecha a mayor altura (sección "Capacitación Integral", diseño 1506:27127).
export default function MediaText({
  heading,
  subheading,
  body,
  images,
  background = "none",
}: MediaTextProps) {
  const imgs = (images ?? []).map((m) => getStrapiMedia(m)).filter(Boolean) as string[];
  // El diseño usa #005f86 al 74% (sobre el blanco de la página compone un teal
  // medio ≈ #4289a6), no el azul petróleo sólido.
  const bg =
    background === "primary"
      ? "bg-primary"
      : background === "secondary"
        ? "bg-[rgba(0,95,134,0.74)]"
        : "";
  const onColor = background !== "none";

  return (
    <section className={bg}>
      <div className="mx-auto grid max-w-[1220px] items-end gap-10 px-5 py-[80px] lg:grid-cols-2">
        {/* Columna izquierda: texto + primera imagen */}
        <div className="flex flex-col">
          {heading && (
            <h2
              className={`text-[32px] leading-[1.2] tracking-[-1px] md:text-[44px] ${
                onColor ? "text-white" : "text-secondary"
              }`}
            >
              {heading}
            </h2>
          )}
          {subheading && (
            <p
              className={`mt-5 text-[22px] leading-[1.3] tracking-[-0.5px] md:text-[28px] ${
                onColor ? "text-white/90" : "text-muted"
              }`}
            >
              {subheading}
            </p>
          )}
          {body && (
            <p
              className={`mt-5 text-[17px] leading-7 ${
                onColor ? "text-white" : "text-muted"
              }`}
            >
              {body}
            </p>
          )}
          {imgs[0] && (
            <Image
              src={imgs[0]}
              alt=""
              width={768}
              height={513}
              className="mt-8 h-auto w-full object-cover"
            />
          )}
        </div>

        {/* Columna derecha: segunda imagen, más alta */}
        {imgs[1] && (
          <div className="w-full">
            <Image
              src={imgs[1]}
              alt=""
              width={960}
              height={813}
              className="h-auto w-full object-cover"
            />
          </div>
        )}
      </div>
    </section>
  );
}
