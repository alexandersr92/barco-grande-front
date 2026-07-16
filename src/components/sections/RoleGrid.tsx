import Link from "next/link";
import type { TitledText } from "@/components/sections/MissionVision";

export interface RoleGridProps {
  heading?: string;
  body?: string;
  buttonLabel?: string;
  buttonUrl?: string;
  items?: TitledText[];
}

// Columna izquierda (título + texto + botón) y grilla de celdas de texto a la
// derecha, separadas por bordes ("Oportunidades de Carrera", diseño
// 1506:27127). Las celdas no tienen íconos ni fotos.
export default function RoleGrid({
  heading,
  body,
  buttonLabel,
  buttonUrl,
  items,
}: RoleGridProps) {
  if (!items?.length && !heading) return null;
  const paragraphs = (body ?? "").split(/\n{2,}/).filter((p) => p.trim());

  return (
    <section className="mx-auto max-w-[1220px] px-5 py-[80px]">
      <div className="flex flex-col gap-10 lg:flex-row lg:gap-16">
        {/* Izquierda: encabezado + texto + botón */}
        <div className="flex flex-col justify-center lg:w-[42%]">
          <div className="mb-6 h-px w-[105px] bg-muted-light" />
          {heading && (
            <h2 className="pb-6 text-[32px] leading-[1.2] tracking-[-1px] text-secondary md:text-[44px]">
              {heading}
            </h2>
          )}
          {paragraphs.map((p, i) => (
            <p key={i} className="mb-6 text-[17px] leading-7 text-muted">
              {p.trim()}
            </p>
          ))}
          {buttonLabel && buttonUrl && (
            <Link
              href={buttonUrl}
              className="mt-2 inline-block w-fit bg-primary px-[30px] pb-[15px] pt-[14px] text-base font-medium leading-[22.4px] text-white transition-colors hover:bg-primary-dark"
            >
              {buttonLabel}
            </Link>
          )}
        </div>

        {/* Derecha: grilla de roles con bordes */}
        <div className="grid flex-1 sm:grid-cols-2">
          {items?.map((role, i) => (
            <div
              key={role.id}
              className={`border-line p-8 ${i % 2 === 0 ? "sm:border-r" : ""} ${
                i < (items.length - (items.length % 2 === 0 ? 2 : 1)) ? "border-b" : ""
              }`}
            >
              <h3 className="pb-3 text-[24px] leading-[1.3] tracking-[-1px] text-secondary md:text-[28px]">
                {role.title}
              </h3>
              {role.text && (
                <p className="text-[17px] leading-7 text-muted">{role.text}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
