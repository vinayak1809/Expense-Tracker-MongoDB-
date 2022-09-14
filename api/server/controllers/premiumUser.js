const Order = require("../src/models/order");
const Razopay = require("razorpay");

exports.getOrder = (req, res, next) => {
  try {
    var rzp = new Razopay({
      key_id: process.env.RZP_KEY_ID,
      key_secret: process.env.RZP_KEY_SECRET,
    });

    const amount = req.body.amount;
    const currency = "INR";
    const receipt = "yearlypackage";

    rzp.orders.create({ amount, currency, receipt }, (err, order) => {
      if (!err) {
        console.log(order.id, "orderiddddddddddddddddddd");
        Order.create({
          userId: req.id,
          paymentid: "",
          orderid: order.id,
          status: "PENDING",
        }).then(() => {
          return res.status(201).json({ order, key_id: rzp.key_id });
        });
      } else {
        res.json(err);
      }
    });
  } catch {
    console.log(err);
    res.status(403).json({ message: "Sometghing went wrong", error: err });
  }
};

exports.verifyOrder = (req, res, next) => {
  const paymentId = req.body.orderPayId;
  const orderId = req.body.orderId;
  const signature = req.body.signature;
  console.log("verifyOrder", paymentId, orderId);

  try {
    Order.update(
      { paymentid: paymentId, status: "successfull" },
      { where: { orderid: orderId } }
    ).then(() => {
      req.id.update({ ispremiumuser: true });
      return res
        .status(202)
        .json({ sucess: true, message: "Transaction Successful" });
    });
  } catch {
    return res
      .status(202)
      .json({ sucess: false, message: "Transaction Successful" });
  }
};
