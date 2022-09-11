async function loginuser(event) {
  event.preventDefault();
  const form = new FormData(event.target);

  const loginDetails = {
    email: form.get("email"),
    password: form.get("password"),
  };

  let log = await axios.post("http://localhost:4000/login", loginDetails);

  if (log.data.success == true) {
    alert(log.data.message);
    localStorage.setItem("token", log.data.token);

    Window.location.href = "http://localhost:4000/add-expense.html";
  }
  if (log.data.success == false) {
    console.log(log.data.message);
    window.alert(log.data.message);
  }
}
