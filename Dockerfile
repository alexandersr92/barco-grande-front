# Imagen de producción para el frontend Next.js
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
# NEXT_PUBLIC_STRAPI_URL debe estar disponible en el build: Next lo "hornea"
# en el bundle del cliente y lo usa para configurar next/image.
ARG NEXT_PUBLIC_STRAPI_URL
ENV NEXT_PUBLIC_STRAPI_URL=$NEXT_PUBLIC_STRAPI_URL
RUN npm run build

FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production
# NEXT_PUBLIC_STRAPI_URL también en runtime: los Server Components leen
# process.env para consultar la API de Strapi.
ARG NEXT_PUBLIC_STRAPI_URL
ENV NEXT_PUBLIC_STRAPI_URL=$NEXT_PUBLIC_STRAPI_URL
COPY --from=build /app ./
EXPOSE 3000
CMD ["npm", "run", "start"]
