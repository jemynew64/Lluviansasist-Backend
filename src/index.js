import app from "./app.js";
import { sequelize } from "./database/database.js";
import { User } from "./models/user.js";
import { Role } from "./models/role.js";
import { Location } from "./models/location.js";
import { Registration } from "./models/registration.js";
import { CoachSport } from "./models/coachsport.js";
import { Field } from "./models/field.js";
import { Schedule } from "./models/schedule.js";
import { Training } from "./models/training.js";
import { Attendance } from "./models/attendance.js";
// Define las relaciones
User.belongsTo(Role, { foreignKey: "roleId", as: "role" });
User.belongsTo(Location, { foreignKey: "locationId", as: "location" });
User.hasMany(Registration, { foreignKey: "idUser", as: "registrations" });
CoachSport.belongsTo(User, { foreignKey: "idUser", as: "user" });
Registration.belongsTo(User, { foreignKey: "idUser", as: "user" });
Training.belongsTo(CoachSport, {
  foreignKey: "idCoachSport",
  as: "coachSport",
});
Training.belongsTo(Schedule, { foreignKey: "idSchedule", as: "schedule" });
Training.belongsTo(Field, { foreignKey: "idField", as: "field" });
Attendance.belongsTo(Registration, {
  foreignKey: "idRegistration",
  as: "registration",
});

// Sincronizar la base de datos y levantar el servidor
async function main() {
  try {
    await sequelize.sync({ force: false });
    console.log("Base de datos sincronizada");
    app.listen(3000);
    console.log("Servidor en el puerto http://localhost:3000");
  } catch (error) {
    console.error("Error al iniciar el servidor:", error);
  }
}

main();
