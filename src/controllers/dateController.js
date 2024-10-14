import { Date } from "../models/date.js"; // Asegúrate de que la ruta sea correcta
import { DateSchema } from "../schemas.js"; // Asegúrate de que la ruta sea correcta
import { z } from "zod"; // Asegúrate de importar Zod

// Obtener todas las fechas
export const getAllDates = async (req, res) => {
  try {
    const dates = await Date.findAll({ where: { enabled: true } });
    res.json({ success: true, data: dates });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        error: "Error fetching dates",
        details: error.message,
      });
  }
};

// Obtener una fecha por ID
export const getDateById = async (req, res) => {
  const { id } = req.params;
  try {
    const date = await Date.findOne({ where: { id, enabled: true } });
    if (date) {
      res.json({ success: true, data: date });
    } else {
      res.status(404).json({ success: false, error: "Date not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        error: "Error fetching date",
        details: error.message,
      });
  }
};

// Crear una nueva fecha
export const createDate = async (req, res) => {
  try {
    // Validar usando Zod
    const validatedData = DateSchema.parse(req.body);

    const newDate = await Date.create({
      ...validatedData,
      enabled: true,
    });
    res.status(201).json({ success: true, data: newDate });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ success: false, error: error.errors });
    }
    res
      .status(500)
      .json({
        success: false,
        error: "Error creating date",
        details: error.message,
      });
  }
};

// Actualizar una fecha por ID
export const updateDate = async (req, res) => {
  const { id } = req.params;

  try {
    const foundDate = await Date.findOne({ where: { id, enabled: true } });
    if (foundDate) {
      const validatedData = DateSchema.partial().parse(req.body); // Permite campos opcionales
      Object.assign(foundDate, validatedData); // Actualiza solo los campos proporcionados
      await foundDate.save();
      res.json({ success: true, data: foundDate });
    } else {
      res.status(404).json({ success: false, error: "Date not found" });
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ success: false, error: error.errors });
    }
    res
      .status(500)
      .json({
        success: false,
        error: "Error updating date",
        details: error.message,
      });
  }
};

// Soft delete una fecha por ID
export const deleteDate = async (req, res) => {
  const { id } = req.params;
  try {
    const foundDate = await Date.findOne({ where: { id, enabled: true } });
    if (foundDate) {
      foundDate.enabled = false; // Marcar como deshabilitado
      await foundDate.save();
      res.json({ success: true, message: "Date soft deleted successfully" });
    } else {
      res.status(404).json({ success: false, error: "Date not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        error: "Error deleting date",
        details: error.message,
      });
  }
};
