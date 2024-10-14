import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const User = sequelize.define(
  "User", // Nombre del modelo en mayúscula
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    dni: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    emergency_number: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    birthDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    locationId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    enabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    timestamps: false,
  }
);
