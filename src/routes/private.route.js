import express from "express"; // TODO CLASE 43

const router = express.Router();

router.get("/admin", (req, res) => {
    console.log(req.nombre, "Usuario")
    res.json({message: "Admin page", data: { user: req.usuario }})
});

export default router;