FROM node:18.17 AS builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:18.17-alpine
COPY --from=builder /usr/src/app/dist ./dist
COPY package*.json ./
RUN npm install --only=production
EXPOSE 9000
CMD ["node", "dist/main"]