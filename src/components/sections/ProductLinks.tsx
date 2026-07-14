import Image from "next/image";
import Link from "next/link";
import type { StrapiMedia } from "@/lib/strapi";
import { getStrapiMedia } from "@/lib/strapi";

export interface QuickLinkItem {
  id: number;
  prefix?: string;
  label: string;
  url: string;
  icon?: StrapiMedia | null;
}

export default function ProductLinks({ items }: { items: QuickLinkItem[] }) {
  if (!items || items.length === 0) return null;

  return (
    <section className="mx-auto grid max-w-[1220px] grid-cols-1 gap-5 px-5 py-10 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => {
        const iconUrl = getStrapiMedia(item.icon);
        return (
          <Link
            key={item.id}
            href={item.url}
            className="group flex flex-col gap-6 rounded-[10px] bg-white p-8 shadow-[0_2px_12px_rgba(0,0,0,0.06)] transition-shadow hover:shadow-[0_4px_20px_rgba(0,0,0,0.1)]"
          >
            {iconUrl && (
              <div className="flex h-[58px] items-center">
                <Image
                  src={iconUrl}
                  alt=""
                  width={73}
                  height={58}
                  className="h-full w-auto object-contain"
                />
              </div>
            )}
            <span className="pl-2.5 text-[23px] leading-[30px] text-secondary transition-colors group-hover:text-primary">
              {item.prefix && (
                <>
                  {item.prefix}
                  <br />
                </>
              )}
              <span className="inline-flex items-center gap-2">
                {item.label}
                <svg
                  width="21"
                  height="21"
                  viewBox="0 0 21 21"
                  fill="none"
                  aria-hidden
                  className="text-primary"
                >
                  <circle cx="10.5" cy="10.5" r="9.5" stroke="currentColor" strokeWidth="1.4" />
                  <path
                    d="M8.5 6.8 12.2 10.5 8.5 14.2"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </span>
          </Link>
        );
      })}
    </section>
  );
}
