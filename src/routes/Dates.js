import { Router } from "express";
import {
  getAllDates,
  getDateById,
  createDate,
  updateDate,
  deleteDate,
} from "../controllers/dateController.js"; // Asegúrate de que la ruta sea correcta

const router = Router();

// Rutas
router.get("/", getAllDates); // Obtener todas las fechas
router.get("/:id", getDateById); // Obtener una fecha por ID
router.post("/", createDate); // Crear una nueva fecha
router.put("/:id", updateDate); // Actualizar una fecha por ID
router.delete("/:id", deleteDate); // Soft delete una fecha por ID

export default router;
