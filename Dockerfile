FROM node:erbium-buster-slim as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install -g cnpm --registry=https://registry.npm.taobao.org

RUN cnpm install
COPY ./ .
RUN export NODE_OPTIONS=--openssl-legacy-provider
RUN cnpm run build

FROM nginx as production-stage
RUN mkdir /app
COPY --from=build-stage /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf
