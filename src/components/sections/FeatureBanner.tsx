import Image from "next/image";
import Link from "next/link";
import type { StrapiMedia } from "@/lib/strapi";
import { getStrapiMedia } from "@/lib/strapi";

export interface FeatureBannerProps {
  kicker?: string;
  title: string;
  description?: string;
  buttonLabel?: string;
  buttonUrl?: string;
  illustration?: StrapiMedia | null;
  variant?: "orange" | "teal";
}

export default function FeatureBanner({
  kicker,
  title,
  description,
  buttonLabel,
  buttonUrl,
  illustration,
  variant = "orange",
}: FeatureBannerProps) {
  const illustrationUrl = getStrapiMedia(illustration);
  const bg =
    variant === "teal" ? "bg-[rgba(0,118,129,0.71)]" : "bg-primary-light";

  return (
    <section className="mx-auto max-w-[1220px] px-5 py-10">
      <div
        className={`${bg} flex flex-col items-center gap-10 p-[50px] lg:flex-row lg:gap-0`}
      >
        <div className="flex flex-1 justify-center">
          {illustrationUrl && (
            <Image
              src={illustrationUrl}
              alt=""
              width={275}
              height={275}
              className="h-[275px] w-auto object-contain"
            />
          )}
        </div>
        <div className="flex flex-1 flex-col gap-[19px]">
          {kicker && (
            <p className="text-sm uppercase leading-[22.4px] tracking-[1px] text-white">
              {kicker}
            </p>
          )}
          <h2 className="max-w-[366px] text-[36px] leading-[1.2] tracking-[-1px] text-white lg:text-[44px]">
            {title}
          </h2>
          {description && (
            <p className="max-w-[366px] pb-[30px] text-[17px] leading-7 text-white">
              {description}
            </p>
          )}
        </div>
        <div className="flex flex-1 justify-center">
          {buttonUrl && (
            <Link
              href={buttonUrl}
              className="inline-flex items-center gap-2.5 bg-white px-[30px] py-[15px] text-base leading-[22.4px] text-secondary transition-colors hover:bg-secondary hover:text-white"
            >
              {buttonLabel ?? "Leer más"}
              <svg width="17" height="16" viewBox="0 0 17 16" fill="none" aria-hidden>
                <path
                  d="M6 3.5 10.5 8 6 12.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
