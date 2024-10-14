import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Attendance = sequelize.define(
  "Attendance",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    idRegistration: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    classNumber: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    attendanceStatus: {
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
