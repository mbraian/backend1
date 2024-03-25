import UserModel from "../models/users.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// GET:
const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    console.log(users, "<--users");
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
  }
};

// CREATE user

// UPDATE user
const updateUsuario = async (req, res) => { //CLASE 42
    try {
        const { id } = req.params;
        const { nombre, apellido, admin } = req.body;

        const updateUser = await UserModel.findByIdAndUpdate( id, { nombre, apellido, admin } , { new: true});

        res.json(updateUser);
    } catch (error) {
        console.error(error)
    }
};


// DELETE 
const deleteUsuario = async (req, res) => { //CLASE 42
    try {
        const { id } = req.params;
        const user = await UserModel.findByIdAndDelete(id);
        res.json({message: "Usuario Eliminado"});
    } catch (error) {
        console.error(error);
    }
}

// GET user by id

// registro
const registroUsuario = async (req, res) => {
  console.log(req, "<-- REQ");

  try {
    const { nombre, apellido, email, password, admin } = req.body;

    const salt = await bcrypt.genSalt(10); // numero: denota cuanto se encripta la contraseña
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new UserModel({
      nombre,
      apellido,
      email,
      password : passwordHash,
      admin // solo CLASE 43
    });

    const user = await newUser.save();
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: error})
  }
};

// LOGIN
const loginUsuario = async (req, res) => { // CLASE 42
    try {
        const { email, password } = req.body; // desestructuracion: capturamos el mail y pass del body

        // Validaciones
        if(!email || !password){
         return res.status(400).json({message: "por favor rellene todos los campos"});
        }
        const user = await UserModel.findOne({email}); // Comprueba que el email exista en la DB

        console.log(user, "<-- usuarioooo")

        if(!user){
            return res.status(400).json({message: "usuario o pass incorrecta"});
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if(!validPassword){
            return res.status(400).json({message: "user o pass incorrecta"})
        }

        // res.json({message: "bienvenido"});

        const token = jwt.sign({ // Creando el PAYLOAD del token. Nunca pasar contraseñas
            id: user._id,
            nombre: user.nombre,
            apellido: user.apellido,
            admin: user.admin // solo CLASE 43
            },
            process.env.SECRET, // Pasamos la clve secreta
            { expiresIn: "150000" } // Tiempo de expiración del token
        );

        res.header(token).json( {token} );

    } catch (error) {
        console.error(error);
        res.status(500),json({message: "error en el servidor"})
    }
};

export default {
  getAllUsers,
  registroUsuario,
  deleteUsuario, // CLASE 42
  updateUsuario, // CLASE 42
  loginUsuario // CLASE 42
};
