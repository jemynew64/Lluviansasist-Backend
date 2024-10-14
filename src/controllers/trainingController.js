import { Training } from "../models/training.js";
import { TrainingSchema } from "../schemas.js"; // Asegúrate de que la ruta sea correcta
import { z } from "zod"; // Asegúrate de importar Zod

// Obtener todos los entrenamientos
export const getAllTrainings = async (req, res) => {
  try {
    const trainings = await Training.findAll({ where: { enabled: true } });
    res.json({ success: true, data: trainings });
  } catch (error) {
    console.error("Error fetching trainings:", error);
    res.status(500).json({ success: false, error: "Error fetching trainings" });
  }
};

// Obtener un entrenamiento por ID
export const getTrainingById = async (req, res) => {
  const { id } = req.params;
  try {
    const training = await Training.findOne({ where: { id, enabled: true } });
    if (training) {
      res.json({ success: true, data: training });
    } else {
      res.status(404).json({ success: false, error: "Training not found" });
    }
  } catch (error) {
    console.error("Error fetching training:", error);
    res.status(500).json({ success: false, error: "Error fetching training" });
  }
};

// Crear un nuevo entrenamiento
export const createTraining = async (req, res) => {
  try {
    // Validar usando Zod
    const validatedData = TrainingSchema.parse(req.body);

    const newTraining = await Training.create({
      ...validatedData,
      enabled: true,
    });
    res.status(201).json({ success: true, data: newTraining });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ success: false, error: error.errors });
    }
    console.error("Error creating training:", error);
    res.status(500).json({ success: false, error: "Error creating training" });
  }
};

// Actualizar un entrenamiento por ID
export const updateTraining = async (req, res) => {
  const { id } = req.params;

  try {
    const training = await Training.findByPk(id);
    if (training) {
      const validatedData = TrainingSchema.partial().parse(req.body); // Permite campos opcionales
      Object.assign(training, validatedData); // Actualiza solo los campos proporcionados
      await training.save();
      res.json({ success: true, data: training });
    } else {
      res.status(404).json({ success: false, error: "Training not found" });
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ success: false, error: error.errors });
    }
    console.error("Error updating training:", error);
    res.status(500).json({ success: false, error: "Error updating training" });
  }
};

// Soft delete un entrenamiento por ID
export const deleteTraining = async (req, res) => {
  const { id } = req.params;
  try {
    const training = await Training.findByPk(id);
    if (training) {
      training.enabled = false; // Marcar como deshabilitado
      await training.save();
      res.json({
        success: true,
        message: "Training soft deleted successfully",
      });
    } else {
      res.status(404).json({ success: false, error: "Training not found" });
    }
  } catch (error) {
    console.error("Error deleting training:", error);
    res.status(500).json({ success: false, error: "Error deleting training" });
  }
};
