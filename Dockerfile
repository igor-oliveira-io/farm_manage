# Etapa 1: Usar Node.js 20
FROM node:20 AS builder

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn prisma generate

RUN yarn build

FROM node:20

WORKDIR /app

COPY --from=builder /app /app

EXPOSE 3000

CMD ["yarn", "start:prod"]
