"use client";

import { useState } from "react";
import type { FeatureItem, TabSection } from "@/lib/strapi";
import { CheckIcon } from "@/components/ui";

interface Tab {
  key: string;
  label: string;
  intro?: string;
  items: FeatureItem[];
}

// Tabs de "Lo que debes saber": Beneficios | Requisitos | Condiciones |
// Canjear recompensas (solo aparecen las que tienen contenido).
export default function ProductTabs({
  benefitsIntro,
  benefits,
  requirements,
  conditions,
  redeemIntro,
  redeemItems,
  customTabs,
}: {
  benefitsIntro?: string;
  benefits?: FeatureItem[];
  requirements?: FeatureItem[];
  conditions?: FeatureItem[];
  redeemIntro?: string;
  redeemItems?: FeatureItem[];
  /** Pestañas definidas desde Strapi (etiqueta + intro + ítems); si existen,
   *  reemplazan a las pestañas estándar. */
  customTabs?: TabSection[];
}) {
  const tabs: Tab[] = customTabs?.length
    ? customTabs.map((t, i) => ({
        key: `custom-${t.id ?? i}`,
        label: t.label,
        intro: t.intro,
        items: t.items ?? [],
      }))
    : [
    { key: "beneficios", label: "Beneficios", intro: benefitsIntro, items: benefits ?? [] },
    { key: "requisitos", label: "Requisitos", items: requirements ?? [] },
    { key: "condiciones", label: "Condiciones", items: conditions ?? [] },
    {
      key: "canjear",
      label: "Canjear recompensas",
      intro: redeemIntro,
      items: redeemItems ?? [],
    },
  ].filter((tab) => tab.items.length > 0 || tab.key === "beneficios");
  const visibleTabs = customTabs?.length
    ? tabs.filter((t) => t.items.length > 0 || t.intro)
    : tabs;

  const [active, setActive] = useState(visibleTabs[0]?.key);
  if (visibleTabs.length === 0) return null;
  const current = visibleTabs.find((t) => t.key === active) ?? visibleTabs[0];

  return (
    <div>
      <div className="flex flex-col border-b border-line sm:flex-row">
        {visibleTabs.map((tab) => {
          const isActive = tab.key === current.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActive(tab.key)}
              className={`flex-1 px-4 pb-[15px] pt-[15px] text-center text-[17px] leading-7 transition-colors ${
                isActive
                  ? "border-b-2 border-primary bg-surface text-secondary"
                  : "text-muted hover:text-secondary"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      <div className="px-2.5 pt-8">
        {current.intro && (
          <p className="whitespace-pre-line pb-5 text-[17px] leading-7 text-secondary">{current.intro}</p>
        )}
        <ul className="space-y-4">
          {current.items.map((item) => (
            <li key={item.id} className="flex items-start gap-3">
              <CheckIcon />
              <span className="whitespace-pre-line text-[17px] leading-7 text-muted">{item.text}</span>
            </li>
          ))}
          {current.items.length === 0 && (
            <li className="text-[17px] leading-7 text-muted">
              Próximamente más información.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
