# Builder stage
FROM oven/bun AS builder

WORKDIR /app

COPY package.json .
COPY bun.lockb .

RUN bun install

COPY src src
COPY tsconfig.json .

RUN bun run build --outdir dist

# Runner stage
FROM oven/bun

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY package.json .
COPY bun.lockb .

RUN bun install --production

ENV NODE_ENV production
CMD ["bun", "dist/index.js"]

EXPOSE 3000
