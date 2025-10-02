FROM node:18-alpine
WORKDIR /app

COPY package.json ./
RUN npm install -g pnpm && pnpm install

COPY . .

# copy env prod
COPY .env.production .env.production

RUN pnpm build

EXPOSE 3000
CMD ["pnpm", "start"]