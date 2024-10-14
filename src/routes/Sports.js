import { Router } from "express";
import {
  getAllSports,
  getSportById,
  createSport,
  updateSport,
  deleteSport,
} from "../controllers/sportController.js"; // Asegúrate de que la ruta sea correcta

const router = Router();

// Rutas
router.get("/", getAllSports); // Obtener todos los deportes
router.get("/:id", getSportById); // Obtener un deporte por ID
router.post("/", createSport); // Crear un nuevo deporte
router.put("/:id", updateSport); // Actualizar un deporte por ID
router.delete("/:id", deleteSport); // Soft delete un deporte por ID

export default router;
