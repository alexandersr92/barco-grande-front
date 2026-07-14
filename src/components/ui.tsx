import Link from "next/link";
import type { ButtonItem } from "@/lib/strapi";

export function CheckIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 17 17"
      fill="none"
      className="mt-1.5 shrink-0"
      aria-hidden
    >
      <path
        d="M5.774 14.59.249 9.065a.85.85 0 0 1 0-1.203l1.202-1.202a.85.85 0 0 1 1.203 0l3.721 3.722L14.346 2.41a.85.85 0 0 1 1.203 0l1.202 1.202a.85.85 0 0 1 0 1.203L6.976 14.59a.85.85 0 0 1-1.202 0Z"
        fill="#ff7500"
      />
    </svg>
  );
}

export function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className={className}
      aria-hidden
    >
      <path
        d="M5.5 3l5 5-5 5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CtaButton({ button }: { button: ButtonItem }) {
  const variant = button.variant ?? "primary";
  const base =
    "inline-flex items-center gap-2.5 px-7 py-3.5 text-base font-bold transition-colors";
  const styles: Record<string, string> = {
    primary: "bg-primary text-white hover:bg-primary-dark",
    outline:
      "border-2 border-secondary text-secondary hover:bg-secondary hover:text-white",
    link: "bg-white text-secondary hover:text-primary",
  };

  return (
    <Link href={button.url} className={`${base} ${styles[variant]}`}>
      {button.label}
      <ArrowIcon />
    </Link>
  );
}
