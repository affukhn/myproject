const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, require: true },
  department: { type: String, require: true },
  avatar :{ type:String }
},{timestamps:true});

module.exports = mongoose.model("User", UserSchema);