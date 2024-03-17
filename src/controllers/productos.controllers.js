import { productos } from "../db/db.js";

/**
 * @param {object} req peticion que viene del front. Objeto generado por express(que no esta declarado aqui)
 * @param {object} res respuesta que le brindaremos al front
 */
export const getAllProducts = async (req, res) => {
  console.log(req, "<--Req");
  res.status(200).json(productos);
};

export const getProductById = async (req, res) => {
  const { id } = req.params;
  console.log(req.params, "params");

  if (productos.length === 0) return  res.status(204).send("No existen productos para buscar");


  const productFound = productos.find((product) => product.id === id);

  if (productFound) {
    return res.status(200).json(productFound);
  }

  res.status(404).json({ message: "No hemos podido encontrar el producto solicitado." });

  //   res.status(200).json(productos.filter((p) => p.id === id));
  //console.log(productFound);
};

// TAREA
// •	Crear endpoint getProductByCategory (ruta y controlador) y debe devolver los productos con la categoría recibida por parámetro.
export const getProductsByCategory = async (req, res) => {
  const { category } = req.params;
    console.log(category, "<-- categoria");

    if (productos.length === 0) return  res.status(204).send("No existen productos para ordenar");


    const productsByCategory = productos.filter( product => product.categoria.toLowerCase() === category.toLowerCase());
    console.log(productsByCategory,"<-agarrados");

    productsByCategory.length !== 0 ? (
            res.status(200).json(productsByCategory)
        ) : (
            res.status(404).json({ message: "No hemos podido encontrar la cotegoria solicitada"})
    );
};

// •	Crear el endpoint sortProductByPrice que debe recibir un parámetro que puede adoptar los valores “asc” o “desc” y debe devolver los productos ordenados por precio.
export const sortProductsBryPrice = async (req, res) => {
    const { sort } = req.params;
    console.log(sort,"<--orden");

    if (productos.length === 0) return  res.status(204).send("No existen productos para ordenar");

    if(sort === "asc"){
        const asc = productos.sort( (a, b) => a.precio - b.precio);
        res.status(200).json(asc);
    }else if(sort === "desc"){
        const desc = productos.sort( (a, b) => b.precio - a.precio);
        res.status(200).json(desc);
    }else{
        res.status(404).json({message: "No se puede ordenar de dicha manera."});
    }
};
