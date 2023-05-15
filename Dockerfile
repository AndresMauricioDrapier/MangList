# Imagen base
FROM node:16.17-alpine

# Directorio de trabajo
WORKDIR /app

# Copiar archivos necesarios
COPY package*.json ./
COPY . .

# Instalar dependencias
RUN npm install

# Exponer el puerto 4200
EXPOSE 80

# Comando para iniciar la aplicación
CMD ["npm", "start"]
