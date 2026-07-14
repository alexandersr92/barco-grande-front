import Image from "next/image";
import Link from "next/link";
import type { RewardPlan } from "@/lib/strapi";
import { getStrapiMedia } from "@/lib/strapi";

// Tabla comparativa de planes de recompensa (Programa de Puntos, Cash Back,
// Tasa Preferencial) del diseño de tarjetas de crédito.
export default function RewardPlans({ plans }: { plans: RewardPlan[] }) {
  if (!plans || plans.length === 0) return null;

  return (
    <section className="mx-auto max-w-[1220px] overflow-x-auto px-5 pt-[90px]">
      <div className="grid min-w-[720px] grid-cols-[minmax(160px,1fr)_repeat(3,minmax(180px,1fr))] gap-x-px">
        {/* Fila 1: encabezados de plan */}
        <div />
        {plans.map((plan) => {
          const iconUrl = getStrapiMedia(plan.icon);
          return (
            <div
              key={`head-${plan.id}`}
              className="flex flex-col items-center gap-4 border-r border-surface p-2.5 pb-9 last:border-r-0"
            >
              {iconUrl && (
                <Image
                  src={iconUrl}
                  alt=""
                  width={72}
                  height={72}
                  className="h-[72px] w-[72px] object-contain"
                />
              )}
              <h3 className="text-center text-lg leading-[24.3px] text-secondary">
                {plan.title}
              </h3>
              <Link
                href={plan.ctaUrl ?? "/canales-de-atencion"}
                className="rounded-[2px] bg-primary px-5 pb-2.5 pt-[9px] text-[13px] font-medium leading-[18.2px] text-white transition-colors hover:bg-primary-dark"
              >
                {plan.ctaLabel ?? "Solicitala aquí"}
              </Link>
            </div>
          );
        })}

        {/* Fila 2: programa de recompensas */}
        <div className="flex items-center justify-center bg-[#fff8f2] px-5 py-8">
          <p className="text-center text-[17px] leading-7 text-secondary">
            Programa de recompensas
          </p>
        </div>
        {plans.map((plan) => (
          <div
            key={`program-${plan.id}`}
            className="flex min-h-[300px] flex-col items-center justify-center gap-6 border-r border-surface bg-[#fff8f2] px-5 py-8 last:border-r-0"
          >
            {(plan.programText ?? "").split(/\n+/).map((line, i) => (
              <p key={i} className="text-center text-[17px] leading-7 text-muted">
                {line}
              </p>
            ))}
          </div>
        ))}

        {/* Fila 3: bono de bienvenida */}
        <div className="flex items-start justify-center px-5 py-8">
          <p className="text-center text-[17px] leading-7 text-secondary">
            Bono de bienvenida
          </p>
        </div>
        {plans.map((plan) => (
          <div
            key={`bonus-${plan.id}`}
            className="flex items-start justify-center border-r border-surface px-5 py-8 last:border-r-0"
          >
            <p className="text-center text-[17px] leading-7 text-muted">
              {plan.bonusText}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
