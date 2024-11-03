# Usa una imagen base de Node.js
FROM node:20.16.0

# Define el directorio de trabajo
WORKDIR /usr/src/app

# Copia el archivo package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de la aplicación
COPY . .

# Expone el puerto en el que la aplicación se ejecutará
EXPOSE 3000

# Comando para ejecutar tu aplicación
# CMD ["node", "src/index.js"]
CMD ["npm", "run", "dev"]
