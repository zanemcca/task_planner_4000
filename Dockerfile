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
COPY --from=build-deps /usr/src/app/build /usr/src/app/build
COPY --from=build-deps /usr/src/app/package.json package.json
COPY --from=build-deps /usr/src/app/yarn.lock yarn.lock
COPY --from=build-deps /usr/src/app/server.js server.js
RUN yarn install express asana
EXPOSE 8080
ENV PORT 8080

CMD ["yarn", "serve"]
