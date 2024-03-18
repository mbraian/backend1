import { Schema, model } from "mongoose";
import { imageRegex } from "../helpers/imageURLRegex.js";

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Este atributo es requerido."],
      minLength: 1,
      maxLength: 50,
    },
    categoria: {
      type: String,
      required: [true, "Este atributo es requerido."],
      enum: ["Cafe", "Té"]
    },
    precio: {
      type: Number,
      required: [true, "Este atributo es requerido."],
      min: 1,
      max: 1_000_000
    },
    imagen: {
      type: String,
      required: [true, "Este atributo es requerido."],
      match: imageRegex
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Product: es el nombre con el que vamos a exportar
 */
export default model("Product", productSchema);
