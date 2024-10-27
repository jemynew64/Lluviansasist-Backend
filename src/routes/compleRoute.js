import express from "express";
import { getUsersByTrainingId } from "../controllers/compleControllers.js";

const router = express.Router();

router.get("/:idTraining/Listusuarioentrena", getUsersByTrainingId);

export default router;
