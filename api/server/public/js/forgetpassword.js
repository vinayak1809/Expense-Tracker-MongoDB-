const url = "http://localhost:4000";

async function saveMail(event) {
  event.preventDefault();

  const form = new FormData(event.target);

  const submitMail = {
    mail: form.get("email"),
  };

  await axios.post(`${url}/password/forgotpassword`, submitMail),
    then(() => {
      alert("A link is send to your mail");
    }).catch((err) => {
      console.log(err);
    });
}
