import express from "express";
import usersController from "../controllers/users.controller.js";

const router = express.Router();

// GET all users
router.get("/usuarios", usersController.getAllUsers);

// REGISTRO
router.post("/registro", usersController.registroUsuario);

export default router;