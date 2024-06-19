const jwt = require("../utils/jwt");

function asureAuth(req, res, next) {
  // console.log("estoy en asure auth")

  // res.status(500).send({msg:"MD bloquea"})

  if (!req.headers.authorization) {
    res.status(403).send({ msg: "la peticion no tiene la cabecera" });
  }

  const token = req.headers.authorization.replace("Bearer ","");

  try {
    const payload = jwt.decode(token);
    const { exp } = payload;
    const currentData = new Date().getTime();

    if (exp <= currentData) {
      return res.status(400).send({ msg: "el token ha expirado" });
    }
    req.user = payload;
    next();
    //console.log(payload);
  } catch (e) {
    return res.status(400).send({ msg: "token invalido " });
  }
}

module.exports = {
  asureAuth,
};
