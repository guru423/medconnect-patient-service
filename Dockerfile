# Stage 1: Build
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install --production

# Stage 2: Production (final, smaller image)
FROM node:18-alpine
WORKDIR /app

# Non-root user create cheయండి (security best practice - healthcare data కోసం important)
RUN addgroup -g 1001 -S nodejs && adduser -S nodeuser -u 1001

COPY --from=builder /app/node_modules ./node_modules
COPY . .

# Non-root user కి ownership ఇవ్వండి
RUN chown -R nodeuser:nodejs /app
USER nodeuser

EXPOSE 3000

# Health check (Docker level, K8s probes కి additional)
HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1

CMD ["node", "src/app.js"]