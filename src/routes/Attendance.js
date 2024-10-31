import { Router } from "express";
import {
  getAllAttendances,
  getAttendanceById,
  createAttendance,
  updateAttendance,
  deleteAttendance,
  bulkCreateAttendances,
} from "../controllers/attendanceController.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Attendance
 *   description: Operaciones relacionadas con las asistencias
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Attendance:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         idRegistration:
 *           type: integer
 *           example: 1
 *         classNumber:
 *           type: integer
 *           example: 1
 *         date:
 *           type: string
 *           format: date-time
 *           example: "2023-10-01T09:00:00"
 *         attendanceStatus:
 *           type: string
 *           example: "Present"
 *         enabled:
 *           type: boolean
 *           example: true
 *     AttendanceInput:
 *       type: object
 *       properties:
 *         idRegistration:
 *           type: integer
 *           example: 1
 *         classNumber:
 *           type: integer
 *           example: 1
 *         date:
 *           type: string
 *           format: date-time
 *           example: "2023-10-01T09:00:00"
 *         attendanceStatus:
 *           type: string
 *           example: "Present"
 *         enabled:
 *           type: boolean
 *           example: true
 *       required:
 *         - idRegistration
 *         - classNumber
 *         - date
 *         - attendanceStatus
 */

/**
 * @swagger
 * /api/attendances:
 *   get:
 *     tags: [Attendance]
 *     summary: Obtener todas las asistencias
 *     description: Retorna una lista de todas las asistencias habilitadas.
 *     responses:
 *       200:
 *         description: Lista de asistencias.
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
 *                     $ref: '#/components/schemas/Attendance'
 */
router.get("/", getAllAttendances); // Obtener todas las asistencias

/**
 * @swagger
 * /api/attendances/{id}:
 *   get:
 *     tags: [Attendance]
 *     summary: Obtener una asistencia por ID
 *     description: Retorna una asistencia específica basada en el ID proporcionado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la asistencia
 *     responses:
 *       200:
 *         description: Asistencia encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Attendance'
 *       404:
 *         description: Asistencia no encontrada.
 */
router.get("/:id", getAttendanceById); // Obtener una asistencia por ID

/**
 * @swagger
 * /api/attendances:
 *   post:
 *     tags: [Attendance]
 *     summary: Crear una nueva asistencia
 *     description: Crea una nueva asistencia en el sistema.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AttendanceInput'
 *     responses:
 *       201:
 *         description: Asistencia creada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Attendance'
 *       400:
 *         description: Datos inválidos.
 */
router.post("/", createAttendance); // Crear una nueva asistencia

/**
 * @swagger
 * /api/attendances/bulk:
 *   post:
 *     tags: [Attendance]
 *     summary: Ingreso masivo de asistencias
 *     description: Permite la creación de múltiples asistencias en una sola solicitud.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/AttendanceInput'
 *           example:
 *             - idRegistration: 2
 *               classNumber: 1
 *               date: "2023-10-05T09:00:00"
 *               attendanceStatus: "Present"
 *             - idRegistration: 3
 *               classNumber: 2
 *               date: "2023-10-05T10:00:00"
 *               attendanceStatus: "Absent"
 *             - idRegistration: 4
 *               classNumber: 3
 *               date: "2023-10-05T11:00:00"
 *               attendanceStatus: "Late"
 *     responses:
 *       201:
 *         description: Asistencias creadas exitosamente.
 *       400:
 *         description: Datos inválidos.
 */
router.post("/bulk", bulkCreateAttendances); // Ingreso masivo de asistencias

/**
 * @swagger
 * /api/attendances/{id}:
 *   put:
 *     tags: [Attendance]
 *     summary: Actualizar una asistencia por ID
 *     description: Actualiza los detalles de una asistencia específica basada en el ID proporcionado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la asistencia a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               attendanceStatus:
 *                 type: string
 *                 example: Late
 *     responses:
 *       200:
 *         description: Asistencia actualizada exitosamente.
 *       404:
 *         description: Asistencia no encontrada.
 *       400:
 *         description: Datos inválidos.
 */
router.put("/:id", updateAttendance); // Actualizar una asistencia por ID

/**
 * @swagger
 * /api/attendances/{id}:
 *   delete:
 *     tags: [Attendance]
 *     summary: Soft delete una asistencia por ID
 *     description: Marca una asistencia como deshabilitada sin eliminarla permanentemente.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la asistencia a deshabilitar
 *     responses:
 *       200:
 *         description: Asistencia deshabilitada exitosamente.
 *       404:
 *         description: Asistencia no encontrada.
 */
router.delete("/:id", deleteAttendance); // Soft delete una asistencia por ID

export default router;
