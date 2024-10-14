import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Training = sequelize.define(
  "Training",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    idCoachSport: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    idSchedule: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    idField: {
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
