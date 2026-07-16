import Image from "next/image";
import type { StrapiMedia } from "@/lib/strapi";
import { getStrapiMedia } from "@/lib/strapi";

export interface TitledText {
  id: number;
  title: string;
  text?: string;
}

export interface MissionVisionProps {
  items?: TitledText[];
  image?: StrapiMedia | null;
}

// Bloques con título (Nuestra Misión / Nuestra Visión) a la izquierda y una
// foto a la derecha (diseño 1506:25105).
export default function MissionVision({ items, image }: MissionVisionProps) {
  const imageUrl = getStrapiMedia(image);
  if (!items?.length && !imageUrl) return null;

  return (
    <section className="mx-auto max-w-[1220px] px-5 py-[70px]">
      <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-16">
        <div className="flex flex-1 flex-col gap-10">
          {items?.map((item) => (
            <div key={item.id}>
              <h2 className="pb-4 text-center text-[28px] leading-[1.2] tracking-[-1px] text-secondary md:text-[32px] lg:text-left">
                {item.title}
              </h2>
              {item.text && (
                <p className="max-w-[560px] text-center text-[16px] leading-7 text-muted lg:text-left">
                  {item.text}
                </p>
              )}
            </div>
          ))}
        </div>
        {imageUrl && (
          <div className="w-full max-w-[420px] shrink-0">
            <Image
              src={imageUrl}
              alt=""
              width={420}
              height={330}
              className="h-auto w-full object-cover"
            />
          </div>
        )}
      </div>
    </section>
  );
}
