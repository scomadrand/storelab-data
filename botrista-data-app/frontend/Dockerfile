# Utilizar la imagen de Node.js para React
FROM node:14

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos de la aplicación
COPY package*.json ./
COPY . .

# Instalar dependencias y construir la aplicación
RUN npm install
RUN npm install react-scripts --save
RUN npm install @babel/core@^7.16.0 @babel/preset-env@^7.16.0 @babel/preset-react@^7.16.0
RUN npm run build

# Exponer el puerto donde corre React
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "start"]
