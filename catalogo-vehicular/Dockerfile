# Etapa 1: Compilar Angular
FROM node:18-alpine AS builder

WORKDIR /app

# Instalar pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

COPY pnpm-lock.yaml ./
COPY package.json ./

RUN pnpm install

COPY . .

RUN pnpm run build

# Etapa 2: Servir con Nginx
FROM nginx:alpine

COPY --from=builder /app/dist/catalogo-vehicular/browser /usr/share/nginx/html