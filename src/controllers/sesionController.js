import { User } from "../models/user.js"; // Asegúrate de que la ruta sea correcta
import { LoginSchema } from "../schemas.js"; // Asegúrate de que la ruta sea correcta
import bcrypt from "bcryptjs"; // Cambiado a bcryptjs

// Controlador para el login
export const postLogin = async (req, res) => {
  try {
    // Validar el esquema de login
    const { username, password } = LoginSchema.parse(req.body); // Esto lanzará un error si la validación falla
    console.log("Request Body:", req.body);

    // Buscar el usuario en la base de datos
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Verificar la contraseña
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Incorrect password" });
    }

    // Generar y enviar token de sesión, o enviar respuesta de éxito
    return res.status(200).json({ success: true, message: "Login successful" });
  } catch (error) {
    // Manejo de errores
    console.error("Login error:", error); // Para depuración
    return res.status(400).json({ success: false, message: error.message });
  }
};
