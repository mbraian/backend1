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
  console.log(id);
  const productFound = productos.find((product) => product.id === id);

  if (productFound) {
    return res.status(200).json(productFound);
  }

  res.status(404).json( {message: "No hemos podido encontrar el producto solicitado."} );

  //   res.status(200).json(productos.filter((p) => p.id === id));
  console.log(productFound);
};
