# Utilizar la imagen de Node.js para React
FROM node:14

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar el package.json y el package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código de la aplicación
COPY . .

# Construir la aplicación para producción
# RUN npm run build

# Exponer el puerto 3000
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "start"]
