FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files first for better caching
COPY apps/web/package*.json ./apps/web/
COPY packages/*/package.json ./packages/*/
COPY ./pnpm-lock.yaml ./pnpm-lock.yaml
COPY ./pnpm-workspace.yaml ./pnpm-workspace.yaml

# Install pnpm and dependencies
RUN npm install -g pnpm
RUN --mount=type=cache,target=/root/.pnpm-store pnpm install --frozen-lockfile

# Copy source code
COPY apps/web ./apps/web
COPY packages ./packages

# Build the application
RUN --mount=type=cache,target=/root/.pnpm-store pnpm --filter web run build

FROM node:20-alpine AS runner

WORKDIR /app

# Copy built application
COPY --from=builder /app/apps/web/.next/standalone ./
COPY --from=builder /app/apps/web/.next/static ./.next/static
COPY --from=builder /app/apps/web/public ./public
COPY --from=builder /app/apps/web/package.json ./package.json

# Install pnpm for runtime
RUN npm install -g pnpm

EXPOSE 3000

CMD ["pnpm", "start"]