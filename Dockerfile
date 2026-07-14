# Imagen de producción para el frontend Next.js
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
# NEXT_PUBLIC_STRAPI_URL debe estar disponible en el build: Next lo "hornea"
# en el bundle del cliente y lo usa para configurar next/image.
ARG NEXT_PUBLIC_STRAPI_URL=https://carnes-strapi-ca6779-82-180-133-127.traefik.me
ENV NEXT_PUBLIC_STRAPI_URL=$NEXT_PUBLIC_STRAPI_URL
RUN npm run build

FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production
# NEXT_PUBLIC_STRAPI_URL también en runtime: los Server Components leen
# process.env para consultar la API de Strapi.
ARG NEXT_PUBLIC_STRAPI_URL=https://carnes-strapi-ca6779-82-180-133-127.traefik.me
ENV NEXT_PUBLIC_STRAPI_URL=$NEXT_PUBLIC_STRAPI_URL
COPY --from=build /app ./
EXPOSE 3000
# Escuchar en 0.0.0.0 (no localhost) para que Traefik/Dokploy alcance el contenedor.
ENV HOSTNAME=0.0.0.0
ENV PORT=3000
CMD ["npx", "next", "start", "-H", "0.0.0.0", "-p", "3000"]
