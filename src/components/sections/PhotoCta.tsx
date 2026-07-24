import Image from "next/image";
import Link from "next/link";
import type { StrapiMedia } from "@/lib/strapi";
import { getStrapiMedia } from "@/lib/strapi";

export interface PhotoCtaProps {
  kicker?: string;
  heading?: string;
  body?: string;
  buttonLabel?: string;
  buttonUrl?: string;
  image?: StrapiMedia | null;
}

// Banner con foto de fondo y degradado oscuro+teal a la izquierda (diseño
// 1517:11316, "Línea de Crédito Empresarial").
export default function PhotoCta({
  kicker,
  heading,
  body,
  buttonLabel,
  buttonUrl,
  image,
}: PhotoCtaProps) {
  const imageUrl = getStrapiMedia(image);
  if (!heading) return null;

  return (
    <section className="mx-auto max-w-[1220px] px-5 py-10">
      <div className="relative min-h-[520px] overflow-hidden lg:min-h-[632px]">
        {imageUrl && (
          <Image src={imageUrl} alt="" fill sizes="1200px" className="object-cover" />
        )}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(0,0,0,0.5) 0%, rgba(0,118,129,0.71) 0%, rgba(0,0,0,0) 70%)",
          }}
        />
        <div className="relative flex h-full min-h-[520px] flex-col justify-center p-8 lg:min-h-[632px] lg:p-16">
          {kicker && (
            <p className="pb-3 text-sm uppercase leading-[22.4px] tracking-[1px] text-white">
              {kicker}
            </p>
          )}
          <h2 className="max-w-[420px] pb-5 text-[32px] leading-[1.2] tracking-[-1px] text-white md:text-[44px]">
            {heading}
          </h2>
          {body && (
            <p className="max-w-[430px] pb-8 text-[17px] leading-7 text-white">{body}</p>
          )}
          {buttonLabel && buttonUrl && (
            <Link
              href={buttonUrl}
              className="inline-block w-fit bg-white px-[30px] pb-[15px] pt-[14px] text-base leading-[22.4px] text-secondary transition-colors hover:bg-primary hover:text-white"
            >
              {buttonLabel}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
