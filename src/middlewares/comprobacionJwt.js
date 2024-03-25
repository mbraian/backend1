import jwt from "jsonwebtoken"; // TODO CLASE 43

const comprobacionJwt = (req, res, next) => { //next: habilita a pasar de largo /sgte funcion
    const token = req.headers.authorization;
    console.log(token,"<-- token");

    if(!token){
        return res.status(401).json({message: "No hay token"});
    }

    const verificacionToken = jwt.verify(token, process.env.SECRET)

    req.usuario = verificacionToken; // Preg como funca

    if(verificacionToken.admin){
        next(); // "Te habilito a pasar a la sgte funcion que seria la URL del admin"
    }else{
        return res.status(401).json({message: "No tienes permisos"})
    }
};

export default comprobacionJwt;