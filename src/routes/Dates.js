import { Router } from "express";
import {
  getAllDates,
  getDateById,
  createDate,
  updateDate,
  deleteDate,
} from "../controllers/dateController.js"; // Asegúrate de que la ruta sea correcta

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Date
 *   description: Operaciones relacionadas con las fechas
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Date:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         date:
 *           type: string
 *           format: date-time
 *           example: "2024-10-03T00:00:00"
 *         enabled:
 *           type: boolean
 *           example: true
 *     DateInput:
 *       type: object
 *       properties:
 *         date:
 *           type: string
 *           format: date-time
 *           example: "2024-10-03T00:00:00"
 *         enabled:
 *           type: boolean
 *           example: true
 *       required:
 *         - date
 */

/**
 * @swagger
 * /api/dates:
 *   get:
 *     tags: [Date]
 *     summary: Obtener todas las fechas
 *     description: Retorna una lista de todas las fechas habilitadas.
 *     responses:
 *       200:
 *         description: Lista de fechas.
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
 *                     $ref: '#/components/schemas/Date'
 */
router.get("/", getAllDates); // Obtener todas las fechas

/**
 * @swagger
 * /api/dates/{id}:
 *   get:
 *     tags: [Date]
 *     summary: Obtener una fecha por ID
 *     description: Retorna una fecha específica basada en el ID proporcionado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la fecha
 *     responses:
 *       200:
 *         description: Fecha encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Date'
 *       404:
 *         description: Fecha no encontrada.
 */
router.get("/:id", getDateById); // Obtener una fecha por ID

/**
 * @swagger
 * /api/dates:
 *   post:
 *     tags: [Date]
 *     summary: Crear una nueva fecha
 *     description: Crea una nueva fecha en el sistema.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DateInput'
 *     responses:
 *       201:
 *         description: Fecha creada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Date'
 *       400:
 *         description: Datos inválidos.
 */
router.post("/", createDate); // Crear una nueva fecha

/**
 * @swagger
 * /api/dates/{id}:
 *   put:
 *     tags: [Date]
 *     summary: Actualizar una fecha por ID
 *     description: Actualiza los detalles de una fecha específica basada en el ID proporcionado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la fecha a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-10-04T00:00:00"
 *     responses:
 *       200:
 *         description: Fecha actualizada exitosamente.
 *       404:
 *         description: Fecha no encontrada.
 *       400:
 *         description: Datos inválidos.
 */
router.put("/:id", updateDate); // Actualizar una fecha por ID

/**
 * @swagger
 * /api/dates/{id}:
 *   delete:
 *     tags: [Date]
 *     summary: Soft delete una fecha por ID
 *     description: Marca una fecha como deshabilitada sin eliminarla permanentemente.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la fecha a deshabilitar
 *     responses:
 *       200:
 *         description: Fecha deshabilitada exitosamente.
 *       404:
 *         description: Fecha no encontrada.
 */
router.delete("/:id", deleteDate); // Soft delete una fecha por ID

export default router;
