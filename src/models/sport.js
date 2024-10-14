import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Sport = sequelize.define(
  "Sport",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    description: {
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
