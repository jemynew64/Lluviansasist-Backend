// app.js
import express from "express";
import morgan from "morgan";
import swaggerUI from "swagger-ui-express"; // Importar swagger
import specs from "./swagger/swagger.js";

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
import sesionRoutes from "./routes/Sesions.js";
//extras
import rutasextraRoutes from "./routes/compleRoute.js";

const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

// Configuración de Swagger
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

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
app.use("/api/sesions", sesionRoutes);
//rutas extra
app.use("/api/extra", rutasextraRoutes);

export default app;
