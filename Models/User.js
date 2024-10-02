const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
  referCode: {
    type: String,
    required: true,
    minlength: 5  ,
    maxlength: 1024,
  },
});

const UserModel = mongoose.model("users", userSchema);
module.exports = UserModel;