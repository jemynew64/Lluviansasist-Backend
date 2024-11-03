import { User } from "../models/user.js"; // Asegúrate de que la ruta sea correcta
import { UserSchema } from "../schemas.js"; // Asegúrate de que la ruta sea correcta
import { z } from "zod"; // Asegúrate de importar Zod
import bcrypt from "bcryptjs"; // Cambiado a bcryptjs

// Obtener todos los usuarios
export const getAllUsers = async (req, res) => {
  try {
    // Obtener todos los usuarios habilitados
    const users = await User.findAll({ where: { enabled: true } });

    // Calcular el total de usuarios
    const totalItems = await User.count({ where: { enabled: true } });
    const totalPages = Math.ceil(totalItems / 10); // Suponiendo que muestras 10 usuarios por página
    const currentPage = 1; // Cambia esto si implementas paginación

    // Estructurar la respuesta
    res.json({
      success: true,
      data: users,
      meta: {
        totalItems,
        totalPages,
        currentPage,
        perPage: 10, // Puedes modificar esto según la cantidad de usuarios que muestres por página
      },
    });
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
    const validatedData = UserSchema.parse(req.body);

    // Encriptar la contraseña antes de crear el usuario
    const hashedPassword = await bcrypt.hash(validatedData.password, 10); // El número 10 es el saltRounds
    const newUser = await User.create({
      ...validatedData,
      password: hashedPassword, // Asigna la contraseña encriptada
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
      // Validar y permitir campos opcionales
      const validatedData = UserSchema.partial().parse(req.body);

      // Si se incluye el campo password en la actualización, encriptarlo
      if (validatedData.password) {
        validatedData.password = await bcrypt.hash(validatedData.password, 10); // Encriptación de la nueva contraseña
      }

      // Asignar los datos validados (incluida la contraseña encriptada si se actualizó)
      Object.assign(user, validatedData);
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
