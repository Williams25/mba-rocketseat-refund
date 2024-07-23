const expenseInput = document.getElementById("expense");
const amountInput = document.getElementById("amount");
const categoryInput = document.getElementById("category");
const totalRequest = document.getElementById("total-request");
const totalExpenses = document.getElementById("total-expenses");

const form = document.querySelector("form");
const body = document.querySelector("body");
const listItems = document.querySelector("ul");

let myInterferences = [];

let amountInputValue = null;

amountInput.addEventListener("input", (event) => {
  const formatCurrency = new FormatCurrency();
  const formatedValue = formatCurrency.currencyMask(
    formatCurrency.maskNumbers(event.target.value)
  );
  amountInput.value = formatedValue;
  amountInputValue = Number(
    formatedValue.replace(/\./g, "").replace(/\,/g, ".")
  );
});

const handleResetForm = () => {
  expenseInput.value = null;
  amountInput.value = null;
  categoryInput.value = "";
  amountInputValue = null;
};

const handleSetItemList = ({ title, value, id, category }) => {
  const item = new MyInterferences({ title, value, id, category });
  const li = document.createElement("li");
  li.className = "expense";
  li.id = item.getId();

  const img = document.createElement("img");
  img.src = item.getCategoryImg();
  img.alt = item.getCategory();

  li.appendChild(img);

  const expenseInfo = document.createElement("div");
  expenseInfo.className = "expense-info";

  const expenseInfoTitle = document.createElement("strong");
  expenseInfoTitle.innerText = item.getTitle();
  expenseInfo.appendChild(expenseInfoTitle);

  const expenseInfoSubTitle = document.createElement("span");
  expenseInfoSubTitle.innerText = item.getCategory();
  expenseInfo.appendChild(expenseInfoSubTitle);

  li.appendChild(expenseInfo);

  const expenseAmount = document.createElement("span");
  expenseAmount.className = "expense-amount";

  const formatCurrency = new FormatCurrency();

  const expenseAmountSmall = document.createElement("small");
  expenseAmountSmall.innerText = "R$";
  expenseAmount.appendChild(expenseAmountSmall);
  expenseAmount.appendChild(document.createTextNode(" "));
  expenseAmount.appendChild(
    document.createTextNode(formatCurrency.currencyMask(item.getValue()))
  );

  li.appendChild(expenseAmount);

  const imgRemove = document.createElement("img");
  imgRemove.src = "./img/remove.svg";
  imgRemove.alt = "remover item";
  imgRemove.className = "remove-icon";

  imgRemove.addEventListener("click", () => {
    myInterferences = myInterferences.filter((i) => i.id !== li.id);
    localStorage.setItem("myInterferences", JSON.stringify(myInterferences));
    handleSetTotalRequest();
    li.remove();
  });

  li.appendChild(imgRemove);

  listItems.appendChild(li);
};

const handleSetTotalRequest = () => {
  totalRequest.innerText = `${myInterferences.length} despesas`;
  const formatCurrency = new FormatCurrency();
  totalExpenses.innerText = formatCurrency.currencyMask(
    myInterferences.reduce((acc, item) => acc + item.value, 0)
  );
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (amountInputValue > 0) {
    const item = {
      category: categoryInput.value,
      title: expenseInput.value,
      value: amountInputValue,
      id: `item_${new Date().getTime()}`,
    };
    handleSetItemList(item);
    myInterferences.push(item);
    localStorage.setItem("myInterferences", JSON.stringify(myInterferences));
    handleSetTotalRequest();
    handleResetForm();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  try {
    const storage = JSON.parse(localStorage.getItem("myInterferences"));
    myInterferences.push(...Array.from(storage));
    handleSetTotalRequest();
    myInterferences.forEach((item) => handleSetItemList(item));
  } catch (error) {
    console.log(error);
  }
});
