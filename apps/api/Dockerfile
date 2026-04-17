FROM node:20-alpine AS builder

WORKDIR /app

# Required so pnpm skips TTY confirmation prompts in CI/Docker
ENV CI=true

# Copy workspace manifests first for layer caching
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/api/package.json ./apps/api/
COPY packages/eslint-config/package.json ./packages/eslint-config/
COPY packages/schemas/package.json ./packages/schemas/
COPY packages/types/package.json ./packages/types/
COPY packages/typescript-config/package.json ./packages/typescript-config/
COPY packages/ui/package.json ./packages/ui/

RUN npm install -g pnpm

RUN --mount=type=cache,target=/root/.pnpm-store pnpm install --frozen-lockfile

# Copy source code
COPY apps/api ./apps/api
COPY packages ./packages

# Build
RUN --mount=type=cache,target=/root/.pnpm-store pnpm --filter api run build

# Prune to a self-contained production deployment
RUN --mount=type=cache,target=/root/.pnpm-store pnpm --filter api deploy --prod /app/deploy

# Copy the generated Prisma engine into the deploy output
# Prisma v7+ generates into @prisma/client (not .prisma)
RUN cp -r /app/node_modules/.pnpm/@prisma+client*/node_modules/@prisma/client/. \
    /app/deploy/node_modules/@prisma/client/ 2>/dev/null || true

FROM node:20-alpine AS runner

WORKDIR /app

COPY --from=builder /app/deploy/node_modules ./node_modules
COPY --from=builder /app/apps/api/dist ./dist
COPY --from=builder /app/apps/api/package.json ./package.json
COPY --from=builder /app/apps/api/prisma ./prisma

EXPOSE 3000

CMD ["node", "dist/main.js"]