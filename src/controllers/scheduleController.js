import { Schedule } from "../models/schedule.js";
import { ScheduleSchema } from "../schemas.js"; // Asegúrate de que la ruta sea correcta
import { z } from "zod"; // Asegúrate de importar Zod

// Obtener todos los horarios
export const getAllSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.findAll({ where: { enabled: true } });
    res.json({ success: true, data: schedules });
  } catch (error) {
    console.error("Error fetching schedules:", error);
    res.status(500).json({ success: false, error: "Error fetching schedules" });
  }
};

// Obtener un horario por ID
export const getScheduleById = async (req, res) => {
  const { id } = req.params;
  try {
    const schedule = await Schedule.findOne({ where: { id, enabled: true } });
    if (schedule) {
      res.json({ success: true, data: schedule });
    } else {
      res.status(404).json({ success: false, error: "Schedule not found" });
    }
  } catch (error) {
    console.error("Error fetching schedule:", error);
    res.status(500).json({ success: false, error: "Error fetching schedule" });
  }
};

// Crear un nuevo horario
export const createSchedule = async (req, res) => {
  try {
    // Validar usando Zod
    const validatedData = ScheduleSchema.parse(req.body);

    const newSchedule = await Schedule.create({
      ...validatedData,
      enabled: true, // Se establece por defecto
    });
    res.status(201).json({ success: true, data: newSchedule });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ success: false, error: error.errors });
    }
    console.error("Error creating schedule:", error);
    res.status(500).json({ success: false, error: "Error creating schedule" });
  }
};

// Actualizar un horario por ID
export const updateSchedule = async (req, res) => {
  const { id } = req.params;

  try {
    const schedule = await Schedule.findOne({ where: { id, enabled: true } });
    if (schedule) {
      const validatedData = ScheduleSchema.partial().parse(req.body); // Permite campos opcionales
      Object.assign(schedule, validatedData); // Actualiza solo los campos proporcionados
      await schedule.save();
      res.json({ success: true, data: schedule });
    } else {
      res.status(404).json({ success: false, error: "Schedule not found" });
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ success: false, error: error.errors });
    }
    console.error("Error updating schedule:", error);
    res.status(500).json({ success: false, error: "Error updating schedule" });
  }
};

// Soft delete un horario por ID
export const deleteSchedule = async (req, res) => {
  const { id } = req.params;
  try {
    const schedule = await Schedule.findOne({ where: { id, enabled: true } });
    if (schedule) {
      schedule.enabled = false; // Marcar como deshabilitado
      await schedule.save();
      res.json({
        success: true,
        message: "Schedule soft deleted successfully",
      });
    } else {
      res.status(404).json({ success: false, error: "Schedule not found" });
    }
  } catch (error) {
    console.error("Error deleting schedule:", error);
    res.status(500).json({ success: false, error: "Error deleting schedule" });
  }
};
