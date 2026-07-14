import Link from "next/link";
import { ArrowIcon } from "@/components/ui";

export interface ChannelsBarProps {
  text?: string;
  linkLabel?: string;
  linkUrl?: string;
}

export default function ChannelsBar({ text, linkLabel, linkUrl }: ChannelsBarProps) {
  return (
    <section className="bg-primary text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 md:flex-row">
        <p className="text-xl font-bold">{text}</p>
        {linkUrl && (
          <Link
            href={linkUrl}
            className="inline-flex items-center gap-2 border-2 border-white px-6 py-2.5 font-bold transition-colors hover:bg-white hover:text-primary"
          >
            {linkLabel ?? "Ver más"}
            <ArrowIcon />
          </Link>
        )}
      </div>
    </section>
  );
}
