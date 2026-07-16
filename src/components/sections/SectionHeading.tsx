export interface SectionHeadingProps {
  kicker?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  /** "secondary" pinta una banda azul petróleo a todo el ancho con texto blanco. */
  background?: "none" | "secondary";
  /** Ancho máximo del contenido en px (por defecto 1220). */
  maxWidth?: number;
}

export default function SectionHeading({
  kicker,
  title,
  subtitle,
  align = "left",
  background = "none",
  maxWidth,
}: SectionHeadingProps) {
  const centered = align === "center";
  const banded = background === "secondary";

  return (
    <section className={banded ? "bg-secondary py-[90px]" : "pt-[100px]"}>
      <div
        className={`mx-auto px-5 ${centered ? "text-center" : ""}`}
        style={{ maxWidth: `${maxWidth ?? 1220}px` }}
      >
        {kicker && (
          <p
            className={`pb-[15px] text-sm uppercase leading-[22.4px] tracking-[1px] ${
              banded ? "text-white/80" : "text-muted"
            }`}
          >
            {kicker}
          </p>
        )}
        <h2
          className={`text-[34px] leading-[1.2] tracking-[-1px] md:text-[44px] ${
            banded ? "text-white" : "text-secondary"
          }`}
        >
          {title}
        </h2>
        {subtitle && (
          <p
            className={`pt-[26px] text-[17px] leading-7 ${
              banded ? "text-white" : "text-muted"
            }`}
          >
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
