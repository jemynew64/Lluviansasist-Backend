import { Attendance } from "../models/attendance.js";
import { AttendanceSchema } from "../schemas.js"; // Asegúrate de que la ruta sea correcta
import { z } from "zod"; // Asegúrate de importar Zod

// Obtener todas las asistencias
export const getAllAttendances = async (req, res) => {
  try {
    const attendances = await Attendance.findAll({ where: { enabled: true } });
    res.json({ success: true, data: attendances });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error fetching attendances",
      details: error.message,
    });
  }
};

// Obtener una asistencia por ID
export const getAttendanceById = async (req, res) => {
  const { id } = req.params;
  try {
    const attendance = await Attendance.findOne({
      where: { id, enabled: true },
    });
    if (attendance) {
      res.json({ success: true, data: attendance });
    } else {
      res.status(404).json({ success: false, error: "Attendance not found" });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error fetching attendance",
      details: error.message,
    });
  }
};

// Crear una nueva asistencia
export const createAttendance = async (req, res) => {
  try {
    // Validar usando Zod
    const validatedData = AttendanceSchema.parse(req.body);

    const attendance = await Attendance.create({
      ...validatedData,
      enabled: true,
    });
    res.status(201).json({ success: true, data: attendance });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ success: false, error: error.errors });
    }
    res.status(500).json({
      success: false,
      error: "Error creating attendance",
      details: error.message,
    });
  }
};

// Actualizar una asistencia por ID
export const updateAttendance = async (req, res) => {
  const { id } = req.params;

  try {
    const attendance = await Attendance.findOne({
      where: { id, enabled: true },
    });
    if (attendance) {
      const validatedData = AttendanceSchema.partial().parse(req.body); // Permite campos opcionales
      Object.assign(attendance, validatedData); // Actualiza solo los campos proporcionados
      await attendance.save();
      res.json({ success: true, data: attendance });
    } else {
      res.status(404).json({ success: false, error: "Attendance not found" });
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ success: false, error: error.errors });
    }
    res.status(500).json({
      success: false,
      error: "Error updating attendance",
      details: error.message,
    });
  }
};

// Soft delete una asistencia por ID
export const deleteAttendance = async (req, res) => {
  const { id } = req.params;
  try {
    const attendance = await Attendance.findOne({
      where: { id, enabled: true },
    });
    if (attendance) {
      attendance.enabled = false; // Marcar como deshabilitado
      await attendance.save();
      res.json({
        success: true,
        message: "Attendance soft deleted successfully",
      });
    } else {
      res.status(404).json({ success: false, error: "Attendance not found" });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error deleting attendance",
      details: error.message,
    });
  }
};
