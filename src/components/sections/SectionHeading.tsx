export interface SectionHeadingProps {
  kicker?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export default function SectionHeading({
  kicker,
  title,
  subtitle,
  align = "left",
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <section
      className={`mx-auto max-w-[1220px] px-5 pt-[100px] ${centered ? "text-center" : ""}`}
    >
      {kicker && (
        <p className="pb-[15px] text-sm uppercase leading-[22.4px] tracking-[1px] text-muted">
          {kicker}
        </p>
      )}
      <h2 className="text-[34px] leading-[1.2] tracking-[-1px] text-secondary md:text-[44px]">
        {title}
      </h2>
      {subtitle && (
        <p className="pt-[26px] text-[17px] leading-7 text-muted">{subtitle}</p>
      )}
    </section>
  );
}
