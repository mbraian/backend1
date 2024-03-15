import { Router } from "express";
import { getAllProducts, getProductById } from "../controllers/productos.controllers.js";

const router = Router();

// Cuando pido la URL, se ejecuta el controlador y devuelve el json con los productos
router.get("/productos", getAllProducts);
router.get("/producto/:id", getProductById); // Declaramos que se va a recibir una variable de nombre 'id' y mediante 'value' en postman le enviamos el valor

export default router;
