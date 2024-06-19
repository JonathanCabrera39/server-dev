const mongoose = require("mongoose");

const UserShema = mongoose.Schema({
  firstname: "string",
  lastname: "string",
  email: {
    type: "string",
    unique: true,
  },

  password: String,
  role: String,
  active: Boolean,
  avatar: String,
});

module.exports = mongoose.model("User", UserShema);


