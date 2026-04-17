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

# Regenerate the Prisma client inside the pruned deploy directory.
# pnpm deploy --prod strips `prisma` (a devDependency), and in pnpm workspaces
# the builder's generated client lives under node_modules/.pnpm, not the
# hoisted root — so a plain `cp` can't find it. Running `npx prisma generate`
# against the deploy folder produces a flat node_modules/.prisma/client that
# matches what @prisma/client expects at runtime.
WORKDIR /app/deploy
RUN --mount=type=cache,target=/root/.npm \
    rm -f prisma.config.ts && \
    npx --yes prisma@7.3.0 generate --schema=./prisma/schema.prisma
WORKDIR /app

FROM node:20-alpine AS runner

WORKDIR /app

COPY --from=builder /app/deploy/node_modules ./node_modules
COPY --from=builder /app/apps/api/dist ./dist
COPY --from=builder /app/apps/api/package.json ./package.json
COPY --from=builder /app/apps/api/prisma ./prisma

EXPOSE 3000

CMD ["node", "dist/main.js"]