FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files first for better caching
COPY apps/api/package*.json ./apps/api/
COPY ./pnpm-lock.yaml ./pnpm-lock.yaml
COPY ./pnpm-workspace.yaml ./pnpm-workspace.yaml

# Install pnpm and dependencies
RUN npm install -g pnpm
RUN --mount=type=cache,target=/root/.pnpm-store pnpm install --frozen-lockfile

# Copy source code
COPY apps/api ./apps/api

# Build the application
RUN --mount=type=cache,target=/root/.pnpm-store pnpm --filter api run build

FROM node:20-alpine AS runner

WORKDIR /app

# Copy built application
COPY --from=builder /app/apps/api/dist ./dist
COPY --from=builder /app/apps/api/node_modules ./node_modules
COPY --from=builder /app/apps/api/package.json ./package.json
COPY --from=builder /app/apps/api/generated ./generated

# Install pnpm for runtime
RUN npm install -g pnpm

EXPOSE 3000

CMD ["node", "dist/main.js"]