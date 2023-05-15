FROM node:18.15.5 AS build-step

RUN mkdir -p /app

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

RUN npm run build --prod

#Segunda fase

FROM nginx:1.21.3-alpine

COPY --from=build-step /app/dist/MangList /usr/share/nginx/html

