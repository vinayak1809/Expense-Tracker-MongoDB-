function showExpense(expenseList) {
  const expensesList = document.getElementById("expenseList");
  expenseList.forEach((expense) => {
    const div = document.createElement("div");
    div.setAttribute("class", "dk");
    div.innerHTML = `
    <div id=${expense.id} class="dk">          
        <ul class="list">
            <li>${expense.category}</li>
            <li>${expense.description}</li>
            <li>${expense.amount}</li>
        </ul>
        <div class="update-delete">
            <button onclick="deleteExpense(${expense.id})">delete</button>
            <button>edit</button>
        </div>
    </div>`;
    // ul = document.createElement("ul");
    // ul.setAttribute("class", "list");

    // category = document.createElement("li");
    // category.innerHTML = expense.category;

    // desc = document.createElement("li");
    // desc.innerHTML = expense.description;

    // amount = document.createElement("li");
    // amount.innerHTML = expense.amount;

    // ul.appendChild(category);
    // ul.appendChild(desc);
    // ul.appendChild(amount);

    expensesList.appendChild(div);
  });
}

window.addEventListener("DOMContentLoaded", async () => {
  await axios.get("http://localhost:4000/expense").then((result) => {
    showExpense(result.data);
  });
});

async function saveExpense(event) {
  event.preventDefault();
  const form = new FormData(event.target);

  const addExpense = {
    category: form.get("category"),
    description: form.get("description"),
    amount: form.get("amount"),
  };

  const log = await axios
    .post("http://localhost:4000/add-expense", addExpense)
    .then((result) => {
      alert("Item added");

      showExpense([addExpense]);
      location.href = "http://localhost:4000/add-expense.html";
    })
    .catch((err) => {
      console.log(err);
    });
}

function deleteFromFrontEnd(id) {
  const div = document.getElementById(id);
  div.remove();
}

async function deleteExpense(id) {
  const delete_expense = await axios
    .delete(`http://localhost:4000/delete-expense/${id}`)
    .then((result) => {
      alert("item deleted");
      deleteFromFrontEnd(id);

      location.href = "http://localhost:4000/add-expense.html";
    })
    .catch((err) => {
      console.log("error in delete expense", err);
    });
}
