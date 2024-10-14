import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Location = sequelize.define(
  "Location",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    branch: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    district: {
      type: DataTypes.STRING,
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
