import { Registration } from "../models/registration.js";
import { User } from "../models/user.js";

export const getUsersByTrainingId = async (req, res) => {
  const { idTraining } = req.params;

  try {
    const registrations = await Registration.findAll({
      where: { idTraining, enabled: true },
      include: [
        {
          model: User,
          as: "user", // Usa el alias correcto aquí
          where: { enabled: true },
          attributes: [
            "id",
            "firstName",
            "lastName",
            "dni",
            "phone",
            "birthDate",
            "gender",
          ], // Ajusta los campos según lo que necesites
        },
      ],
    });

    if (registrations.length > 0) {
      const users = registrations.map((registration) => registration.user); // Usa el alias correcto aquí
      res.json({ success: true, data: users });
    } else {
      res
        .status(404)
        .json({ success: false, error: "No users found for this training" });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error fetching users for the training",
      details: error.message,
    });
  }
};
