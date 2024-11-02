import { Router } from "express";
import {
  getAllRegistrations,
  getRegistrationById,
  createRegistration,
  updateRegistration,
  deleteRegistration,
  getUsersByTrainingId,
} from "../controllers/registrationController.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Registration
 *   description: Operaciones relacionadas con las inscripciones
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Registration:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         idTraining:
 *           type: integer
 *           example: 2
 *         idUser:
 *           type: integer
 *           example: 22
 *         enabled:
 *           type: boolean
 *           example: true
 *     RegistrationInput:
 *       type: object
 *       properties:
 *         idTraining:
 *           type: integer
 *           example: 2
 *         idUser:
 *           type: integer
 *           example: 22
 *         enabled:
 *           type: boolean
 *           example: true
 *       required:
 *         - idTraining
 *         - idUser
 */

/**
 * @swagger
 * /api/registrations:
 *   get:
 *     tags: [Registration]
 *     summary: Obtener todas las inscripciones
 *     description: Retorna una lista de todas las inscripciones.
 *     responses:
 *       200:
 *         description: Lista de inscripciones.
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
 *                     $ref: '#/components/schemas/Registration'
 */
router.get("/", getAllRegistrations); // Obtener todas las inscripciones

/**
 * @swagger
 * /api/registrations/{id}:
 *   get:
 *     tags: [Registration]
 *     summary: Obtener una inscripción por ID
 *     description: Retorna una inscripción específica basado en el ID proporcionado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la inscripción
 *     responses:
 *       200:
 *         description: Inscripción encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Registration'
 *       404:
 *         description: Inscripción no encontrada.
 */
router.get("/:id", getRegistrationById); // Obtener una inscripción por ID

/**
 * @swagger
 * /api/registrations:
 *   post:
 *     tags: [Registration]
 *     summary: Crear una nueva inscripción
 *     description: Crea una nueva inscripción en el sistema.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegistrationInput'
 *     responses:
 *       201:
 *         description: Inscripción creada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Registration'
 *       400:
 *         description: Datos inválidos.
 */
router.post("/", createRegistration); // Crear una nueva inscripción

/**
 * @swagger
 * /api/registrations/{id}:
 *   put:
 *     tags: [Registration]
 *     summary: Actualizar una inscripción por ID
 *     description: Actualiza los detalles de una inscripción específica basado en el ID proporcionado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la inscripción a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idTraining:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Inscripción actualizada exitosamente.
 *       404:
 *         description: Inscripción no encontrada.
 *       400:
 *         description: Datos inválidos.
 */
router.put("/:id", updateRegistration); // Actualizar una inscripción por ID

/**
 * @swagger
 * /api/registrations/{id}:
 *   delete:
 *     tags: [Registration]
 *     summary: Soft delete una inscripción por ID
 *     description: Marca una inscripción como deshabilitada sin eliminarla permanentemente.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la inscripción a deshabilitar
 *     responses:
 *       200:
 *         description: Inscripción deshabilitada exitosamente.
 *       404:
 *         description: Inscripción no encontrada.
 */
router.delete("/:id", deleteRegistration); // Soft delete una inscripción por ID

/**
 * @swagger
 * /api/registrations/{id}/Listusuarioentrena:
 *   get:
 *     tags: [Registration]
 *     summary: Obtener todos los usuarios de un entrenamiento específico
 *     description: Retorna una lista de usuarios inscritos en un entrenamiento basado en el ID del entrenamiento.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del entrenamiento
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
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       firstName:
 *                         type: string
 *                       lastName:
 *                         type: string
 *                       dni:
 *                         type: string
 *                       phone:
 *                         type: string
 *                       birthDate:
 *                         type: string
 *                         format: date
 *                       gender:
 *                         type: string
 *                 meta:
 *                   type: object
 *                   properties:
 *                     totalItems:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 *                     currentPage:
 *                       type: integer
 *                     perPage:
 *                       type: integer
 *       404:
 *         description: Entrenamiento no encontrado.
 */

//router.get("/extra/:id/Listusuarioentrena", getUsersByTrainingId); // Obtener usuarios de un entrenamiento específico
router.get("/:idTraining/Listusuarioentrena", getUsersByTrainingId); // Obtener usuarios de un entrenamiento específico

export default router;
