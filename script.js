"use strict";

//const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

let balance;
let amount = 0;
let money;
const movement = {
  capital: amount,
  expenses: [],
};

const displaybalance = function (obj) {
  money = obj.expenses.reduce((acc, mov) => acc - mov, 0);
  balance = amount + money;

  labelBalance.textContent = `${balance}€`;
};

//console.log(displaybalance(movement));

//Event Handlers
btnLogin.addEventListener("click", function (e) {
  e.preventDefault();
  containerMovements.innerHTML = "";
  //console.log("hello world");
  amount = Number(inputLoginUsername.value);

  labelBalance.textContent = `${Number(inputLoginUsername.value)}€`;
  movement.capital = amount;
  inputLoginUsername.value = "";
  inputLoginUsername.blur();
  displaybalance(movement);
  labelSumIn.textContent = `${amount}€`;
});

btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();

  let type = inputTransferTo.value;
  let expense = Number(inputTransferAmount.value);

  if (balance > expense) {
    // console.log(amount);
    movement.expenses.push(expense);
    const html = `<div class="movements__row">
    <div class="movements__type movements__type--withdrawal">
      ${type}
    </div>
    <div class="movements__date">24/01/2037</div>
    <div class="movements__value">-${expense}€</div>
  </div>`;

    containerMovements.insertAdjacentHTML("afterbegin", html);

    // displaybalance(movement);
    //clearing input
    inputTransferAmount.value = inputTransferTo.value = "";

    inputTransferAmount.blur();
    inputTransferTo.blur();

    //Pushing input to expensesArray;
    console.log(movement.expenses);
    //Updating current balance UI;
    displaybalance(movement);

    labelSumOut.textContent = `${money}`;
  } else {
    labelBalance.textContent = `Insufficient Funds☹`;
  }
  //console.log(movement.expenses);
  // console.log(amount - balance);
});
