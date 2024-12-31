FROM node:22

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app
COPY package*.json ./
RUN pnpm install
COPY . .
RUN pnpx prisma generate
RUN pnpm run build
CMD ["node", "dist/main.js"]
EXPOSE 3000
