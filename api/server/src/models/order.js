const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  paymentid: {
    type: String,
  },
  orderid: {
    type: String,
  },
  status: {
    type: String,
  },
  userId: {
    type: Schema.Types.ObjectId,
  },
});

module.exports = mongoose.model("Order", orderSchema);
