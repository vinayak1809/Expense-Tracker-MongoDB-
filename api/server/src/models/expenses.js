const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const expenseSchema = new Schema({
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    dropDups: true, //same as unique:true
  },
  amount: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

module.exports = mongoose.model("Expenses", expenseSchema);
