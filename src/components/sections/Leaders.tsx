"use client";

import { useState } from "react";
import Image from "next/image";
import type { StrapiMedia } from "@/lib/strapi";
import { getStrapiMedia } from "@/lib/strapi";

export interface LeaderItem {
  id: number;
  name: string;
  role?: string;
  group?: string;
  photo?: StrapiMedia | null;
}

export interface LeadersProps {
  kicker?: string;
  heading?: string;
  leaders?: LeaderItem[];
}

// "Nuestros líderes" (diseño 1506:25105): pestañas por grupo (Junta Directiva,
// Gerencia, ...) y las personas del grupo activo. Los grupos salen de los
// propios datos, así que agregar una pestaña es agregar líderes con ese group.
export default function Leaders({ kicker, heading, leaders }: LeadersProps) {
  const groups = [...new Set((leaders ?? []).map((l) => l.group).filter(Boolean))] as string[];
  const [active, setActive] = useState(groups[0]);

  if (!leaders?.length) return null;

  const visible = active ? leaders.filter((l) => l.group === active) : leaders;

  return (
    <section className="mx-auto max-w-[1220px] px-5 py-[70px]">
      {kicker && (
        <p className="pb-2 text-center text-sm uppercase tracking-[2px] text-muted-light">
          {kicker}
        </p>
      )}
      {heading && (
        <h2 className="pb-8 text-center text-[32px] leading-[1.2] tracking-[-1px] text-secondary md:text-[44px]">
          {heading}
        </h2>
      )}

      {groups.length > 0 && (
        <div
          role="tablist"
          className="mb-10 flex flex-wrap justify-center gap-8 border-b border-line"
        >
          {groups.map((g) => (
            <button
              key={g}
              role="tab"
              aria-selected={g === active}
              onClick={() => setActive(g)}
              className={`-mb-px border-b-2 pb-3 text-[15px] transition-colors ${
                g === active
                  ? "border-primary text-primary"
                  : "border-transparent text-muted hover:text-primary"
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      )}

      <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((l) => {
          // El diseño no trae fotos de líderes (solo nombre + cargo), pero el
          // campo existe por si más adelante se cargan desde Strapi.
          const photoUrl = getStrapiMedia(l.photo);
          return (
            <div key={l.id} className="flex flex-col">
              {photoUrl && (
                <div className="relative mb-4 h-[120px] w-[120px] overflow-hidden rounded-full">
                  <Image
                    src={photoUrl}
                    alt={l.name}
                    fill
                    sizes="120px"
                    className="object-cover"
                  />
                </div>
              )}
              <p className="text-[18px] leading-[24.3px] text-secondary">{l.name}</p>
              {l.role && (
                <p className="mt-2 text-[14px] leading-[22.4px] text-[#191b22]">
                  {l.role}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
