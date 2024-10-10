const nameUser = document.querySelector("#name");
// const user = window.prompt("Informe seu nome: ");

const list = document.querySelector(".todoList");
let input = document.querySelector(".inputBar");

const btnAdd = document.querySelector(".add");
nameUser.textContent = "user";

btnAdd.addEventListener("click", clickHandler);

let tasks = [];

function clickHandler(event) {
  event.preventDefault();
  const obj = { task: input.value, finished: false };
  tasks.push(obj);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  render(obj);
}
function render(obj) {
  const itemLista = document.createElement("li");
  itemLista.setAttribute("class", "list__item");

  const InputCheck = document.createElement("input");
  InputCheck.setAttribute("type", "checkbox");
  InputCheck.setAttribute("class", "checkbox");

  itemLista.innerText = obj.task;
  const deleteBtn = document.createElement("button");
  deleteBtn.setAttribute("class", "delete");
  deleteBtn.innerText = "Delete";

  itemLista.prepend(InputCheck);
  itemLista.append(deleteBtn);
  list.appendChild(itemLista);
  InputCheck.addEventListener("click", check);
  deleteBtn.addEventListener("click", toDelete);
  if (obj.finished) {
    itemLista.style.textDecoration = "line-through";
    InputCheck.checked = true;
  }
}
function check(event) {
  if (event.target.parentElement.hasAttribute("style")) {
    event.target.parentElement.style.textDecoration = "none";
  } else {
    event.target.parentElement.style.textDecoration = "line-through";
  }

  const task = event.target.parentElement.innerText
    .replace("Delete", "")
    .trim();

  localStorageTasks = JSON.parse(localStorage.getItem("tasks"));
  tasks = localStorageTasks.map((item) => {
    if (item.task === task) {
      return { task: item.task, finished: !item.finished };
    } else return item;
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}
function toDelete(event) {
  const task = event.target.parentElement.innerText
    .replace("Delete", "")
    .trim();
  localStorageTasks = JSON.parse(localStorage.getItem("tasks"));
  tasks = localStorageTasks.filter((item) => {
    if (item.task !== task) {
      return item;
    }
    location.reload();
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}
window.onload = () => {
  const localStorageTasks = localStorage.getItem("tasks");
  const tasks = localStorage.getItem("tasks")
    ? JSON.parse(localStorageTasks)
    : [];
  tasks.forEach((element) => {
    render(element);
  });
};
