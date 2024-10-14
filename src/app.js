// app.js
import express from "express";
import morgan from "morgan";

// Importar rutas
import userRoutes from "./routes/Users.js";
import roleRoutes from "./routes/Roles.js"; // Asegúrate de que la ruta sea correcta
import locationRoutes from "./routes/Locations.js"; // Asegúrate de que la ruta sea correcta
import registrationRoutes from "./routes/Registrations.js";
import coachSportRoutes from "./routes/CoachSports.js";
import fieldRoutes from "./routes/Fields.js";
import scheduleRoutes from "./routes/Schedules.js";
import trainingRoutes from "./routes/Trainings.js";
import dateRoutes from "./routes/Dates.js";
import sportRoutes from "./routes/Sports.js";
import attendanceRoutes from "./routes/Attendance.js";
const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

// Rutas
app.use("/api/users", userRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/locations", locationRoutes);
app.use("/api/registrations", registrationRoutes);
app.use("/api/coaches", coachSportRoutes);
app.use("/api/fields", fieldRoutes);
app.use("/api/schedules", scheduleRoutes);
app.use("/api/trainings", trainingRoutes);
app.use("/api/dates", dateRoutes);
app.use("/api/sports", sportRoutes);
app.use("/api/attendances", attendanceRoutes);
export default app;
