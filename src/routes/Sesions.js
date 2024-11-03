import { Router } from "express";
import { postLogin } from "../controllers/sesionController.js";

const router = Router();

router.post("/sesion", postLogin); // Obtener todos los horarios

export default router;
