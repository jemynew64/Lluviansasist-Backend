import { Location } from "../models/location.js"; // Asegúrate de que la ruta sea correcta
import { LocationSchema } from "../schemas.js"; // Asegúrate de que la ruta sea correcta
import { z } from "zod"; // Asegúrate de importar Zod

// Obtener todas las ubicaciones
export const getAllLocations = async (req, res) => {
  try {
    const locations = await Location.findAll({ where: { enabled: true } });
    res.json({ success: true, data: locations });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        error: "Error fetching locations",
        details: error.message,
      });
  }
};

// Obtener una ubicación por ID
export const getLocationById = async (req, res) => {
  const { id } = req.params;
  try {
    const location = await Location.findOne({ where: { id, enabled: true } });
    if (location) {
      res.json({ success: true, data: location });
    } else {
      res.status(404).json({ success: false, error: "Location not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        error: "Error fetching location",
        details: error.message,
      });
  }
};

// Crear una nueva ubicación
export const createLocation = async (req, res) => {
  try {
    // Validar usando Zod
    const validatedData = LocationSchema.parse(req.body);

    const newLocation = await Location.create({
      ...validatedData,
      enabled: true,
    });
    res.status(201).json({ success: true, data: newLocation });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ success: false, error: error.errors });
    }
    res
      .status(500)
      .json({
        success: false,
        error: "Error creating location",
        details: error.message,
      });
  }
};

// Actualizar una ubicación por ID
export const updateLocation = async (req, res) => {
  const { id } = req.params;

  try {
    const location = await Location.findByPk(id);
    if (location) {
      const validatedData = LocationSchema.partial().parse(req.body); // Permite campos opcionales
      Object.assign(location, validatedData); // Actualiza solo los campos proporcionados
      await location.save();
      res.json({ success: true, data: location });
    } else {
      res.status(404).json({ success: false, error: "Location not found" });
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ success: false, error: error.errors });
    }
    res
      .status(500)
      .json({
        success: false,
        error: "Error updating location",
        details: error.message,
      });
  }
};

// Soft delete una ubicación por ID
export const deleteLocation = async (req, res) => {
  const { id } = req.params;
  try {
    const location = await Location.findByPk(id);
    if (location) {
      location.enabled = false; // Marcar como deshabilitado
      await location.save();
      res.json({
        success: true,
        message: "Location soft deleted successfully",
      });
    } else {
      res.status(404).json({ success: false, error: "Location not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        error: "Error deleting location",
        details: error.message,
      });
  }
};
