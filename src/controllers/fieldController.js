import { Field } from "../models/field.js"; // Asegúrate de que la ruta sea correcta
import { FieldSchema } from "../schemas.js"; // Asegúrate de que la ruta sea correcta
import { z } from "zod"; // Asegúrate de importar Zod

// Obtener todos los campos
// Obtener todos los campos
export const getAllFields = async (req, res) => {
  try {
    const fields = await Field.findAll({ where: { enabled: true } });

    const totalItems = await Field.count({ where: { enabled: true } });
    const totalPages = Math.ceil(totalItems / 10); // Cambia 10 si es necesario
    const currentPage = 1; // Cambia esto si implementas paginación

    res.json({
      success: true,
      data: fields,
      meta: {
        totalItems,
        totalPages,
        currentPage,
        perPage: 10,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error fetching fields",
      details: error.message,
    });
  }
};

// Obtener un campo por ID
export const getFieldById = async (req, res) => {
  const { id } = req.params;
  try {
    const field = await Field.findOne({ where: { id, enabled: true } });
    if (field) {
      res.json({ success: true, data: field });
    } else {
      res.status(404).json({ success: false, error: "Field not found" });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error fetching field",
      details: error.message,
    });
  }
};

// Crear un nuevo campo
export const createField = async (req, res) => {
  try {
    // Validar usando Zod
    const validatedData = FieldSchema.parse(req.body);

    const newField = await Field.create({
      ...validatedData,
      enabled: true,
    });
    res.status(201).json({ success: true, data: newField });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ success: false, error: error.errors });
    }
    res.status(500).json({
      success: false,
      error: "Error creating field",
      details: error.message,
    });
  }
};

// Actualizar un campo por ID
export const updateField = async (req, res) => {
  const { id } = req.params;

  try {
    const field = await Field.findByPk(id);
    if (field) {
      const validatedData = FieldSchema.partial().parse(req.body); // Permite campos opcionales
      Object.assign(field, validatedData); // Actualiza solo los campos proporcionados
      await field.save();
      res.json({ success: true, data: field });
    } else {
      res.status(404).json({ success: false, error: "Field not found" });
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ success: false, error: error.errors });
    }
    res.status(500).json({
      success: false,
      error: "Error updating field",
      details: error.message,
    });
  }
};

// Soft delete un campo por ID
export const deleteField = async (req, res) => {
  const { id } = req.params;
  try {
    const field = await Field.findByPk(id);
    if (field) {
      field.enabled = false; // Marcar como deshabilitado
      await field.save();
      res.json({ success: true, message: "Field soft deleted successfully" });
    } else {
      res.status(404).json({ success: false, error: "Field not found" });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error deleting field",
      details: error.message,
    });
  }
};
