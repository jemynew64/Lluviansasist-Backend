import { Router } from "express";
import {
  getAllSports,
  getSportById,
  createSport,
  updateSport,
  deleteSport,
} from "../controllers/sportController.js"; // Asegúrate de que la ruta sea correcta

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Sport
 *   description: Operaciones relacionadas con los deportes
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Sport:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         description:
 *           type: string
 *           example: "Football"
 *         enabled:
 *           type: boolean
 *           example: true
 *     SportInput:
 *       type: object
 *       properties:
 *         description:
 *           type: string
 *           example: "Basketball"
 *         enabled:
 *           type: boolean
 *           example: true
 *       required:
 *         - description
 */

/**
 * @swagger
 * /api/sports:
 *   get:
 *     tags: [Sport]
 *     summary: Obtener todos los deportes
 *     description: Retorna una lista de todos los deportes disponibles.
 *     responses:
 *       200:
 *         description: Lista de deportes.
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
 *                     $ref: '#/components/schemas/Sport'
 */
router.get("/", getAllSports); // Obtener todos los deportes

/**
 * @swagger
 * /api/sports/{id}:
 *   get:
 *     tags: [Sport]
 *     summary: Obtener un deporte por ID
 *     description: Retorna un deporte específico basado en el ID proporcionado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del deporte
 *     responses:
 *       200:
 *         description: Deporte encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Sport'
 *       404:
 *         description: Deporte no encontrado.
 */
router.get("/:id", getSportById); // Obtener un deporte por ID

/**
 * @swagger
 * /api/sports:
 *   post:
 *     tags: [Sport]
 *     summary: Crear un nuevo deporte
 *     description: Crea un nuevo deporte en el sistema.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SportInput'
 *     responses:
 *       201:
 *         description: Deporte creado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Sport'
 *       400:
 *         description: Datos inválidos.
 */
router.post("/", createSport); // Crear un nuevo deporte

/**
 * @swagger
 * /api/sports/{id}:
 *   put:
 *     tags: [Sport]
 *     summary: Actualizar un deporte por ID
 *     description: Actualiza los detalles de un deporte específico basado en el ID proporcionado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del deporte a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *                 example: "Updated Sport"
 *     responses:
 *       200:
 *         description: Deporte actualizado exitosamente.
 *       404:
 *         description: Deporte no encontrado.
 *       400:
 *         description: Datos inválidos.
 */
router.put("/:id", updateSport); // Actualizar un deporte por ID

/**
 * @swagger
 * /api/sports/{id}:
 *   delete:
 *     tags: [Sport]
 *     summary: Soft delete un deporte por ID
 *     description: Marca un deporte como deshabilitado sin eliminarlo permanentemente.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del deporte a deshabilitar
 *     responses:
 *       200:
 *         description: Deporte deshabilitado exitosamente.
 *       404:
 *         description: Deporte no encontrado.
 */
router.delete("/:id", deleteSport); // Soft delete un deporte por ID

export default router;
