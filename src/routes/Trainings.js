import { Router } from "express";
import {
  getAllTrainings,
  getTrainingById,
  createTraining,
  updateTraining,
  deleteTraining,
} from "../controllers/trainingController.js";

const router = Router();

// Rutas
router.get("/", getAllTrainings); // Obtener todos los entrenamientos
router.get("/:id", getTrainingById); // Obtener un entrenamiento por ID
router.post("/", createTraining); // Crear un nuevo entrenamiento
router.put("/:id", updateTraining); // Actualizar un entrenamiento por ID
router.delete("/:id", deleteTraining); // Soft delete un entrenamiento por ID

export default router;
