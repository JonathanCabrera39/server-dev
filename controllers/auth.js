const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("../utils/jwt");

async function register(req, res) {
  const { firstname, lastname, email, password } = req.body;

  if (!email) res.status(400).send({ msg: "email required for registration " });
  if (!password)
    res.status(400).send({ msg: "password required for registration " });

  const user = new User({
    firstname: firstname,
    lastname: lastname,
    email: email.toLowerCase(),
    password: password,
    active: true,
    role: "user",
  });

  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);
  user.password = hashPassword;

  try {
    await user.save();
    res.status(200).send({ msg: "Success" });
  } catch (err) {
    res.status(400).send({ msg: `error al crear el usuario:${err} ` });
  }
}

async function login(req, res) {
  const { email, password } = req.body;

  if (!email) return res.status(400).send({ msg: "el email es obligatorio" });
  if (!password) res.status(400).send({ msg: "la contra es obligatoria" });
  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    const check = await bcrypt.compare(password, user.password);
    console.log(user);
    console.log("password" + password);

    if (!check) {
      res.status(400).send({ msg: "contra incorrecta" });
    } else if (!user.active) {
      res.status(401).send({ msg: "usuario no autrorizado o no activo" });
    } else {
      res.status(200).send({ accesse: jwt.createAccessToken(user)});
    }
  } catch (err) {
    res.status(500).send({ msg: "Error en el servidor" });
  }
}

module.exports = {
  register,
  login,
};
