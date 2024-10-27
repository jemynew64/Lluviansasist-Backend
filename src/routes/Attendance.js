import { Router } from "express";
import {
  getAllAttendances,
  getAttendanceById,
  createAttendance,
  updateAttendance,
  deleteAttendance,
  bulkCreateAttendances, // Importa el controlador para el ingreso masivo
} from "../controllers/attendanceController.js"; // Asegúrate de que la ruta sea correcta

const router = Router();

// Rutas
router.get("/", getAllAttendances); // Obtener todas las asistencias
router.get("/:id", getAttendanceById); // Obtener una asistencia por ID
router.post("/", createAttendance); // Crear una nueva asistencia
router.post("/bulk", bulkCreateAttendances); // Ingreso masivo de asistencias
router.put("/:id", updateAttendance); // Actualizar una asistencia por ID
router.delete("/:id", deleteAttendance); // Soft delete una asistencia por ID

export default router;
