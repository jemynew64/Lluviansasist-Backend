import { Router } from "express";
import {
  getAllFields,
  getFieldById,
  createField,
  updateField,
  deleteField,
} from "../controllers/fieldController.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Field
 *   description: Operaciones relacionadas con los campos
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Field:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         description:
 *           type: string
 *           example: "New Field"
 *         enabled:
 *           type: boolean
 *           example: true
 *     FieldInput:
 *       type: object
 *       properties:
 *         description:
 *           type: string
 *           example: "New Field"
 *         enabled:
 *           type: boolean
 *           example: true
 *       required:
 *         - description
 */

/**
 * @swagger
 * /api/fields:
 *   get:
 *     tags: [Field]
 *     summary: Obtener todos los campos
 *     description: Retorna una lista de todos los campos habilitados.
 *     responses:
 *       200:
 *         description: Lista de campos.
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
 *                     $ref: '#/components/schemas/Field'
 */
router.get("/", getAllFields); // Obtener todos los campos

/**
 * @swagger
 * /api/fields/{id}:
 *   get:
 *     tags: [Field]
 *     summary: Obtener un campo por ID
 *     description: Retorna un campo específico basado en el ID proporcionado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del campo
 *     responses:
 *       200:
 *         description: Campo encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Field'
 *       404:
 *         description: Campo no encontrado.
 */
router.get("/:id", getFieldById); // Obtener un campo por ID

/**
 * @swagger
 * /api/fields:
 *   post:
 *     tags: [Field]
 *     summary: Crear un nuevo campo
 *     description: Crea un nuevo campo en el sistema.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FieldInput'
 *     responses:
 *       201:
 *         description: Campo creado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Field'
 *       400:
 *         description: Datos inválidos.
 */
router.post("/", createField); // Crear un nuevo campo

/**
 * @swagger
 * /api/fields/{id}:
 *   put:
 *     tags: [Field]
 *     summary: Actualizar un campo por ID
 *     description: Actualiza los detalles de un campo específico basado en el ID proporcionado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del campo a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *                 example: "Updated Field"
 *     responses:
 *       200:
 *         description: Campo actualizado exitosamente.
 *       404:
 *         description: Campo no encontrado.
 *       400:
 *         description: Datos inválidos.
 */
router.put("/:id", updateField); // Actualizar un campo por ID

/**
 * @swagger
 * /api/fields/{id}:
 *   delete:
 *     tags: [Field]
 *     summary: Soft delete un campo por ID
 *     description: Marca un campo como deshabilitado sin eliminarlo permanentemente.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del campo a deshabilitar
 *     responses:
 *       200:
 *         description: Campo deshabilitado exitosamente.
 *       404:
 *         description: Campo no encontrado.
 */
router.delete("/:id", deleteField); // Soft delete un campo por ID

export default router;
