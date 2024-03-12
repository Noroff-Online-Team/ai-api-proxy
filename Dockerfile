# Builder stage
FROM oven/bun AS builder

WORKDIR /app

COPY package.json bun.lockb ./
COPY prisma prisma
COPY src src
COPY tsconfig.json .

# Install dependencies and build the project
RUN bun install && \
    bun run build --target node --outdir dist

# Runner stage
FROM oven/bun

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY package.json bun.lockb ./
COPY prisma prisma

RUN bun install --production

ENV NODE_ENV production
CMD ["bun", "start:migrate:prod"]

EXPOSE 3000