"use client";

import { useState } from "react";
import Image from "next/image";
import type { StrapiMedia } from "@/lib/strapi";
import { getStrapiMedia } from "@/lib/strapi";

export interface TutorialCardData {
  id: number;
  title: string;
  description?: string;
  image?: StrapiMedia | null;
}

export interface TutorialTabData {
  id: number;
  label: string;
  cards?: TutorialCardData[];
}

export interface TutorialTabsProps {
  heading?: string;
  tabs?: TutorialTabData[];
}

// Sección "Tutoriales" (diseño 1499:28628): lista vertical de pestañas a la
// izquierda y tarjetas (imagen + título + descripción) del tab activo a la
// derecha. Client component para alternar pestañas; contenido desde Strapi.
export default function TutorialTabs({ heading = "Tutoriales", tabs }: TutorialTabsProps) {
  const [activeId, setActiveId] = useState(tabs?.[0]?.id);
  if (!tabs || tabs.length === 0) return null;
  const activeTab = tabs.find((t) => t.id === activeId) ?? tabs[0];

  return (
    <section className="mx-auto max-w-[1220px] px-5 py-[70px]">
      <h2 className="pb-10 text-center text-[34px] leading-[1.2] tracking-[-1px] text-secondary md:text-[44px]">
        {heading}
      </h2>
      <div className="flex flex-col gap-8 lg:flex-row lg:gap-0">
        {/* Pestañas */}
        <div role="tablist" aria-orientation="vertical" className="shrink-0 lg:w-[305px]">
          {tabs.map((t) => {
            const isActive = t.id === activeTab?.id;
            return (
              <button
                key={t.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveId(t.id)}
                className={`flex w-full items-center border-b border-line px-10 py-4 text-left text-[17px] leading-7 transition-colors ${
                  isActive
                    ? "bg-surface font-medium text-primary"
                    : "text-muted hover:text-primary"
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Tarjetas del tab activo */}
        <div className="grid flex-1 gap-8 sm:grid-cols-2 lg:pl-8">
          {activeTab?.cards?.length ? (
            activeTab.cards.map((c) => {
              const imageUrl = getStrapiMedia(c.image);
              return (
                <article key={c.id} className="flex flex-col">
                  {imageUrl && (
                    <div className="relative aspect-[291/164] w-full overflow-hidden">
                      <Image
                        src={imageUrl}
                        alt={c.title}
                        fill
                        sizes="(max-width: 640px) 100vw, 291px"
                        className="object-cover"
                      />
                    </div>
                  )}
                  <h3 className="mt-5 text-[20px] leading-[1.3] tracking-[-0.5px] text-secondary">
                    {c.title}
                  </h3>
                  {c.description && (
                    <p className="mt-3 text-[15px] leading-6 text-muted">{c.description}</p>
                  )}
                </article>
              );
            })
          ) : (
            <p className="text-[15px] leading-6 text-muted sm:col-span-2">
              Pronto encontrarás más tutoriales en esta sección.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
