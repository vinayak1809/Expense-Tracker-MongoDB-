const Order = require("../src/models/order");
const Razopay = require("razorpay");
const User = require("../src/models/user");

///////////////////////////////////////////////
// create-order
///////////////////////////////////////////////

exports.key = (req, res, next) => {
  res.status(200).json({ key_id: process.env.RZP_KEY_ID });
};

exports.postOrder = (req, res, next) => {
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
        const orderr = new Order({
          userId: req.id,
          paymentid: "",
          orderid: order.id,
          status: "PENDING",
        });

        orderr.save().then(() => {
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

///////////////////////////////////////////////
// verify-order
///////////////////////////////////////////////

exports.verifyOrder = async (req, res, next) => {
  const paymentId = req.body.orderPayId;
  const orderId = req.body.orderId;
  const signature = req.body.signature;
  console.log(orderId, "orderId");
  try {
    Order.findOneAndUpdate(
      { orderid: orderId },
      {
        paymentid: paymentId,
        status: "successfull",
      }
    ).then(() => {
      // req.id.update({ ispremiumuser: true });
      User.findOneAndUpdate({ id: req.id }, { ispremiumuser: true }).then(
        () => {
          return res
            .status(202)
            .json({ sucess: true, message: "Transaction Successfull" });
        }
      );
    });
  } catch {
    return res
      .status(202)
      .json({ sucess: false, message: "Transaction unSuccessfull" });
  }
};
