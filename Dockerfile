# Use the current Node LTS (Long Term Support)
FROM node:14.15.1-buster-slim as base
# Install packages required for building the app
RUN apt update && apt install -y git python make build-essential
# Set the working directory
WORKDIR /app
# Copy package.json to install dependencies
COPY package.json .
# Execute npm to actually install dependencies
RUN npm install
# Copy specific files and folders from source to the dest path in the image's filesystem.
COPY android android
COPY ios ios
COPY public public
COPY src src
COPY *.js *.json .env ./

# Use the base stage to produce a build
FROM base as build
# Execute npm to create a production build
RUN npm run build


# Use the build stage to run unit tests
FROM build as unit-test
# Copy tests directory
#COPY tests .
# Execute npm to actually run test:unit script
# TODO Uncomment the line below when the unit test is passing.
#RUN npm run test:unit


# Use the current stable nginx image for production stage
FROM nginx:1.19.5-alpine as production
# Copy build directory from build stage
COPY --from=build /app/build /usr/share/nginx/html
# Define the network port that this container will listen on at runtime.
EXPOSE 80
