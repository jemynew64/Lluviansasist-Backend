// import Sequelize from "sequelize";

// export const sequelize = new Sequelize(
//   "dblluvians", // Nombre de la base de datos
//   "root", // Usuario
//   "123456", // Contraseña
//   {
//     host: "localhost",
//     dialect: "mysql",
//     logging: false, // Para desactivar logs de Sequelize
//   }
// );

// src/database/database.js

import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  process.env.DB_NAME, // Nombre de la base de datos
  process.env.DB_USER, // Usuario
  process.env.DB_PASSWORD, // Contraseña
  {
    host: process.env.DB_HOST, // Cambiar localhost por el nombre del servicio de MySQL en Docker
    dialect: "mysql",
    logging: false, // Desactivar logs de Sequelize
  }
);
