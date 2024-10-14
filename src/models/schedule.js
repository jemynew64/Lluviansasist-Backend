import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Schedule = sequelize.define(
  "Schedule",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    startTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    endTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    day: {
      type: DataTypes.ENUM(
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ),
      allowNull: false,
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
