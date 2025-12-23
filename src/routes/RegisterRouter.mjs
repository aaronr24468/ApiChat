import { Router } from "express";
import { registerUser } from "../controllers/controllers.mjs";

export const router = Router();

router.post('/', registerUser)