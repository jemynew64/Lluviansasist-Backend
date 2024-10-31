import { Router } from "express";
import {
  getAllLocations,
  getLocationById,
  createLocation,
  updateLocation,
  deleteLocation,
} from "../controllers/locationController.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Location
 *   description: Operaciones relacionadas con las ubicaciones
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Location:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         branch:
 *           type: string
 *           example: "New Branch"
 *         description:
 *           type: string
 *           example: "Description"
 *         district:
 *           type: string
 *           example: "District"
 *         enabled:
 *           type: boolean
 *           example: true
 *     LocationInput:
 *       type: object
 *       properties:
 *         branch:
 *           type: string
 *           example: "New Branch"
 *         description:
 *           type: string
 *           example: "Description"
 *         district:
 *           type: string
 *           example: "District"
 *         enabled:
 *           type: boolean
 *           example: true
 *       required:
 *         - branch
 *         - description
 *         - district
 */

/**
 * @swagger
 * /api/locations:
 *   get:
 *     tags: [Location]
 *     summary: Obtener todas las ubicaciones
 *     description: Retorna una lista de todas las ubicaciones habilitadas.
 *     responses:
 *       200:
 *         description: Lista de ubicaciones.
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
 *                     $ref: '#/components/schemas/Location'
 */
router.get("/", getAllLocations); // Obtener todas las ubicaciones

/**
 * @swagger
 * /api/locations/{id}:
 *   get:
 *     tags: [Location]
 *     summary: Obtener una ubicación por ID
 *     description: Retorna una ubicación específica basado en el ID proporcionado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la ubicación
 *     responses:
 *       200:
 *         description: Ubicación encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Location'
 *       404:
 *         description: Ubicación no encontrada.
 */
router.get("/:id", getLocationById); // Obtener una ubicación por ID

/**
 * @swagger
 * /api/locations:
 *   post:
 *     tags: [Location]
 *     summary: Crear una nueva ubicación
 *     description: Crea una nueva ubicación en el sistema.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LocationInput'
 *     responses:
 *       201:
 *         description: Ubicación creada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Location'
 *       400:
 *         description: Datos inválidos.
 */
router.post("/", createLocation); // Crear una nueva ubicación

/**
 * @swagger
 * /api/locations/{id}:
 *   put:
 *     tags: [Location]
 *     summary: Actualizar una ubicación por ID
 *     description: Actualiza los detalles de una ubicación específica basado en el ID proporcionado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la ubicación a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               branch:
 *                 type: string
 *                 example: "Updated Branch"
 *               district:
 *                 type: string
 *                 example: "Updated District"
 *     responses:
 *       200:
 *         description: Ubicación actualizada exitosamente.
 *       404:
 *         description: Ubicación no encontrada.
 *       400:
 *         description: Datos inválidos.
 */
router.put("/:id", updateLocation); // Actualizar una ubicación por ID

/**
 * @swagger
 * /api/locations/{id}:
 *   delete:
 *     tags: [Location]
 *     summary: Soft delete una ubicación por ID
 *     description: Marca una ubicación como deshabilitada sin eliminarla permanentemente.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la ubicación a deshabilitar
 *     responses:
 *       200:
 *         description: Ubicación deshabilitada exitosamente.
 *       404:
 *         description: Ubicación no encontrada.
 */
router.delete("/:id", deleteLocation); // Soft delete una ubicación por ID

export default router;
