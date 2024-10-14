import { Router } from "express";
import {
  getAllLocations,
  getLocationById,
  createLocation,
  updateLocation,
  deleteLocation,
} from "../controllers/locationController.js";

const router = Router();

// Rutas
router.get("/", getAllLocations); // Obtener todas las ubicaciones
router.get("/:id", getLocationById); // Obtener una ubicación por ID
router.post("/", createLocation); // Crear una nueva ubicación
router.put("/:id", updateLocation); // Actualizar una ubicación por ID
router.delete("/:id", deleteLocation); // Soft delete una ubicación por ID

export default router;
