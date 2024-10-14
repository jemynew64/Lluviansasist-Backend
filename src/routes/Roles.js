import { Router } from "express";
import {
  getAllRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
} from "../controllers/roleController.js";

const router = Router();

// Rutas
router.get("/", getAllRoles); // Obtener todos los roles
router.get("/:id", getRoleById); // Obtener un rol por ID
router.post("/", createRole); // Crear un nuevo rol
router.put("/:id", updateRole); // Actualizar un rol por ID
router.delete("/:id", deleteRole); // Soft delete un rol por ID

export default router;
