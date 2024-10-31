// src/swagger/swagger.js
import swaggerJSDoc from "swagger-jsdoc";

// Configuración de Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "LLUVIANS API",
      version: "1.0.0",
      description: "Documentación de mi API utilizando Swagger",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./src/routes/*.js"], // Especifica la ruta a tus archivos de rutas donde están definidas las operaciones
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export default swaggerSpec;
