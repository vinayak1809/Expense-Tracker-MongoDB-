const token = localStorage.getItem("token");
let page = 1;

const previous = document.getElementById("previous");
const next = document.getElementById("next");
var itemNum = localStorage.getItem("NumberOfExpense");

////////////////////////////////////////////////////
// pagination
////////////////////////////////////////////////////

async function callPage(event) {
  event.preventDefault();

  var itemNum = localStorage.getItem("NumberOfExpense");

  if (event.target.id == "next") {
    previous.style.display = "block";

    page = page + 1;

    await axios
      .get(`http://localhost:4000/expense/?page=${page}&item=${itemNum}`, {
        headers: { authorization: token },
      })
      .then((result) => {
        if (result.data.length != 0) {
          showExpense(result.data);
        } else {
          next.style.display = "none";
        }
      });
  } else {
    page = page - 1;

    await axios
      .get(`http://localhost:4000/expense/?page=${page}&item=${itemNum}`, {
        headers: { authorization: token },
      })
      .then((result) => {
        showExpense(result.data);
      });
  }
}

////////////////////////////////////////////////////
// display expense
////////////////////////////////////////////////////

function showExpense(expenseList) {
  const expensesList = document.getElementById("expense-list");

  expensesList.innerHTML = "";
  expenseList.forEach((expense) => {
    const div = document.createElement("div");
    div.setAttribute("class", "list");
    div.setAttribute("id", `${expense.id}`);

    div.innerHTML = `       
        <div class="show">
            <li id="cate">${expense.category}</li>
            <li>${expense.amount}</li>
            <li id="desc">${expense.description}</li>
        </div>
        <div class="perform">
        <button><span class="material-symbols-outlined">edit</span></button>
        <button onclick="deleteExpense(\`${expense._id}\`)"><span class="material-symbols-outlined">delete</span></button>
        </div>
    `;

    expensesList.appendChild(div);
  });
}

window.addEventListener("DOMContentLoaded", async () => {
  await axios
    .get(`http://localhost:4000/expense/?page=${page}&item=${itemNum}`, {
      headers: { authorization: token },
    })
    .then((result) => {
      console.log(result.data.premium, "premium");
      if (result.data.premium) {
        document.body.classList.toggle("dark-mode");
      }

      previous.style.display = "none";
      showExpense(result.data.expense);
    });
});
////////////////////////////////////////////////////
// save expense
////////////////////////////////////////////////////

async function saveExpense(event) {
  event.preventDefault();
  const form = new FormData(event.target);

  const addExpense = {
    category: form.get("category"),
    description: form.get("description"),
    amount: form.get("amount"),
  };

  const log = await axios
    .post("http://localhost:4000/add-expense", addExpense, {
      headers: { authorization: token },
    })
    .then((result) => {
      alert("Item added");

      showExpense([addExpense]);
      // location.href = "http://localhost:4000/add-expense.html";
    })
    .catch((err) => {
      console.log(err);
    });
}
////////////////////////////////////////////////////
// delete expense
////////////////////////////////////////////////////

function deleteFromFrontEnd(id) {
  const div = document.getElementById(id);
  div.remove();
}

async function deleteExpense(id) {
  data = { id: id };
  const delete_expense = await axios
    .post(`http://localhost:4000/delete-expense`, data, {
      headers: { authorization: token },
    })
    .then((result) => {
      alert("item deleted");
      deleteFromFrontEnd(id);

      location.href = "http://localhost:4000/add-expense.html";
    })
    .catch((err) => {
      console.log("error in delete expense", err);
    });
}

// document.getElementById("cate").addEventListener("mouseover", mouseOver);
// document.getElementById("cate").addEventListener("mouseout", mouseOut);

// function mouseOver() {
//   document.getElementById("desc").style.display = "block";
// }

// function mouseOut() {
//   document.getElementById("desc").style.display = "none";
// }

////////////////////////////////////////////////////
// how many expense you wnt to show on one page
////////////////////////////////////////////////////

const input = document.querySelector("input");
input.addEventListener("input", updateValue);

function updateValue(e) {
  localStorage.setItem("NumberOfExpense", e.target.value);
}
