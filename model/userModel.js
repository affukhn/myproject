const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String },
  email: { type: String },
  phone: { type: Number },
  password: { type: String }
})

module.exports = mongoose.model("auth", userSchema);
