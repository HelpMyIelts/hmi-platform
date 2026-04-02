FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files first for better caching
COPY apps/api/package*.json ./apps/api/
COPY packages/eslint-config/package.json ./packages/eslint-config/
COPY packages/schemas/package.json ./packages/schemas/
COPY packages/types/package.json ./packages/types/
COPY packages/typescript-config/package.json ./packages/typescript-config/
COPY packages/ui/package.json ./packages/ui/
COPY ./pnpm-lock.yaml ./pnpm-lock.yaml
COPY ./pnpm-workspace.yaml ./pnpm-workspace.yaml

# Install pnpm and dependencies
RUN npm install -g pnpm
RUN --mount=type=cache,target=/root/.pnpm-store pnpm install --frozen-lockfile

# Copy source code
COPY apps/api ./apps/api
COPY packages ./packages

# Copy Prisma schema for client generation
COPY apps/api/prisma ./apps/api/prisma

# Build the application
RUN --mount=type=cache,target=/root/.pnpm-store pnpm --filter api run build

FROM node:20-alpine AS runner

WORKDIR /app

# Copy built application
COPY --from=builder /app/apps/api/dist ./dist
COPY --from=builder /app/apps/api/node_modules ./node_modules
COPY --from=builder /app/apps/api/package.json ./package.json

# Install pnpm for runtime
RUN npm install -g pnpm

EXPOSE 3000

CMD ["node", "dist/main.js"]