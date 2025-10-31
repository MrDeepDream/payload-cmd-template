# Backend Dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci

# Build the application
FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build TypeScript server and admin panel
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

# Create a non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 payloaduser

# Copy built application
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/build ./build
COPY --from=builder /app/src ./src
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/tsconfig.json ./tsconfig.json

# Create media directory and set permissions
RUN mkdir -p /app/media && chown -R payloaduser:nodejs /app/media
RUN chown -R payloaduser:nodejs /app/src /app/build

USER payloaduser

EXPOSE 3000

ENV PORT=3000

CMD ["node", "dist/server.js"]
