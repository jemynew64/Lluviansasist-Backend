import { Router } from "express";
import {
  getAllCoaches,
  getCoachById,
  createCoach,
  updateCoach,
  deleteCoach,
} from "../controllers/coachSportController.js";

const router = Router();

// Rutas
router.get("/", getAllCoaches); // Obtener todos los entrenadores
router.get("/:id", getCoachById); // Obtener un entrenador por ID
router.post("/", createCoach); // Crear un nuevo entrenador
router.put("/:id", updateCoach); // Actualizar un entrenador por ID
router.delete("/:id", deleteCoach); // Soft delete un entrenador por ID

export default router;
