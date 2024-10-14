import { User } from "../models/user.js"; // Asegúrate de que la ruta sea correcta
import { UserSchema } from "../schemas.js"; // Asegúrate de que la ruta sea correcta
import { z } from "zod"; // Asegúrate de importar Zod

// Obtener todos los usuarios
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({ where: { enabled: true } });
    res.json({ success: true, data: users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ success: false, error: "Error fetching users" });
  }
};

// Obtener un usuario por ID
export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ where: { id, enabled: true } });
    if (user) {
      res.json({ success: true, data: user });
    } else {
      res.status(404).json({ success: false, error: "User not found" });
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ success: false, error: "Error fetching user" });
  }
};

// Crear un nuevo usuario
export const createUser = async (req, res) => {
  try {
    // Validar usando Zod
    const validatedData = UserSchema.parse(req.body);

    const newUser = await User.create({
      ...validatedData,
      enabled: true,
    });

    res.status(201).json({ success: true, data: newUser });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ success: false, error: error.errors });
    }
    console.error("Error creating user:", error);
    res
      .status(500)
      .json({ success: false, error: error.message || "Error creating user" });
  }
};

// Actualizar un usuario por ID
export const updateUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);
    if (user) {
      const validatedData = UserSchema.partial().parse(req.body); // Permite campos opcionales
      Object.assign(user, validatedData); // Actualiza solo los campos proporcionados
      await user.save();
      res.json({ success: true, data: user });
    } else {
      res.status(404).json({ success: false, error: "User not found" });
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ success: false, error: error.errors });
    }
    console.error("Error updating user:", error);
    res.status(500).json({ success: false, error: "Error updating user" });
  }
};

// Soft delete un usuario por ID
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (user) {
      user.enabled = false; // Marcar como deshabilitado
      await user.save();
      res.json({
        success: true,
        message: "User soft deleted successfully",
      });
    } else {
      res.status(404).json({ success: false, error: "User not found" });
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ success: false, error: "Error deleting user" });
  }
};
