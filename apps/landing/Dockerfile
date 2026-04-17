FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files first for better caching
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/landing/package.json ./apps/landing/
COPY packages/eslint-config/package.json ./packages/eslint-config/
COPY packages/schemas/package.json ./packages/schemas/
COPY packages/types/package.json ./packages/types/
COPY packages/typescript-config/package.json ./packages/typescript-config/
COPY packages/ui/package.json ./packages/ui/

# Install pnpm and dependencies
RUN npm install -g pnpm
RUN --mount=type=cache,target=/root/.pnpm-store pnpm install --frozen-lockfile

# Copy source code
COPY apps/landing ./apps/landing
COPY packages ./packages

# Build the application
RUN --mount=type=cache,target=/root/.pnpm-store pnpm --filter landing run build

FROM node:20-alpine AS runner

WORKDIR /app

# Copy built application
COPY --from=builder /app/apps/landing/.next/standalone ./
COPY --from=builder /app/apps/landing/.next/static ./.next/static
COPY --from=builder /app/apps/landing/public ./public
COPY --from=builder /app/apps/landing/package.json ./package.json

EXPOSE 3000

CMD ["node", "server.js"]