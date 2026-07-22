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
const PER_PAGE = 3;

export default function Leaders({ kicker, heading, leaders }: LeadersProps) {
  const groups = [...new Set((leaders ?? []).map((l) => l.group).filter(Boolean))] as string[];
  const [active, setActive] = useState(groups[0]);
  const [pageIdx, setPageIdx] = useState(0);

  if (!leaders?.length) return null;

  const visible = active ? leaders.filter((l) => l.group === active) : leaders;
  // Carrusel: páginas de 3 (diseño 1506:25225)
  const pages = Math.max(1, Math.ceil(visible.length / PER_PAGE));
  const page = Math.min(pageIdx, pages - 1);
  const shown = visible.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);

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
              onClick={() => { setActive(g); setPageIdx(0); }}
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

      <div className="flex items-center gap-4">
        <button
          type="button"
          aria-label="Anterior"
          onClick={() => setPageIdx(Math.max(0, page - 1))}
          disabled={page === 0}
          className="shrink-0 text-muted-light transition-opacity hover:text-primary disabled:opacity-35"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
            <path d="M12.5 4 6.5 10l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="grid flex-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((l) => {
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
        <button
          type="button"
          aria-label="Siguiente"
          onClick={() => setPageIdx(Math.min(pages - 1, page + 1))}
          disabled={page >= pages - 1}
          className="shrink-0 text-muted-light transition-opacity hover:text-primary disabled:opacity-35"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
            <path d="M7.5 4l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {pages > 1 && (
        <div className="mt-8 flex justify-center gap-3">
          {Array.from({ length: pages }, (_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Página ${i + 1}`}
              onClick={() => setPageIdx(i)}
              className={`h-2 w-2 rounded-[4px] ${i === page ? "bg-primary" : "bg-[#edbf99]"}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
