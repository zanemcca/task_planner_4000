# Stage 1 - the build process
FROM node:10-alpine as build-deps
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn
COPY . ./
RUN yarn build

# Stage 2 - the production environment
FROM node:10-alpine
WORKDIR /usr/src/app
RUN yarn global add serve
COPY --from=build-deps /usr/src/app/build /usr/src/app/build
EXPOSE 8080
ENV PORT 8080

CMD ["serve", "-s", "build"]
