import dotenv from "dotenv";

dotenv.config();

/**
 * Si no existe la variable de entrono que provee el host, usar el puerto 4000
 */
export const PORT = process.env.PORT || 4000;

// Traemos desde el archivo de vbles de entono '.env' a la vble y la exportamos
export const CONNECTION_STRING = process.env.CONNECTION_STRING;
