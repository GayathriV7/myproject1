const balance = document.getElementById("amt");

const money_plus = document.getElementById("addmoney");

const list = document.getElementById("list");

const form = document.getElementById("form");

const text = document.getElementById("text");

const amount = document.getElementById("amount");

const money_minus = document.getElementById("submoney");



const localStorageTransations = JSON.parse(localStorage.getItem("transations"));


let transations =

  localStorage.getItem("transations") !== null ? localStorageTransations : [];


function addTransation() {

  

  if (text.value === "" || amount.value ===
"") {

    text.placeholder = "please add income/exp";

    text.style.backgroundColor = "lightgreen";

    amount.placeholder = "please add amount";

    amount.style.backgroundColor = "lightgreen";

  } else {

    const transation = {

      id: genenrateID(),

      text: text.value,

      amount: +amount.value,

    };

    transations.push(transation);

    addTransationDOM(transation);

    updateValues();

    updateLocalStorage();

    text.value = "";

    amount.value = "";

  }

}


function genenrateID() {

  return Math.random() * 100;

}



function addTransationDOM(transation) {

  

  const sign = transation.amount < 0 ? "-" :
"+";

  const item = document.createElement("li");


  item.classList.add(transation.amount < 0 ?
"minus" : "plus");

  item.innerHTML = `${transation.text} <span>${sign}${ transation.amount}</span>

  <button class="delete-btn" onclick="removeTransation(${ transation.id})">x</button>`;

  list.appendChild(item);

}


function updateValues() {

  const amounts = transations.map((transation) => transation.amount);

  const total = amounts.reduce((acc, item)
=> (acc += item), 0).toFixed(2);

  const income = amounts

    .filter((item) => item > 0)

    .reduce((acc, item) => (acc += item),
0)

    .toFixed(2);

  const expense = (

    amounts.filter((item) => item < 0).reduce((acc,
item) => (acc += item), 0) * -1).toFixed(2);


  balance.innerText = `$${total}`;

  money_plus.innerText = `$${income}`;

  money_minus.innerText = `$${expense}`;

  if(total<0)

  {

    alert("insufficient fund" );

    

  }

}


function removeTransation(id) {

  transations = transations.filter((transation) => transation.id !==
id);

  updateLocalStorage();

  init();

}



function updateLocalStorage() {

  localStorage.setItem("transations", JSON.stringify(transations));

}



function init() {

  list.innerHTML = "";

  transations.forEach(addTransationDOM);

  updateValues();

}

init();

form.addEventListener("submit", addTransation);
