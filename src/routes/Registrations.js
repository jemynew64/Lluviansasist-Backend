import { Router } from "express";
import {
  getAllRegistrations,
  getRegistrationById,
  createRegistration,
  updateRegistration,
  deleteRegistration,
} from "../controllers/registrationController.js";

const router = Router();

// Rutas
router.get("/", getAllRegistrations); // Obtener todas las inscripciones
router.get("/:id", getRegistrationById); // Obtener una inscripción por ID
router.post("/", createRegistration); // Crear una nueva inscripción
router.put("/:id", updateRegistration); // Actualizar una inscripción por ID
router.delete("/:id", deleteRegistration); // Soft delete una inscripción por ID

export default router;
