# Imagen base
FROM node:16.17-alpine as build-stage

RUN mkdir -p /app

# Directorio de trabajo
WORKDIR /app

# Copiar archivos necesarios
COPY package*.json ./

# Instalar dependencias
RUN npm install

COPY . .

RUN npm run build-prod

#Segunda parte

FROM nginx:1.21-alpine

COPY --from=build-stage /app/dist/MangList /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
