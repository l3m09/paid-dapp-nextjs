FROM node:14.15.1-buster-slim as build
RUN apt update && apt install -y git python make build-essential
RUN mkdir /app
WORKDIR /app
COPY package.json /app

RUN npm install
COPY . /app
RUN npm run build


FROM nginx:1.19.5-alpine as production
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
