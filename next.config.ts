import type { NextConfig } from "next";

// La URL del backend viene SIEMPRE de la variable de entorno (en dev la fija
// .env.local; en el deploy, el panel de Dokploy). Sin fallback: si falta, el
// build falla acá con un mensaje claro en vez de servir contenido de un
// origen equivocado.
const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
if (!strapiUrl) {
  throw new Error(
    "NEXT_PUBLIC_STRAPI_URL no está definida. Configurala en .env.local (dev) o en las variables de entorno del deploy.",
  );
}
const strapiHost = new URL(strapiUrl);

// El optimizador de imágenes solo puede resolver IPs locales cuando el propio
// backend es local (dev). En producción queda bloqueado (mitiga SSRF).
const strapiIsLocal =
  strapiHost.hostname === "localhost" || strapiHost.hostname === "127.0.0.1";

// Las páginas de Personas viven bajo /personas/*. Las URLs viejas sin prefijo
// redirigen ahí para no romper enlaces existentes y mantener la simetría con
// /empresas/*.
const PERSONAS_SLUGS = [
  "cuentas",
  "tarjetas",
  "creditos",
  "seguros",
  "transferencias",
  "servicios",
  "canales-de-atencion",
  "zona-digital",
];

const nextConfig: NextConfig = {
  output: "standalone",
  async redirects() {
    return PERSONAS_SLUGS.map((slug) => ({
      source: `/${slug}`,
      destination: `/personas/${slug}`,
      permanent: true,
    }));
  },
  images: {
    dangerouslyAllowLocalIP: strapiIsLocal,
    // El logo y los íconos sociales son SVG servidos desde la media library de
    // Strapi (subidos solo por admins). Se sirven con las mitigaciones que
    // recomienda Next: sin ejecución de scripts y como attachment.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: strapiHost.protocol.replace(":", "") as "http" | "https",
        hostname: strapiHost.hostname,
        port: strapiHost.port,
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
