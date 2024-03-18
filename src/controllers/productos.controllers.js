import { productos } from "../db/db.js";
import Product from "../models/product.model.js";

/**
 * @param {object} req peticion que viene del front. Objeto generado por express(que no esta declarado aqui)
 * @param {object} res respuesta que le brindaremos al front
 */
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProductById = async (req, res) => {
  const { id } = req.params;
  console.log(req.params, "params");

  try {
    const productFound = await Product.findById(id);
    console.log(productFound, "<-- Producto");

    res.status(200).json(productFound);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

// TAREA
// •	Crear endpoint getProductByCategory (ruta y controlador) y debe devolver los productos con la categoría recibida por parámetro.
export const getProductsByCategory = async (req, res) => {
  const { category } = req.params;
  console.log(category, "<-- categoria");

  /*if (productos.length === 0) TAREA VIEJA
    return res.status(204).send("No existen productos para ordenar");

  const productsByCategory = productos.filter(
    (product) => product.categoria.toLowerCase() === category.toLowerCase()
  );
  console.log(productsByCategory, "<-agarrados");

  productsByCategory.length !== 0
    ? res.status(200).json(productsByCategory)
    : res
        .status(404)
        .json({ message: "No hemos podido encontrar la cotegoria solicitada" });*/
  
  try {
    const productsByCategory = await Product.find( { categoria: category} );
    console.log(productsByCategory,"<-- PBCat");
    res.status(200).json(productsByCategory);
  } catch (error) {
    return res.status(500).json( {message: error} );
  }


};

// •	Crear el endpoint sortProductByPrice que debe recibir un parámetro que puede adoptar los valores “asc” o “desc” y debe devolver los productos ordenados por precio.
export const sortProductsBryPrice = async (req, res) => {
  const { sort } = req.params;
  console.log(sort, "<--orden");

  if (productos.length === 0)
    return res.status(204).send("No existen productos para ordenar");

  if (sort === "asc") {
    const asc = productos.sort((a, b) => a.precio - b.precio);
    res.status(200).json(asc);
  } else if (sort === "desc") {
    const desc = productos.sort((a, b) => b.precio - a.precio);
    res.status(200).json(desc);
  } else {
    res.status(404).json({ message: "No se puede ordenar de dicha manera." });
  }
};

//
export const createProduct = async (req, res) => {
  console.log(req.body, "<-- Body");
  const { name, categoria, precio, imagen } = req.body;

  try {
    const newProduct = await Product.create({
      name: name,
      categoria: categoria,
      precio: precio,
      imagen: imagen,
    });
    res.status(201).json({ message: "El producto se ha creado exitosamente!" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// Tarea 13/03: Refactorizar los 2 endpoints de tarea pasada usando metodos de Mongoose. (Ambas usan 'find()', con la de 'sort' hay que darle una vuelta mas). Con la de 'sort' existe un metodo que nos va a facilitar la vida
// stack overflow: "how to sort in mongoose?" -> '[val1, val2]'; val1: param que queremos ordenar; val2: 1 o -1 para asc o desc
