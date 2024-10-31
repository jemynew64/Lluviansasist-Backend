import { Router } from "express";
import {
  getAllSchedules,
  getScheduleById,
  createSchedule,
  updateSchedule,
  deleteSchedule,
} from "../controllers/scheduleController.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Schedule
 *   description: Operaciones relacionadas con los horarios
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Schedule:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         startTime:
 *           type: string
 *           format: time
 *           example: "08:00:00"
 *         endTime:
 *           type: string
 *           format: time
 *           example: "10:00:00"
 *         day:
 *           type: string
 *           example: "Monday"
 *         enabled:
 *           type: boolean
 *           example: true
 *     ScheduleInput:
 *       type: object
 *       properties:
 *         startTime:
 *           type: string
 *           format: time
 *           example: "08:00:00"
 *         endTime:
 *           type: string
 *           format: time
 *           example: "10:00:00"
 *         day:
 *           type: string
 *           example: "Monday"
 *         enabled:
 *           type: boolean
 *           example: true
 *       required:
 *         - startTime
 *         - endTime
 *         - day
 */

/**
 * @swagger
 * /api/schedules:
 *   get:
 *     tags: [Schedule]
 *     summary: Obtener todos los horarios
 *     description: Retorna una lista de todos los horarios disponibles.
 *     responses:
 *       200:
 *         description: Lista de horarios.
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
 *                     $ref: '#/components/schemas/Schedule'
 */
router.get("/", getAllSchedules); // Obtener todos los horarios

/**
 * @swagger
 * /api/schedules/{id}:
 *   get:
 *     tags: [Schedule]
 *     summary: Obtener un horario por ID
 *     description: Retorna un horario específico basado en el ID proporcionado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del horario
 *     responses:
 *       200:
 *         description: Horario encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Schedule'
 *       404:
 *         description: Horario no encontrado.
 */
router.get("/:id", getScheduleById); // Obtener un horario por ID

/**
 * @swagger
 * /api/schedules:
 *   post:
 *     tags: [Schedule]
 *     summary: Crear un nuevo horario
 *     description: Crea un nuevo horario en el sistema.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ScheduleInput'
 *     responses:
 *       201:
 *         description: Horario creado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Schedule'
 *       400:
 *         description: Datos inválidos.
 */
router.post("/", createSchedule); // Crear un nuevo horario

/**
 * @swagger
 * /api/schedules/{id}:
 *   put:
 *     tags: [Schedule]
 *     summary: Actualizar un horario por ID
 *     description: Actualiza los detalles de un horario específico basado en el ID proporcionado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del horario a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               startTime:
 *                 type: string
 *                 format: time
 *                 example: "09:00:00"
 *               endTime:
 *                 type: string
 *                 format: time
 *                 example: "11:00:00"
 *     responses:
 *       200:
 *         description: Horario actualizado exitosamente.
 *       404:
 *         description: Horario no encontrado.
 *       400:
 *         description: Datos inválidos.
 */
router.put("/:id", updateSchedule); // Actualizar un horario por ID

/**
 * @swagger
 * /api/schedules/{id}:
 *   delete:
 *     tags: [Schedule]
 *     summary: Soft delete un horario por ID
 *     description: Marca un horario como deshabilitado sin eliminarlo permanentemente.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del horario a deshabilitar
 *     responses:
 *       200:
 *         description: Horario deshabilitado exitosamente.
 *       404:
 *         description: Horario no encontrado.
 */
router.delete("/:id", deleteSchedule); // Soft delete un horario por ID

export default router;
