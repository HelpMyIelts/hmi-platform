FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files first for better caching
COPY apps/web/package*.json ./apps/web/
COPY ./pnpm-lock.yaml ./pnpm-lock.yaml
COPY ./pnpm-workspace.yaml ./pnpm-workspace.yaml

# Install pnpm and dependencies
RUN npm install -g pnpm
RUN --mount=type=cache,target=/root/.pnpm-store pnpm install --frozen-lockfile

# Copy source code
COPY apps/web ./apps/web

# Build the application
RUN --mount=type=cache,target=/root/.pnpm-store pnpm --filter web run build

FROM node:20-alpine AS runner

WORKDIR /app

# Copy built application
COPY --from=builder /app/apps/web/dist ./dist
COPY --from=builder /app/apps/web/node_modules ./node_modules
COPY --from=builder /app/apps/web/package.json ./package.json

# Install pnpm for runtime
RUN npm install -g pnpm

EXPOSE 3000

CMD ["pnpm", "start"]