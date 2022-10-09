const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone_number: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  ispremiumuser: {
    type: Schema.Types.Boolean,
  },
});

module.exports = mongoose.model("User", userSchema);
