import express from "express";
import usersController from "../controllers/users.controller.js";

const router = express.Router();

// GET all users
router.get("/usuarios", usersController.getAllUsers);

// REGISTRO
router.post("/registro", usersController.registroUsuario);

// DELETE // CLASE 42
router.delete("/delete/:id", usersController.deleteUsuario);
// http://localhost:4000/api/delete/

router.put("/update/:id", usersController.updateUsuario); // CLASE 42

//LOGIN // CLASE 42
router.post("/login", usersController.loginUsuario)

export default router;