"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import type { Audience, GlobalData, NavItem } from "@/lib/strapi";
import { getStrapiMedia } from "@/lib/strapi";

// Un ítem del menú está activo si su URL es la ruta actual, o si lo es la de
// alguno de sus enlaces del dropdown (p. ej. "Productos" con /personas/cuentas).
// El home de la audiencia (/personas) solo marca en coincidencia exacta, si no
// quedaría siempre activo.
function isNavItemActive(pathname: string, item: NavItem): boolean {
  const matches = (url?: string) => {
    if (!url || url === "#") return false;
    if (url.split("/").filter(Boolean).length <= 1) return pathname === url;
    return pathname === url || pathname.startsWith(`${url}/`);
  };
  return matches(item.url) || (item.links ?? []).some((l) => matches(l.url));
}

export default function Header({
  global,
  audiences,
}: {
  global: GlobalData | null;
  audiences: Audience[];
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const logoUrl = getStrapiMedia(global?.logo);

  // La audiencia activa sale del primer segmento de la URL (/personas/cuentas
  // → "personas"). Cada audiencia trae su propio menú desde Strapi, así que el
  // menú de abajo cambia según la pestaña de arriba. En páginas fuera de toda
  // audiencia (/noticias, /productos/...) se usa la primera como contexto.
  const activeSlug = pathname.split("/")[1] ?? "";
  const activeAudience =
    audiences.find((a) => a.slug === activeSlug) ?? audiences[0];
  const mainNav = activeAudience?.mainNav ?? [];
  const homeUrl = activeAudience ? `/${activeAudience.slug}` : "/";

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Tabs Personas / Empresas / Sobre nosotros */}
      <div className="bg-primary">
        <div className="mx-auto flex max-w-[1220px] px-5">
          {audiences.map((aud) => {
            const active = aud.slug === activeAudience?.slug;
            return (
              <Link
                key={aud.id}
                href={`/${aud.slug}`}
                className={`px-5 pb-2.5 pt-[9px] text-sm leading-[22.4px] ${
                  active ? "bg-white text-primary" : "text-white hover:bg-white/10"
                }`}
              >
                {aud.name}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Barra principal */}
      <div className="mx-auto flex max-w-[1220px] items-center justify-between px-5 py-2">
        <Link
          href={homeUrl}
          className="flex w-[183px] shrink-0 items-center justify-center py-1"
        >
          {logoUrl ? (
            <Image
              src={logoUrl}
              alt={global?.siteName ?? "Avanz"}
              width={122}
              height={62}
              className="h-[62px] w-auto"
            />
          ) : (
            <span className="text-3xl font-bold tracking-tight">
              <span className="text-secondary">Avanz</span>
              <span className="text-primary">›</span>
            </span>
          )}
        </Link>

        <nav className="hidden items-center lg:flex">
          {mainNav.map((item) => {
            const hasLinks = item.links && item.links.length > 0;
            const active = isNavItemActive(pathname, item);
            return (
              <div key={item.id} className="group relative">
                <Link
                  href={item.url ?? "#"}
                  className={`flex items-center gap-[5px] px-[17px] py-2 text-sm uppercase leading-[22.4px] tracking-[1px] ${
                    active ? "text-secondary" : "text-muted"
                  } hover:text-primary`}
                >
                  {item.label}
                  {hasLinks && (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                      <path
                        d="M3.5 5.25 7 8.75l3.5-3.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </Link>
                {hasLinks && (
                  <div className="invisible absolute left-0 top-full z-50 min-w-56 bg-white opacity-0 shadow-lg transition-all duration-150 group-hover:visible group-hover:opacity-100">
                    {item.links!.map((link) => (
                      <Link
                        key={link.id}
                        href={link.url}
                        className="block border-b border-gray-100 px-5 py-3 text-sm text-muted last:border-0 hover:bg-surface hover:text-primary"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="flex w-auto items-center justify-end lg:w-[183px]">
          <a
            href={global?.ebankingUrl ?? "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2.5 bg-primary px-4 pb-3 pt-[11px] text-[15px] leading-6 text-white hover:bg-primary-dark md:flex"
          >
            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" aria-hidden>
              <path
                d="M12.5 3.5 4 8v2h17V8l-8.5-4.5ZM6 11.5v6M10.3 11.5v6M14.7 11.5v6M19 11.5v6M4 19.5h17v2H4v-2Z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
            </svg>
            e-Banking
          </a>

          {/* Botón menú móvil */}
          <button
            type="button"
            aria-label="Abrir menú"
            className="ml-4 lg:hidden"
            onClick={() => setOpen(!open)}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" stroke="#005f86" strokeWidth="2" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" stroke="#005f86" strokeWidth="2" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Menú móvil */}
      {open && (
        <div className="border-t border-gray-100 bg-white px-4 pb-4 lg:hidden">
          {audiences.map((aud) => (
            <Link
              key={`aud-${aud.id}`}
              href={`/${aud.slug}`}
              className="block py-2 font-semibold text-secondary"
              onClick={() => setOpen(false)}
            >
              {aud.name}
            </Link>
          ))}
          {mainNav.map((item) => (
            <div key={item.id} className="border-t border-gray-100">
              <Link
                href={item.url ?? "#"}
                className="block py-2 text-sm uppercase tracking-[1px] text-muted"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
              {item.links?.map((link) => (
                <Link
                  key={link.id}
                  href={link.url}
                  className="block py-1.5 pl-4 text-sm text-muted"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
          <a
            href={global?.ebankingUrl ?? "#"}
            className="mt-3 inline-block bg-primary px-4 py-2.5 text-[15px] text-white"
          >
            e-Banking
          </a>
        </div>
      )}
    </header>
  );
}
