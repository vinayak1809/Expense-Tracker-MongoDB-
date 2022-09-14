const url = "http://localhost:4000";

const thirty = document.getElementById("30");

///////////////////////////////////////////////
// package selection
///////////////////////////////////////////////

thirty.addEventListener("click", async function () {
  await axios.post(`${url}/order`, { amount: 100 }).then((result) => {
    alert("order created thirty created! time for the payment ");

    document.getElementById("payment_buttons").style.display = "none";
    document.getElementById("checkoutSection").style.display = "block";

    document.getElementById("rzp-text").value = result.data.order.id;
  });
});

const threeSixFive = document.getElementById("365");

threeSixFive.addEventListener("click", async function () {
  await axios.post(`${url}/order`, { amount: 1000 }).then(() => {
    alert("order created threeSixFive");
    document.getElementById("payment_buttons").style.display = "none";
    document.getElementById("checkout").style.display = "block";
  });
});

///////////////////////////////////////////////
// checkout section
///////////////////////////////////////////////

var options = {
  key: "rzp_test_IeLLvZzDg1jvE1", //Enter your razorpay key
  currency: "INR",
  name: "Razor Tutorial",
  description: "Razor Test Transaction",
  image:
    "https://previews.123rf.com/images/subhanbaghirov/subhanbaghirov1605/subhanbaghirov160500087/56875269-vector-light-bulb-icon-with-concept-of-idea-brainstorming-idea-illustration-.jpg",
  order_id: document.getElementById("rzp-text").value,
  handler: function (response) {
    console.log(response, "responsessssssss");
    document.getElementById("order-pay-id").value =
      response.razorpay_payment_id;
    document.getElementById("order-id").value = response.razorpay_order_id;
    document.getElementById("order-sig").value = response.razorpay_signature;
  },
  theme: {
    color: "#227254",
  },
};
var razorpayObject = new Razorpay(options);

razorpayObject.on("payment.failed", function (response) {
  console.log(response);
  alert("This step of Payment Failed");
});

document.getElementById("rzp-button1").onclick = function (e) {
  document.getElementById("checkoutSection").style.display = "none";
  razorpayObject.open();
  e.preventDefault();

  document.getElementById("verifySection").style.display = "block";
};

///////////////////////////////////////////////
// verify section
///////////////////////////////////////////////

async function verify(event) {
  event.preventDefault();
  const form = new FormData(event.target);

  const verifyData = {
    orderPayId: form.get("order-pay-id"),
    orderId: form.get("order-id"),
    signature: form.get("order-sig"),
  };

  let log = await axios
    .post(`${url}/verify`, verifyData)
    .then(() => {
      console.log("successfull paymentttttttttttttt");
    })
    .catch(() => {
      console.log("unsuccessfull paymentttttttttttttt");
    });
}
