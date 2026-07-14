import Image from "next/image";
import type { StrapiMedia } from "@/lib/strapi";
import { getStrapiMedia } from "@/lib/strapi";

export interface AppBannerProps {
  title: string;
  description?: string;
  image?: StrapiMedia | null;
  appStoreUrl?: string;
  playStoreUrl?: string;
}

export default function AppBanner({
  title,
  description,
  image,
  appStoreUrl,
  playStoreUrl,
}: AppBannerProps) {
  const imageUrl = getStrapiMedia(image);

  return (
    <section className="bg-gradient-to-r from-primary to-orange-400 text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-10 px-4 py-16 md:flex-row md:justify-between">
        <div className="max-w-xl">
          <h2 className="text-4xl font-bold tracking-[-1px]">{title}</h2>
          {description && (
            <p className="mt-3 text-lg font-semibold text-white/90">
              {description}
            </p>
          )}
          <div className="mt-6 flex flex-wrap gap-4">
            {appStoreUrl && (
              <a
                href={appStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border-2 border-white px-6 py-3 font-bold transition-colors hover:bg-white hover:text-primary"
              >
                App Store
              </a>
            )}
            {playStoreUrl && (
              <a
                href={playStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border-2 border-white px-6 py-3 font-bold transition-colors hover:bg-white hover:text-primary"
              >
                Play Store
              </a>
            )}
          </div>
        </div>
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={title}
            width={420}
            height={300}
            className="w-full max-w-sm object-contain"
          />
        )}
      </div>
    </section>
  );
}
