# Imagen de producción para el frontend Next.js
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
# NEXT_PUBLIC_STRAPI_URL debe estar disponible en el build: Next lo "hornea"
# en el bundle del cliente y lo usa para configurar next/image. Sin default:
# viene de la variable de entorno del deploy (docker-compose la pasa como arg)
# y el build falla con mensaje claro si falta (lo valida next.config.ts).
# STRAPI_INTERNAL_URL también va en build: el destino del rewrite /uploads →
# Strapi se resuelve al compilar next.config. NEXT_PUBLIC_SITE_URL se hornea
# en las URLs de media del bundle.
ARG NEXT_PUBLIC_STRAPI_URL
ARG NEXT_PUBLIC_SITE_URL
ARG STRAPI_INTERNAL_URL
ENV NEXT_PUBLIC_STRAPI_URL=$NEXT_PUBLIC_STRAPI_URL
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
ENV STRAPI_INTERNAL_URL=$STRAPI_INTERNAL_URL
RUN npm run build

FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production
# NEXT_PUBLIC_STRAPI_URL también en runtime: los Server Components leen
# process.env para consultar la API de Strapi. STRAPI_INTERNAL_URL y
# NEXT_PUBLIC_SITE_URL llegan además por el environment del compose.
ARG NEXT_PUBLIC_STRAPI_URL
ARG NEXT_PUBLIC_SITE_URL
ARG STRAPI_INTERNAL_URL
ENV NEXT_PUBLIC_STRAPI_URL=$NEXT_PUBLIC_STRAPI_URL
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
ENV STRAPI_INTERNAL_URL=$STRAPI_INTERNAL_URL
# Build standalone: solo el server compilado y las dependencias que usa,
# en vez de node_modules completo.
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public
EXPOSE 3000
# Escuchar en 0.0.0.0 (no localhost) para que Traefik/Dokploy alcance el contenedor.
ENV HOSTNAME=0.0.0.0
ENV PORT=3000
CMD ["node", "server.js"]
