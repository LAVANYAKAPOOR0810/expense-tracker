const API_URL = "http://localhost:4000/api/transactions";

const transactionList = document.getElementById("transaction-list");
const balanceEl = document.getElementById("balance");
const incomeEl = document.getElementById("income");
const expenseEl = document.getElementById("expense");



const form = document.getElementById("transaction-form");
const titleInput = document.getElementById("title");
const amountInput = document.getElementById("amount");
const typeSelect = document.getElementById("type");


async function fetchTransactions() {
    const response = await fetch(API_URL);
    const transactions = await response.json();
    renderTransactions(transactions);
    calculateBalance(transactions);
  }

  function renderTransactions(transactions) {
    transactionList.innerHTML = "";
  
    transactions.forEach((tx) => {
      const li = document.createElement("li");
      li.textContent = `${tx.title} - ₹${tx.amount}`;
      li.className = tx.type === "income" ? "income" : "expense";
      transactionList.appendChild(li);
    });
  }


  function calculateBalance(transactions) {
    let balance = 0;
    let income = 0;
    let expense = 0;
  
    transactions.forEach((tx) => {
      if (tx.type === "income") {
        income += tx.amount;
        balance += tx.amount;
      } else {
        expense += tx.amount;
        balance -= tx.amount;
      }
    });
  
    balanceEl.textContent = `₹${balance}`;
    incomeEl.textContent = `₹${income}`;
    expenseEl.textContent = `₹${expense}`;
  }




  fetchTransactions();

form.addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const newTransaction = {
      title: titleInput.value,
      amount: Number(amountInput.value),
      type: typeSelect.value,
    };
  
    await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTransaction),
    });
  
    form.reset();
    fetchTransactions(); // refresh UI
  });