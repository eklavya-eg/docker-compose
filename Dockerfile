FROM node:22-alpine as builder
WORKDIR /app

COPY package*.json tsconfig.json tsconfig.tsbuildinfo ./
RUN npm install
COPY . .
RUN npm run build
# ENV DATABASE_URL=postgresql://user:user@localhost:5432/docker-compose
# ENV PORT=3000
# RUN npx prisma migrate dev
# RUN npx prisma generate

FROM node:22-bullseye
WORKDIR /app

COPY --from=builder /app/package*.json .
RUN npm i -g pm2-runtime
RUN npm install --omit=dev
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
ENV DATABASE_URL=postgresql://user:user@docker-postgres:5432/docker-compose
RUN npx prisma generate
ENV PORT=3000

EXPOSE 3000
CMD [ "pm2-runtime", "dist/index.js" ]