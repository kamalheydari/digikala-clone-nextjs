FROM node:16-alpine AS deps

ENV HTTPS_PROXY="http://fodev.org:8118"

RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json .npmrc* ./ 
RUN npm ci

# If using yarn with a `yarn.lock` comment out above and use below instead
# COPY package.json yarn.lock ./
# RUN yarn install --frozen-lockfile

FROM node:16-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

# If using yarn comment out above and use below instead
# RUN yarn build

FROM node:16-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

RUN ln -s /tmp /app/.next/cache

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]