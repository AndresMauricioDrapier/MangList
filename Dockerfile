# Imagen base
FROM node:16.17-alpine as build-stage

WORKDIR /app

# Copiar archivos necesarios
COPY package*.json ./

# Instalar dependencias
RUN npm install

COPY . .

RUN npm run build-prod

#Segunda parte

FROM nginx:1.21-alpine

COPY --from=build-stage /app/dist /usr/share/nginx/index.html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
