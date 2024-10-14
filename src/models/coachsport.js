import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const CoachSport = sequelize.define(
  "CoachSport",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    idUser: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    idSport: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    coachType: {
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
