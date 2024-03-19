import UserModel from "../models/users.model.js";
import bcrypt from "bcrypt";

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

// DELETE user by id

// registro
const registroUsuario = async (req, res) => {
  console.log(req, "<-- REQ");

  try {
    const { nombre, apellido, email, password } = req.body;

    const salt = await bcrypt.genSalt(10); // numero: denota cuanto se encripta la contraseña
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new UserModel({
      nombre,
      apellido,
      email,
      password : passwordHash,
    });
    
    const user = await newUser.save();
    res.json(user);
  } catch (error) {
    console.error(error);
  }
};

export default {
  getAllUsers,
  registroUsuario,
};
