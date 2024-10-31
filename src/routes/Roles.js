import { Router } from "express";
import {
  getAllRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
} from "../controllers/roleController.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Role
 *   description: Operaciones relacionadas con los roles
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Role:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         description:
 *           type: string
 *           example: "Entrenador"
 *         enabled:
 *           type: boolean
 *           example: true
 *     RoleInput:
 *       type: object
 *       properties:
 *         description:
 *           type: string
 *           example: "Entrenador"
 *         enabled:
 *           type: boolean
 *           example: true
 *       required:
 *         - description
 */

/**
 * @swagger
 * /api/roles:
 *   get:
 *     tags: [Role]
 *     summary: Obtener todos los roles
 *     description: Retorna una lista de todos los roles disponibles.
 *     responses:
 *       200:
 *         description: Lista de roles.
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
 *                     $ref: '#/components/schemas/Role'
 */
router.get("/", getAllRoles); // Obtener todos los roles

/**
 * @swagger
 * /api/roles/{id}:
 *   get:
 *     tags: [Role]
 *     summary: Obtener un rol por ID
 *     description: Retorna un rol específico basado en el ID proporcionado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del rol
 *     responses:
 *       200:
 *         description: Rol encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Role'
 *       404:
 *         description: Rol no encontrado.
 */
router.get("/:id", getRoleById); // Obtener un rol por ID

/**
 * @swagger
 * /api/roles:
 *   post:
 *     tags: [Role]
 *     summary: Crear un nuevo rol
 *     description: Crea un nuevo rol en el sistema.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RoleInput'
 *     responses:
 *       201:
 *         description: Rol creado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Role'
 *       400:
 *         description: Datos inválidos.
 */
router.post("/", createRole); // Crear un nuevo rol

/**
 * @swagger
 * /api/roles/{id}:
 *   put:
 *     tags: [Role]
 *     summary: Actualizar un rol por ID
 *     description: Actualiza los detalles de un rol específico basado en el ID proporcionado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del rol a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *                 example: "Asistente"
 *               enabled:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Rol actualizado exitosamente.
 *       404:
 *         description: Rol no encontrado.
 *       400:
 *         description: Datos inválidos.
 */
router.put("/:id", updateRole); // Actualizar un rol por ID

/**
 * @swagger
 * /api/roles/{id}:
 *   delete:
 *     tags: [Role]
 *     summary: Soft delete un rol por ID
 *     description: Marca un rol como deshabilitado sin eliminarlo permanentemente.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del rol a deshabilitar
 *     responses:
 *       200:
 *         description: Rol deshabilitado exitosamente.
 *       404:
 *         description: Rol no encontrado.
 */
router.delete("/:id", deleteRole); // Soft delete un rol por ID

export default router;
