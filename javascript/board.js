let todos = [
  {
    id: 0,
    title: "Putzen",
    category: "todo",
  },
  {
    id: 1,
    title: "Kochen",
    category: "todo",
  },
  {
    id: 2,
    title: "Einkaufen",
    category: "done",
  },
  {
    id: 3,
    title: "Einkaufen",
    category: "inProgress",
  },
  {
    id: 4,
    title: "Einkaufen",
    category: "awaitFeedback",
  },
];
let currentDraggedElement;


 async function init(){
    await loadData();
    await loadUser();
    setUserInitials();
    updateHTML();
} 

function openAddTaskPopup() {
  document.getElementById("addTaskPopup").classList.remove("d-none");
  document.getElementById("addTaskPopup").classList.add("slide-in");
}

function closeAddTaskPopup() {
  let addTaskPopup = document.getElementById("addTaskPopup");
  addTaskPopup.classList.remove("slide-in");
  addTaskPopup.classList.add("slide-out");

  setTimeout(function () {
    addTaskPopup.classList.add("d-none");
  }, 500);
  setTimeout(function () {
    addTaskPopup.classList.remove("slide-out");
  }, 900);
}

function startDragging(id) {
  currentDraggedElement = id;
}

function updateHTML() {
  todoAreaUpdate();
  inProgressUdate();
  feedbackAeraUdate();
  doneUpdate();
  checkTaskAreaDisplayEmpty()
}

function todoAreaUpdate() {
  let todo = todos.filter((t) => t["category"] == "todo");

  document.getElementById("todo").innerHTML = "";

  for (let index = 0; index < todo.length; index++) {
    const element = todo[index];
    document.getElementById("todo").innerHTML += generateTodoHTML(element);
  }
}

function inProgressUdate() {
  let inProgress = todos.filter((t) => t["category"] == "inProgress");

  document.getElementById("inProgress").innerHTML = "";

  for (let index = 0; index < inProgress.length; index++) {
    const element = inProgress[index];
    document.getElementById("inProgress").innerHTML +=
      generateTodoHTML(element);
  }
}

function feedbackAeraUdate() {
  let awaitFeedback = todos.filter((t) => t["category"] == "awaitFeedback");

  document.getElementById("awaitFeedback").innerHTML = "";

  for (let index = 0; index < awaitFeedback.length; index++) {
    const element = awaitFeedback[index];
    document.getElementById("awaitFeedback").innerHTML +=
      generateTodoHTML(element);
  }
}

function doneUpdate() {
  let done = todos.filter((t) => t["category"] == "done");

  document.getElementById("done").innerHTML = "";

  for (let index = 0; index < done.length; index++) {
    const element = done[index];
    document.getElementById("done").innerHTML += generateTodoHTML(element);
  }
}

function allowDrop(ev) {
  ev.preventDefault();
}

function moveTo(category) {
  todos[currentDraggedElement]["category"] = category;
  updateHTML();
}

function highlight(id) {
  document.getElementById(id).classList.add("drag-area-highlight");
}

function removeHighlight(id) {
  document.getElementById(id).classList.remove("drag-area-highlight");
}

function checkTaskAreaDisplayEmpty() {
  let dragAreas = document.getElementsByClassName("drag-area");

  for (let i = 0; i < dragAreas.length; i++) {
    let dragArea = dragAreas[i];

    if (dragArea.children.length === 0) {
      dragArea.innerHTML = /*html*/ `<div class="drag-area-empty">No tasks To do</div>`
    }
  }
}
