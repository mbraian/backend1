import dotenv from "dotenv";

dotenv.config();

/**
 * Si no existe la variable de entrono que provee el host, usar el puerto 4000
 */
export const PORT = process.env.PORT || 4000;
