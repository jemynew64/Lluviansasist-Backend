import { Router } from "express";
import {
  getAllTrainings,
  getTrainingById,
  createTraining,
  updateTraining,
  deleteTraining,
} from "../controllers/trainingController.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Training
 *   description: Operaciones relacionadas con los entrenamientos
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Training:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         idCoachSport:
 *           type: integer
 *           example: 1
 *         idSchedule:
 *           type: integer
 *           example: 1
 *         idField:
 *           type: integer
 *           example: 1
 *         enabled:
 *           type: boolean
 *           example: true
 *     TrainingInput:
 *       type: object
 *       properties:
 *         idCoachSport:
 *           type: integer
 *           example: 1
 *         idSchedule:
 *           type: integer
 *           example: 1
 *         idField:
 *           type: integer
 *           example: 1
 *         enabled:
 *           type: boolean
 *           example: true
 *       required:
 *         - idCoachSport
 *         - idSchedule
 *         - idField
 */

/**
 * @swagger
 * /api/trainings:
 *   get:
 *     tags: [Training]
 *     summary: Obtener todos los entrenamientos
 *     description: Retorna una lista de todos los entrenamientos disponibles.
 *     responses:
 *       200:
 *         description: Lista de entrenamientos.
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
 *                     $ref: '#/components/schemas/Training'
 */
router.get("/", getAllTrainings); // Obtener todos los entrenamientos

/**
 * @swagger
 * /api/trainings/{id}:
 *   get:
 *     tags: [Training]
 *     summary: Obtener un entrenamiento por ID
 *     description: Retorna un entrenamiento específico basado en el ID proporcionado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del entrenamiento
 *     responses:
 *       200:
 *         description: Entrenamiento encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Training'
 *       404:
 *         description: Entrenamiento no encontrado.
 */
router.get("/:id", getTrainingById); // Obtener un entrenamiento por ID

/**
 * @swagger
 * /api/trainings:
 *   post:
 *     tags: [Training]
 *     summary: Crear un nuevo entrenamiento
 *     description: Crea un nuevo entrenamiento en el sistema.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TrainingInput'
 *     responses:
 *       201:
 *         description: Entrenamiento creado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Training'
 *       400:
 *         description: Datos inválidos.
 */
router.post("/", createTraining); // Crear un nuevo entrenamiento

/**
 * @swagger
 * /api/trainings/{id}:
 *   put:
 *     tags: [Training]
 *     summary: Actualizar un entrenamiento por ID
 *     description: Actualiza los detalles de un entrenamiento específico basado en el ID proporcionado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del entrenamiento a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idField:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Entrenamiento actualizado exitosamente.
 *       404:
 *         description: Entrenamiento no encontrado.
 *       400:
 *         description: Datos inválidos.
 */
router.put("/:id", updateTraining); // Actualizar un entrenamiento por ID

/**
 * @swagger
 * /api/trainings/{id}:
 *   delete:
 *     tags: [Training]
 *     summary: Soft delete un entrenamiento por ID
 *     description: Marca un entrenamiento como deshabilitado sin eliminarlo permanentemente.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del entrenamiento a deshabilitar
 *     responses:
 *       200:
 *         description: Entrenamiento deshabilitado exitosamente.
 *       404:
 *         description: Entrenamiento no encontrado.
 */
router.delete("/:id", deleteTraining); // Soft delete un entrenamiento por ID

export default router;
