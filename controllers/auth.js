import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs/dist/bcrypt.js";
import usersDobbyAds from "../models/auth.js";
import folder from "../models/folder.js";

export const signup = async (req, res) => {
  const { name, email, hashedPassword } = req.body;
  try {
    const existinguser = await usersDobbyAds.findOne({ email });
    if (existinguser) {
      return res
        .status(403)
        .json({ error: true, message: "User already Exist." });
    }

    const newFolderMain = await folder.create({});

    const newUser = await usersDobbyAds.create({
      name,
      email,
      hashedPassword,
      mainFolder: newFolderMain._id,
    });
    const token = jwt.sign(
      { email: newUser.email, id: newUser._id },
      process.env.JWT_SECRECT,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({ error: false, result: newFolderMain, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existinguser = await usersDobbyAds.findOne({ email });
    if (!existinguser) {
      return res.status(404).json({ error: true, message: "User don't exist" });
    }

    const isPasswordCrt = await bcrypt.compare(
      password,
      existinguser.hashedPassword
    );
    if (!isPasswordCrt) {
      return res
        .status(400)
        .json({ error: true, message: "Invalid credentials" });
    }

    const mainFolder = await folder.findOne({_id: existinguser.mainFolder})

    const token = jwt.sign(
      { email: existinguser.email, id: existinguser._id },
      process.env.JWT_SECRECT,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({ error: false, result: mainFolder, token });
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
};
