import { Router } from "express";
import {
  getAllCoaches,
  getCoachById,
  createCoach,
  updateCoach,
  deleteCoach,
} from "../controllers/coachSportController.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: CoachSport
 *   description: Operaciones relacionadas con los entrenadores de deportes
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CoachSport:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         idUser:
 *           type: integer
 *           example: 1
 *         idSport:
 *           type: integer
 *           example: 2
 *         coachType:
 *           type: string
 *           example: "Assistant Coach"
 *         enabled:
 *           type: boolean
 *           example: true
 *     CoachSportInput:
 *       type: object
 *       properties:
 *         idUser:
 *           type: integer
 *           example: 1
 *         idSport:
 *           type: integer
 *           example: 2
 *         coachType:
 *           type: string
 *           example: "Assistant Coach"
 *         enabled:
 *           type: boolean
 *           example: true
 *       required:
 *         - idUser
 *         - idSport
 *         - coachType
 */

/**
 * @swagger
 * /api/coaches:
 *   get:
 *     tags: [CoachSport]
 *     summary: Obtener todos los entrenadores
 *     description: Retorna una lista de todos los entrenadores registrados en el sistema.
 *     responses:
 *       200:
 *         description: Lista de entrenadores.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/CoachSport'
 */
router.get("/", getAllCoaches); // Obtener todos los entrenadores

/**
 * @swagger
 * /api/coaches/{id}:
 *   get:
 *     tags: [CoachSport]
 *     summary: Obtener un entrenador por ID
 *     description: Retorna un entrenador específico basado en el ID proporcionado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del entrenador
 *     responses:
 *       200:
 *         description: Entrenador encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CoachSport'
 *       404:
 *         description: Entrenador no encontrado.
 */
router.get("/:id", getCoachById); // Obtener un entrenador por ID

/**
 * @swagger
 * /api/coaches:
 *   post:
 *     tags: [CoachSport]
 *     summary: Crear un nuevo entrenador
 *     description: Crea un nuevo entrenador en el sistema.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CoachSportInput'
 *     responses:
 *       201:
 *         description: Entrenador creado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CoachSport'
 *       400:
 *         description: Datos inválidos.
 */
router.post("/", createCoach); // Crear un nuevo entrenador

/**
 * @swagger
 * /api/coaches/{id}:
 *   put:
 *     tags: [CoachSport]
 *     summary: Actualizar un entrenador por ID
 *     description: Actualiza los detalles de un entrenador específico basado en el ID proporcionado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del entrenador a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               coachType:
 *                 type: string
 *                 example: "Head Coach"
 *     responses:
 *       200:
 *         description: Entrenador actualizado exitosamente.
 *       404:
 *         description: Entrenador no encontrado.
 *       400:
 *         description: Datos inválidos.
 */
router.put("/:id", updateCoach); // Actualizar un entrenador por ID

/**
 * @swagger
 * /api/coaches/{id}:
 *   delete:
 *     tags: [CoachSport]
 *     summary: Soft delete de un entrenador por ID
 *     description: Marca un entrenador como deshabilitado sin eliminarlo permanentemente.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del entrenador a deshabilitar
 *     responses:
 *       200:
 *         description: Entrenador deshabilitado exitosamente.
 *       404:
 *         description: Entrenador no encontrado.
 */
router.delete("/:id", deleteCoach); // Soft delete de un entrenador por ID

export default router;
