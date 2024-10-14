import { Router } from "express";
import {
  getAllFields,
  getFieldById,
  createField,
  updateField,
  deleteField,
} from "../controllers/fieldController.js";

const router = Router();

// Rutas
router.get("/", getAllFields); // Obtener todos los campos
router.get("/:id", getFieldById); // Obtener un campo por ID
router.post("/", createField); // Crear un nuevo campo
router.put("/:id", updateField); // Actualizar un campo por ID
router.delete("/:id", deleteField); // Soft delete un campo por ID

export default router;
