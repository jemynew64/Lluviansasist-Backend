import { Router } from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

const router = Router();

// Rutas
router.get("/", getAllUsers); // Obtener todos los usuarios
router.get("/:id", getUserById); // Obtener un usuario por ID
router.post("/", createUser); // Crear un nuevo usuario
router.put("/:id", updateUser); // Actualizar un usuario por ID
router.delete("/:id", deleteUser); // Soft delete un usuario por ID

export default router;
