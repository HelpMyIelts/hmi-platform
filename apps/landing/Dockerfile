FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files first for better caching
COPY apps/landing/package*.json ./apps/landing/
COPY pnpm-lock.yaml ./
COPY pnpm-workspace.yaml ./

# Install pnpm and dependencies
RUN npm install -g pnpm
RUN --mount=type=cache,target=/root/.pnpm-store pnpm install --frozen-lockfile

# Copy source code
COPY apps/landing ./apps/landing

# Build the application
RUN --mount=type=cache,target=/root/.pnpm-store pnpm --filter landing run build

FROM node:20-alpine AS runner

WORKDIR /app

# Copy built application
COPY --from=builder /app/apps/landing/.next/standalone ./
COPY --from=builder /app/apps/landing/.next/static ./.next/static
COPY --from=builder /app/apps/landing/public ./public
COPY --from=builder /app/apps/landing/package.json ./package.json

# Install pnpm for runtime
RUN npm install -g pnpm

EXPOSE 3000

CMD ["pnpm", "start"]