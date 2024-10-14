import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Registration = sequelize.define(
  "Registration",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    idTraining: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    idUser: {
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
