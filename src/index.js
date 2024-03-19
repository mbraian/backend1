import express from "express";
import { PORT } from "./config/config.js";
import ProductRoutes from "./routes/productos.routes.js";
import morgan from "morgan";
import cors from "cors";
import "./db/db_connection.js";
import usersRoutes from "./routes/users.routes.js";

const app = express(); // Creamos una aplicacion de Express por la cual va a pasar todo el funcionamiento de nuestra app

app.use(express.json()); // Middleware que ayuda a parsear la informacion
app.use(morgan("dev")); // Middleware que brinda mayor informacion sobre las peticiones al servidor: tipo de peticion, codigo de estado, latencia, y ...
app.use(cors()); // Permite peticiones de todos lados (si se declara asi como está). Error de cors: peticiones de origen cruzado. No me deja hacer peticiones a dominios ajenos al server

app.use(ProductRoutes); // Debemos declarar las rutas depues de morgan
app.use("/api", usersRoutes);
// endpoint: "http://localhost:4000/api/usuarios"

// LEVANTAMOS EL SERVIDOR
app.listen(PORT, async () => {
  console.log(`\n\tLa app esta escuchando en el puerto ${PORT}`);
});
