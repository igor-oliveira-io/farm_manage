FROM node:20-alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn prisma generate

RUN yarn prisma migrate deploy

RUN yarn prisma db seed

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start:prod"]
