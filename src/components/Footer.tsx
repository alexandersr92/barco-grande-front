import Link from "next/link";
import Image from "next/image";
import type { GlobalData } from "@/lib/strapi";
import { getStrapiMedia } from "@/lib/strapi";

export default function Footer({ global }: { global: GlobalData | null }) {
  const columns = global?.footerColumns ?? [];
  const socialLinks = global?.socialLinks ?? [];
  const logoUrl = getStrapiMedia(global?.logo);

  return (
    <footer className="mt-auto bg-surface">
      <div className="mx-auto grid max-w-[1220px] gap-10 px-8 pb-4 pt-[90px] md:grid-cols-2 lg:grid-cols-4">
        {/* Marca */}
        <div className="flex flex-col items-center gap-2.5 px-2.5">
          {logoUrl ? (
            <Image
              src={logoUrl}
              alt={global?.siteName ?? "Avanz"}
              width={258}
              height={131}
              className="h-[131px] w-auto"
            />
          ) : (
            <span className="text-5xl font-bold text-secondary">
              Avanz<span className="text-primary">›</span>
            </span>
          )}
          <div className="pt-6">
            <Image
              src="/icons/grupo-pellas-logo.svg"
              alt="Grupo Pellas"
              width={173}
              height={49}
              className="h-[49px] w-auto"
            />
          </div>
          <div className="flex gap-4 pt-5">
            {socialLinks.map((social) => {
              const iconUrl = getStrapiMedia(social.icon);
              return (
                <a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name ?? "Red social"}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-primary transition-colors hover:bg-primary-dark"
                >
                  {iconUrl ? (
                    <Image src={iconUrl} alt="" width={16} height={16} className="h-4 w-4" />
                  ) : (
                    <span className="text-xs text-white">●</span>
                  )}
                </a>
              );
            })}
          </div>
        </div>

        {/* Acerca de avanz + Contacto */}
        <div className="px-2.5">
          {columns[0] && (
            <>
              <h3 className="text-sm uppercase leading-[22.4px] tracking-[1px] text-secondary">
                {columns[0].title}
              </h3>
              <ul className="mt-[19px] space-y-[9px]">
                {columns[0].links.map((link) => (
                  <li key={link.id}>
                    <Link
                      href={link.url}
                      className="text-[17px] leading-7 text-muted hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
          <h3 className="mt-10 text-sm uppercase leading-[22.4px] tracking-[1px] text-secondary">
            Contacto
          </h3>
          <div className="mt-[19px] space-y-[9px]">
            {global?.address && (
              <p className="max-w-60 text-[17px] leading-7 text-muted">{global.address}</p>
            )}
            {global?.phone && (
              <p className="flex items-center gap-2.5 text-[17px] leading-7 text-muted">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M6.6 3.8 8.9 6a1.5 1.5 0 0 1 .2 1.9l-1 1.6a12.7 12.7 0 0 0 6.4 6.4l1.6-1a1.5 1.5 0 0 1 1.9.2l2.2 2.3a1.5 1.5 0 0 1 0 2.1l-1.2 1.2c-.8.8-2 1.1-3.1.7C10.3 19.5 4.5 13.7 2.6 8c-.4-1.1-.1-2.3.7-3.1l1.2-1.2a1.5 1.5 0 0 1 2.1 0Z"
                    stroke="#ff7500"
                    strokeWidth="1.6"
                  />
                </svg>
                <a href={`tel:${global.phone.replace(/\s/g, "")}`} className="hover:text-primary">
                  {global.phone}
                </a>
              </p>
            )}
          </div>
        </div>

        {/* Columnas de enlaces */}
        {columns.slice(1).map((col, i) => (
          <div key={col.id} className="px-2.5">
            <h3 className="text-sm uppercase leading-[22.4px] tracking-[1px] text-secondary">
              {col.title}
            </h3>
            <ul className="mt-[19px] space-y-[9px]">
              {col.links.map((link) => (
                <li key={link.id}>
                  <Link
                    href={link.url}
                    className="text-[17px] leading-7 text-muted hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            {i === columns.length - 2 && (
              <div className="pt-10">
                <Image
                  src="/icons/footer-badge-tubancofacil.png"
                  alt="Banco Avanz — Tu Banco Fácil"
                  width={175}
                  height={49}
                  className="h-[49px] w-auto"
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mx-auto max-w-[1220px] px-8">
        <div className="border-t border-line" />
        <p className="py-[30px] text-center text-sm leading-[22.4px] text-muted">
          {global?.copyright ?? "Todos los derechos reservados."}
        </p>
      </div>
    </footer>
  );
}
