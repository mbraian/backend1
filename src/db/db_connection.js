import mongoose from "mongoose";
import { CONNECTION_STRING } from "../config/config.js";

mongoose.connect(CONNECTION_STRING);

mongoose.connection.on("connected", () => {
  console.log("Conectado a la base de datos de Mongo DB!");
});

mongoose.connection.on("error", (error) => {
  console.error(error);
});
