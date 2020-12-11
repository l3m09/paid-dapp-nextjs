# Step 1
FROM node:14.15.1-buster-slim as build-step
RUN mkdir /app
WORKDIR /app
COPY package.json /app

ARG GITHUB_USER
ARG GITHUB_PASS
RUN echo machine github.com login $GITHUB_USER password $GITHUB_PASS >> $HOME/.netrc

RUN npm install
COPY . /app
RUN npm run build

# Stage 2
FROM nginx:1.19.5-alpine
COPY --from=build-step /app/build /usr/share/nginx/html

EXPOSE 80
