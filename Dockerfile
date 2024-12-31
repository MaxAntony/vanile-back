# Etapa de construcción
FROM node:22-alpine AS builder

# Configurar entorno para pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Crear directorio de trabajo
WORKDIR /app

# Copiar archivos necesarios para instalar dependencias
COPY package*.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Copiar el resto del código fuente
COPY . .

# Generar Prisma Client y construir la aplicación
RUN pnpx prisma generate
RUN pnpm run build

# Etapa final de producción
FROM node:22-alpine AS runner

# Configurar entorno
ENV NODE_ENV=production

# Crear directorio de trabajo
WORKDIR /app

# Copiar archivos necesarios desde la etapa de construcción
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./prisma

# Puerto de la aplicación
EXPOSE 3000

# Comando para iniciar la aplicación
# CMD ["node", "dist/main.js"]
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main.js"]
