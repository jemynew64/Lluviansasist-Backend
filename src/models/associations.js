// src/models/associations.js

import { user } from "./user.js";
import { coachSport } from "./coachsport.js";
import { role } from "./role.js";
import { location } from "./location.js";
import { registration } from "./registration.js";
import { sport } from "./sport.js";
import { attendance } from "./attendance.js";

// Definición de relaciones aquí
user.belongsTo(role, { foreignKey: "roleId" });
user.belongsTo(location, { foreignKey: "locationId" });
user.hasMany(registration, { foreignKey: "idUser" });

coachSport.belongsTo(user, { foreignKey: "idUser" });
coachSport.belongsTo(sport, { foreignKey: "idSport" });
// Agrega las relaciones restantes aquí...
