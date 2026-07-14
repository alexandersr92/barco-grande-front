import Link from "next/link";
import type { GlobalData } from "@/lib/strapi";

export default function Footer({ global }: { global: GlobalData | null }) {
  const columns = global?.footerColumns ?? [];

  return (
    <footer className="mt-auto bg-secondary-dark text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-4">
        <div>
          <span className="text-3xl font-bold">
            Avanz<span className="text-primary">›</span>
          </span>
          {global?.address && (
            <p className="mt-4 text-sm text-white/80">{global.address}</p>
          )}
          {global?.phone && (
            <p className="mt-2 text-sm font-bold text-white">{global.phone}</p>
          )}
        </div>
        {columns.map((col) => (
          <div key={col.id}>
            <h3 className="mb-4 text-lg font-bold">{col.title}</h3>
            <ul className="space-y-2">
              {col.links.map((link) => (
                <li key={link.id}>
                  <Link
                    href={link.url}
                    className="text-sm text-white/80 hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/15 py-5 text-center text-sm text-white/70">
        {global?.copyright ?? "Todos los derechos reservados."}
      </div>
    </footer>
  );
}
