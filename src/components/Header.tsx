"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { GlobalData } from "@/lib/strapi";
import { getStrapiMedia } from "@/lib/strapi";

export default function Header({ global }: { global: GlobalData | null }) {
  const [open, setOpen] = useState(false);
  const logoUrl = getStrapiMedia(global?.logo);

  const topNav = global?.topNav ?? [];
  const mainNav = global?.mainNav ?? [];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Barra superior */}
      <div className="bg-secondary text-white text-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4">
          <nav className="hidden gap-6 md:flex">
            {topNav.map((item) => (
              <Link
                key={item.id}
                href={item.url}
                className="py-2 font-semibold hover:text-orange-300"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <a
            href={global?.ebankingUrl ?? "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary px-5 py-2 font-bold hover:bg-primary-dark"
          >
            e-Banking
          </a>
        </div>
      </div>

      {/* Barra principal */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          {logoUrl ? (
            <Image
              src={logoUrl}
              alt={global?.siteName ?? "Avanz"}
              width={122}
              height={62}
              className="h-12 w-auto"
            />
          ) : (
            <span className="text-3xl font-bold tracking-tight">
              <span className="text-secondary">Avanz</span>
              <span className="text-primary">›</span>
            </span>
          )}
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {mainNav.map((item) => (
            <div key={item.id} className="group relative">
              <Link
                href={item.url ?? "#"}
                className="flex items-center gap-1 px-4 py-3 font-bold text-secondary hover:text-primary"
              >
                {item.label}
                {item.links && item.links.length > 0 && (
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden>
                    <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                )}
              </Link>
              {item.links && item.links.length > 0 && (
                <div className="invisible absolute left-0 top-full z-50 min-w-64 rounded-b-md bg-white opacity-0 shadow-lg transition-all duration-150 group-hover:visible group-hover:opacity-100">
                  {item.links.map((link) => (
                    <Link
                      key={link.id}
                      href={link.url}
                      className="block border-b border-gray-100 px-5 py-3 text-sm font-semibold text-muted last:border-0 hover:bg-surface hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Botón menú móvil */}
        <button
          type="button"
          aria-label="Abrir menú"
          className="lg:hidden"
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

      {/* Menú móvil */}
      {open && (
        <div className="border-t border-gray-100 bg-white px-4 pb-4 lg:hidden">
          {topNav.map((item) => (
            <Link
              key={`top-${item.id}`}
              href={item.url}
              className="block py-2 font-semibold text-secondary"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          {mainNav.map((item) => (
            <div key={item.id} className="border-t border-gray-100">
              <Link
                href={item.url ?? "#"}
                className="block py-2 font-bold text-secondary"
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
        </div>
      )}
    </header>
  );
}
