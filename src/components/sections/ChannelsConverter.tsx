import Image from "next/image";
import Link from "next/link";
import type { StrapiMedia } from "@/lib/strapi";
import { getGlobal, getStrapiMedia } from "@/lib/strapi";
import CurrencyConverter from "@/components/CurrencyConverter";

export interface ChannelsConverterProps {
  title?: string;
  buttonLabel?: string;
  buttonUrl?: string;
  icon?: StrapiMedia | null;
}

export default async function ChannelsConverter({
  title,
  buttonLabel,
  buttonUrl,
  icon,
}: ChannelsConverterProps) {
  const global = await getGlobal();
  const iconUrl = getStrapiMedia(icon);

  return (
    <section className="mx-auto max-w-[1220px] px-5 py-[60px]">
      <div className="flex flex-col md:flex-row">
        {/* Canales de atención */}
        <div className="flex flex-col items-center justify-center gap-[60px] bg-primary px-10 py-24 md:w-[52%] md:py-0">
          {iconUrl && (
            <Image
              src={iconUrl}
              alt=""
              width={78}
              height={73}
              className="h-[73px] w-auto"
            />
          )}
          <h3 className="text-center text-[28px] leading-[36.4px] tracking-[-1px] text-white">
            {title ?? "Conocé nuestros canales de atención"}
          </h3>
          <Link
            href={buttonUrl ?? "/canales-de-atencion"}
            className="bg-white px-[30px] py-[15px] text-base leading-[22.4px] text-secondary transition-colors hover:bg-secondary hover:text-white"
          >
            {buttonLabel ?? "Conocé más"}
          </Link>
        </div>

        {/* Conversor */}
        <div className="md:w-[48%]">
          <CurrencyConverter
            usdBuy={global?.usdBuy ?? 36.1}
            usdSell={global?.usdSell ?? 36.62}
          />
        </div>
      </div>
    </section>
  );
}
