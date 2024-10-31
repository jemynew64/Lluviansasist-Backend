import { Router } from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: User
 *   description: Operaciones relacionadas con los usuarios
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         firstName:
 *           type: string
 *           example: John
 *         lastName:
 *           type: string
 *           example: Doe
 *         password:
 *           type: string
 *           example: 1234567
 *         dni:
 *           type: integer
 *           example: 10335678
 *         emergency_number:
 *           type: string
 *           example: 1476547721
 *         phone:
 *           type: string
 *           example: 313477789
 *         birthDate:
 *           type: string
 *           format: date
 *           example: "1991-01-01"
 *         gender:
 *           type: string
 *           enum: [Male, Female, Other]
 *           example: Male
 *         roleId:
 *           type: integer
 *           example: 2
 *         locationId:
 *           type: integer
 *           example: 1
 *         enabled:
 *           type: boolean
 *           example: true
 *     UserInput:
 *       type: object
 *       properties:
 *         firstName:
 *           type: string
 *           example: John
 *         lastName:
 *           type: string
 *           example: Doe
 *         password:
 *           type: string
 *           example: 1234567
 *         dni:
 *           type: integer
 *           example: 10335678
 *         emergency_number:
 *           type: string
 *           example: 1476547721
 *         phone:
 *           type: string
 *           example: 313477789
 *         birthDate:
 *           type: string
 *           format: date
 *           example: "1991-01-01"
 *         gender:
 *           type: string
 *           enum: [Male, Female, Other]
 *           example: Male
 *         roleId:
 *           type: integer
 *           example: 2
 *         locationId:
 *           type: integer
 *           example: 1
 *         enabled:
 *           type: boolean
 *           example: true
 *       required:
 *         - firstName
 *         - lastName
 *         - password
 *         - dni
 *         - emergency_number
 *         - phone
 *         - birthDate
 *         - gender
 *         - roleId
 *         - locationId
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     tags: [User]
 *     summary: Obtener todos los usuarios
 *     description: Retorna una lista de todos los usuarios disponibles.
 *     responses:
 *       200:
 *         description: Lista de usuarios.
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
 *                     $ref: '#/components/schemas/User'
 */
router.get("/", getAllUsers); // Obtener todos los usuarios

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     tags: [User]
 *     summary: Obtener un usuario por ID
 *     description: Retorna un usuario específico basado en el ID proporcionado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuario no encontrado.
 */
router.get("/:id", getUserById); // Obtener un usuario por ID

/**
 * @swagger
 * /api/users:
 *   post:
 *     tags: [User]
 *     summary: Crear un nuevo usuario
 *     description: Crea un nuevo usuario en el sistema.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Datos inválidos.
 */
router.post("/", createUser); // Crear un nuevo usuario

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     tags: [User]
 *     summary: Actualizar un usuario por ID
 *     description: Actualiza los detalles de un usuario específico basado en el ID proporcionado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: Jane
 *               lastName:
 *                 type: string
 *                 example: Doe
 *               phone:
 *                 type: string
 *                 example: 987654321
 *               enabled:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente.
 *       404:
 *         description: Usuario no encontrado.
 *       400:
 *         description: Datos inválidos.
 */
router.put("/:id", updateUser); // Actualizar un usuario por ID

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     tags: [User]
 *     summary: Soft delete un usuario por ID
 *     description: Marca un usuario como deshabilitado sin eliminarlo permanentemente.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario a deshabilitar
 *     responses:
 *       200:
 *         description: Usuario deshabilitado exitosamente.
 *       404:
 *         description: Usuario no encontrado.
 */
router.delete("/:id", deleteUser); // Soft delete un usuario por ID

export default router;
