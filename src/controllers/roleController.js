import { Role } from "../models/role.js";
import { RoleSchema } from "../schemas.js"; // Asegúrate de que la ruta sea correcta
import { z } from "zod"; // Asegúrate de importar Zod

// Obtener todos los roles
export const getAllRoles = async (req, res) => {
  try {
    const roles = await Role.findAll({ where: { enabled: true } });
    res.json({ success: true, data: roles });
  } catch (error) {
    console.error("Error fetching roles:", error);
    res.status(500).json({ success: false, error: "Error fetching roles" });
  }
};

// Obtener un rol por ID
export const getRoleById = async (req, res) => {
  const { id } = req.params;
  try {
    const role = await Role.findOne({ where: { id, enabled: true } });
    if (role) {
      res.json({ success: true, data: role });
    } else {
      res.status(404).json({ success: false, error: "Role not found" });
    }
  } catch (error) {
    console.error("Error fetching role:", error);
    res.status(500).json({ success: false, error: "Error fetching role" });
  }
};

// Crear un nuevo rol
export const createRole = async (req, res) => {
  try {
    // Validar usando Zod
    const validatedData = RoleSchema.parse(req.body); // Usar Zod para validar los datos

    const newRole = await Role.create({
      ...validatedData,
      enabled: true,
    });
    res.status(201).json({ success: true, data: newRole });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ success: false, error: error.errors });
    }
    console.error("Error creating role:", error);
    res.status(500).json({ success: false, error: "Error creating role" });
  }
};

// Actualizar un rol por ID
export const updateRole = async (req, res) => {
  const { id } = req.params;

  try {
    const role = await Role.findOne({ where: { id, enabled: true } });
    if (role) {
      const validatedData = RoleSchema.partial().parse(req.body); // Permite campos opcionales
      Object.assign(role, validatedData); // Actualiza solo los campos proporcionados
      await role.save();
      res.json({ success: true, data: role });
    } else {
      res.status(404).json({ success: false, error: "Role not found" });
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ success: false, error: error.errors });
    }
    console.error("Error updating role:", error);
    res.status(500).json({ success: false, error: "Error updating role" });
  }
};

// Soft delete un rol por ID
export const deleteRole = async (req, res) => {
  const { id } = req.params;
  try {
    const role = await Role.findOne({ where: { id, enabled: true } });
    if (role) {
      role.enabled = false; // Marcar como deshabilitado
      await role.save();
      res.json({
        success: true,
        message: "Role soft deleted successfully",
      });
    } else {
      res.status(404).json({ success: false, error: "Role not found" });
    }
  } catch (error) {
    console.error("Error deleting role:", error);
    res.status(500).json({ success: false, error: "Error deleting role" });
  }
};
