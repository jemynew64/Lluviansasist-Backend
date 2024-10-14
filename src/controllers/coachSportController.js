import { CoachSport } from "../models/coachsport.js"; // Asegúrate de que la ruta sea correcta
import { CoachSportSchema } from "../schemas.js"; // Asegúrate de que la ruta sea correcta
import { z } from "zod"; // Asegúrate de importar Zod

// Obtener todos los entrenadores
export const getAllCoaches = async (req, res) => {
  try {
    const coaches = await CoachSport.findAll({ where: { enabled: true } });
    res.json({ success: true, data: coaches });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        error: "Error fetching coaches",
        details: error.message,
      });
  }
};

// Obtener un entrenador por ID
export const getCoachById = async (req, res) => {
  const { id } = req.params;
  try {
    const coach = await CoachSport.findOne({ where: { id, enabled: true } });
    if (coach) {
      res.json({ success: true, data: coach });
    } else {
      res.status(404).json({ success: false, error: "Coach not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        error: "Error fetching coach",
        details: error.message,
      });
  }
};

// Crear un nuevo entrenador
export const createCoach = async (req, res) => {
  try {
    // Validar usando Zod
    const validatedData = CoachSportSchema.parse(req.body);

    const newCoach = await CoachSport.create({
      ...validatedData,
      enabled: true,
    });
    res.status(201).json({ success: true, data: newCoach });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ success: false, error: error.errors });
    }
    res
      .status(500)
      .json({
        success: false,
        error: "Error creating coach",
        details: error.message,
      });
  }
};

// Actualizar un entrenador por ID
export const updateCoach = async (req, res) => {
  const { id } = req.params;

  try {
    const coach = await CoachSport.findByPk(id);
    if (coach) {
      if (coach.enabled) {
        const validatedData = CoachSportSchema.partial().parse(req.body); // Permite campos opcionales
        Object.assign(coach, validatedData); // Actualiza solo los campos proporcionados
        await coach.save();
        res.json({ success: true, data: coach });
      } else {
        res.status(400).json({ success: false, error: "Coach is disabled" });
      }
    } else {
      res.status(404).json({ success: false, error: "Coach not found" });
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ success: false, error: error.errors });
    }
    res
      .status(500)
      .json({
        success: false,
        error: "Error updating coach",
        details: error.message,
      });
  }
};

// Soft delete un entrenador por ID
export const deleteCoach = async (req, res) => {
  const { id } = req.params;
  try {
    const coach = await CoachSport.findByPk(id);
    if (coach) {
      coach.enabled = false; // Marcar como deshabilitado
      await coach.save();
      res.json({ success: true, message: "Coach soft deleted successfully" });
    } else {
      res.status(404).json({ success: false, error: "Coach not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        error: "Error deleting coach",
        details: error.message,
      });
  }
};
