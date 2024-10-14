import { Registration } from "../models/registration.js";
import { RegistrationSchema } from "../schemas.js"; // Asegúrate de que la ruta sea correcta
import { z } from "zod"; // Asegúrate de importar Zod

// Obtener todas las inscripciones
export const getAllRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.findAll({
      where: { enabled: true },
    });
    res.json({ success: true, data: registrations });
  } catch (error) {
    console.error("Error fetching registrations:", error);
    res
      .status(500)
      .json({ success: false, error: "Error fetching registrations" });
  }
};

// Obtener una inscripción por ID
export const getRegistrationById = async (req, res) => {
  const { id } = req.params;
  try {
    const registration = await Registration.findOne({
      where: { id, enabled: true },
    });
    if (registration) {
      res.json({ success: true, data: registration });
    } else {
      res.status(404).json({ success: false, error: "Registration not found" });
    }
  } catch (error) {
    console.error("Error fetching registration:", error);
    res
      .status(500)
      .json({ success: false, error: "Error fetching registration" });
  }
};

// Crear una nueva inscripción
export const createRegistration = async (req, res) => {
  try {
    // Validar usando Zod
    const validatedData = RegistrationSchema.parse(req.body);

    const newRegistration = await Registration.create({
      ...validatedData,
      enabled: true,
    });
    res.status(201).json({ success: true, data: newRegistration });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ success: false, error: error.errors });
    }
    console.error("Error creating registration:", error);
    res.status(500).json({
      success: false,
      error: "Error creating registration",
      details: error.message,
    });
  }
};

// Actualizar una inscripción por ID
export const updateRegistration = async (req, res) => {
  const { id } = req.params;

  try {
    const registration = await Registration.findOne({
      where: { id, enabled: true },
    });
    if (registration) {
      const validatedData = RegistrationSchema.partial().parse(req.body); // Permite campos opcionales
      Object.assign(registration, validatedData); // Actualiza solo los campos proporcionados
      await registration.save();
      res.json({ success: true, data: registration });
    } else {
      res.status(404).json({ success: false, error: "Registration not found" });
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ success: false, error: error.errors });
    }
    console.error("Error updating registration:", error);
    res
      .status(500)
      .json({ success: false, error: "Error updating registration" });
  }
};

// Soft delete una inscripción por ID
export const deleteRegistration = async (req, res) => {
  const { id } = req.params;
  try {
    const registration = await Registration.findOne({
      where: { id, enabled: true },
    });
    if (registration) {
      registration.enabled = false; // Marcar como deshabilitado
      await registration.save();
      res.json({
        success: true,
        message: "Registration soft deleted successfully",
      });
    } else {
      res.status(404).json({ success: false, error: "Registration not found" });
    }
  } catch (error) {
    console.error("Error deleting registration:", error);
    res
      .status(500)
      .json({ success: false, error: "Error deleting registration" });
  }
};
