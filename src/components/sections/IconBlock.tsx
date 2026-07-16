import Image from "next/image";
import Link from "next/link";
import type { StrapiMedia } from "@/lib/strapi";
import { getStrapiMedia } from "@/lib/strapi";

export interface IconBlockProps {
  icon?: StrapiMedia | null;
  /** Ancho del ícono/logo en px (por defecto 48). */
  iconWidth?: number;
  anchorId?: string;
  heading?: string;
  body?: string;
  buttonLabel?: string;
  buttonUrl?: string;
  align?: "center" | "left";
}

// Ícono/logo + título + texto + botón opcional (diseño 1506:27626). Sirve
// tanto para "Regulación Tributaria" (ícono + título + párrafo) como para el
// bloque de FOGADE (logo + botón + párrafo legal).
export default function IconBlock({
  icon,
  iconWidth,
  anchorId,
  heading,
  body,
  buttonLabel,
  buttonUrl,
  align = "center",
}: IconBlockProps) {
  const iconUrl = getStrapiMedia(icon);
  if (!iconUrl && !heading && !body) return null;

  const centered = align === "center";
  const w = iconWidth ?? 48;
  // El diseño centra ícono, título y botón, pero deja el texto alineado a la
  // izquierda a todo el ancho. Los párrafos se separan con una línea en blanco.
  const paragraphs = (body ?? "").split(/\n{2,}/).filter((p) => p.trim());

  return (
    <section
      id={anchorId}
      className="mx-auto max-w-[1220px] scroll-mt-32 px-5 py-[70px]"
    >
      <div className={`flex flex-col ${centered ? "items-center" : ""}`}>
        {iconUrl && (
          <Image
            src={iconUrl}
            alt=""
            width={w}
            height={w}
            style={{ width: `${w}px` }}
            className="mb-8 h-auto object-contain"
          />
        )}
        {heading && (
          <h2
            className={`pb-6 text-[32px] leading-[1.2] tracking-[-1px] text-secondary md:text-[44px] ${
              centered ? "text-center" : ""
            }`}
          >
            {heading}
          </h2>
        )}
        {buttonLabel && buttonUrl && (
          <Link
            href={buttonUrl}
            className="mb-8 inline-block w-fit bg-primary px-[30px] pb-[15px] pt-[14px] text-base font-medium leading-[22.4px] text-white transition-colors hover:bg-primary-dark"
          >
            {buttonLabel}
          </Link>
        )}
        {paragraphs.length > 0 && (
          <div className="w-full space-y-6">
            {paragraphs.map((p, i) => (
              <p key={i} className="text-[17px] leading-7 text-muted">
                {p.trim()}
              </p>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
