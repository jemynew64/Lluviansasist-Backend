import Sequelize from "sequelize";

export const sequelize = new Sequelize(
  "dblluvians", // Nombre de la base de datos
  "root", // Usuario
  "123456", // Contraseña
  {
    host: "localhost",
    dialect: "mysql",
    logging: false, // Para desactivar logs de Sequelize
  }
);
