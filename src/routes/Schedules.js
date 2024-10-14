import { Router } from "express";
import {
  getAllSchedules,
  getScheduleById,
  createSchedule,
  updateSchedule,
  deleteSchedule,
} from "../controllers/scheduleController.js";

const router = Router();

// Rutas
router.get("/", getAllSchedules); // Obtener todos los horarios
router.get("/:id", getScheduleById); // Obtener un horario por ID
router.post("/", createSchedule); // Crear un nuevo horario
router.put("/:id", updateSchedule); // Actualizar un horario por ID
router.delete("/:id", deleteSchedule); // Soft delete un horario por ID

export default router;
