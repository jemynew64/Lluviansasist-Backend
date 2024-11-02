import { Sport } from "../models/sport.js"; // Asegúrate de que la ruta sea correcta
import { SportSchema } from "../schemas.js"; // Asegúrate de que la ruta sea correcta
import { z } from "zod"; // Asegúrate de importar Zod

export const getAllSports = async (req, res) => {
  try {
    const sports = await Sport.findAll({ where: { enabled: true } });

    const totalItems = await Sport.count({ where: { enabled: true } });
    const totalPages = Math.ceil(totalItems / 10);
    const currentPage = 1;

    res.json({
      success: true,
      data: sports,
      meta: {
        totalItems,
        totalPages,
        currentPage,
        perPage: 10,
      },
    });
  } catch (error) {
    console.error("Error fetching sports:", error);
    res.status(500).json({ success: false, error: "Error fetching sports" });
  }
};

// Obtener un deporte por ID
export const getSportById = async (req, res) => {
  const { id } = req.params;
  try {
    const sport = await Sport.findOne({ where: { id, enabled: true } });
    if (sport) {
      res.json({ success: true, data: sport });
    } else {
      res.status(404).json({ success: false, error: "Sport not found" });
    }
  } catch (error) {
    console.error("Error fetching sport:", error);
    res.status(500).json({ success: false, error: "Error fetching sport" });
  }
};

// Crear un nuevo deporte
export const createSport = async (req, res) => {
  try {
    // Validar usando Zod
    const validatedData = SportSchema.parse(req.body);

    const newSport = await Sport.create({
      ...validatedData,
      enabled: true,
    });
    res.status(201).json({ success: true, data: newSport });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ success: false, error: error.errors });
    }
    console.error("Error creating sport:", error);
    res.status(500).json({ success: false, error: "Error creating sport" });
  }
};

// Actualizar un deporte por ID
export const updateSport = async (req, res) => {
  const { id } = req.params;

  try {
    const sport = await Sport.findByPk(id);
    if (sport) {
      const validatedData = SportSchema.partial().parse(req.body); // Permite campos opcionales
      Object.assign(sport, validatedData); // Actualiza solo los campos proporcionados
      await sport.save();
      res.json({ success: true, data: sport });
    } else {
      res.status(404).json({ success: false, error: "Sport not found" });
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ success: false, error: error.errors });
    }
    console.error("Error updating sport:", error);
    res.status(500).json({ success: false, error: "Error updating sport" });
  }
};

// Soft delete un deporte por ID
export const deleteSport = async (req, res) => {
  const { id } = req.params;
  try {
    const sport = await Sport.findByPk(id);
    if (sport) {
      sport.enabled = false; // Marcar como deshabilitado
      await sport.save();
      res.json({
        success: true,
        message: "Sport soft deleted successfully",
      });
    } else {
      res.status(404).json({ success: false, error: "Sport not found" });
    }
  } catch (error) {
    console.error("Error deleting sport:", error);
    res.status(500).json({ success: false, error: "Error deleting sport" });
  }
};
