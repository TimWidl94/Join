let todos = [
  {
    id: 0,
    title: 'Putzen',
    category: 'todo',
  },
  {
    id: 1,
    title: 'Kochen',
    category: 'todo',
  },
  {
    id: 2,
    title: 'Einkaufen',
    category: 'done',
  },
  {
    id: 3,
    title: 'Einkaufen',
    category: 'inProgress',
  },
  {
    id: 4,
    title: 'Einkaufen',
    category: 'awaitFeedback',
  },
];
let currentDraggedElement;

async function init() {
  await loadData();
  await loadUser();
  await updateHTML();
  await includeHTML();
  setUserInitials();
  setColorToActive('sidebarBoard', 'board-img', 'bottomBarBoardMobile', 'boardImgMobile');
}

function openAddTaskPopup() {
  document.getElementById('addTaskPopup').classList.remove('d-none');
  document.getElementById('addTaskPopup').classList.add('slide-in');
}

function closeAddTaskPopup() {
  let addTaskPopup = document.getElementById('addTaskPopup');
  addTaskPopup.classList.remove('slide-in');
  addTaskPopup.classList.add('slide-out');

  setTimeout(function () {
    addTaskPopup.classList.add('d-none');
  }, 500);
  setTimeout(function () {
    addTaskPopup.classList.remove('slide-out');
  }, 900);
}

function startDragging(id) {
  currentDraggedElement = id;
}

function updateHTML() {
  todoAreaUpdate();
  inProgressUdate();
  feedbackAreaUdate();
  doneUpdate();
  checkTaskAreaDisplayEmpty();
  renderBoardTasks();
}

function todoAreaUpdate() {
  let todo = tasks.filter((t) => t['selectedCategory'] == 'todo');

  document.getElementById('todo').innerHTML = '';

  for (let index = 0; index < todo.length; index++) {
    const element = todo[index];
    document.getElementById('todo').innerHTML += generateTodoHTML(element);
  }
}

function inProgressUdate() {
  let inProgress = tasks.filter((t) => t['selectedCategory'] == 'inProgress');

  document.getElementById('inProgress').innerHTML = '';

  for (let index = 0; index < inProgress.length; index++) {
    const element = inProgress[index];
    document.getElementById('inProgress').innerHTML += generateTodoHTML(element);
  }
}

function feedbackAreaUdate() {
  let awaitFeedback = tasks.filter((t) => t['selectedCategory'] == 'awaitFeedback');

  document.getElementById('awaitFeedback').innerHTML = '';

  for (let index = 0; index < awaitFeedback.length; index++) {
    const element = awaitFeedback[index];
    document.getElementById('awaitFeedback').innerHTML += generateTodoHTML(element);
  }
}

function doneUpdate() {
  let done = tasks.filter((t) => t['selectedCategory'] == 'done');

  document.getElementById('done').innerHTML = '';

  for (let index = 0; index < done.length; index++) {
    const element = done[index];
    document.getElementById('done').innerHTML += generateTodoHTML(element);
  }
}

function allowDrop(ev) {
  ev.preventDefault();
}

function moveTo(category) {
  tasks[currentDraggedElement]['currentState'] = category;
  updateHTML();
}

function highlight(id) {
  document.getElementById(id).classList.add('drag-area-highlight');
}

function removeHighlight(id) {
  document.getElementById(id).classList.remove('drag-area-highlight');
}

function checkTaskAreaDisplayEmpty() {
  let dragAreas = document.getElementsByClassName('drag-area');

  for (let i = 0; i < dragAreas.length; i++) {
    let dragArea = dragAreas[i];

    if (dragArea.children.length === 0) {
      dragArea.innerHTML = /*html*/ `<div class="drag-area-empty">No tasks To do</div>`;
    }
  }
}

async function renderBoardTasks(){
  renderToDoTasks();
  renderInProgressTasks();
  renderAwaitFeedbackTasks();
  renderDoneTasks();
  await setItem("tasks", JSON.stringify(tasks));
}

function renderToDoTasks(){
  let contentBoxToDo = document.getElementById('todo');
  for (let i = 0; i < tasks.length; i++) {
    if(tasks[i]['currentState'] == 'toDo'){
      contentBoxToDo.innerHTML += generateTodoHTML(i);
    } else{console.log('dont work')}
  } 
}

function renderInProgressTasks(){
  let contentBoxToDo = document.getElementById('inProgress');
  for (let i = 0; i < tasks.length; i++) {
    if(tasks[i]['currentState'] == 'inProgress'){
      contentBoxToDo.innerHTML += generateTodoHTML(i);
    } else{console.log('dont work')}
  } 
}

function renderAwaitFeedbackTasks(){
  let contentBoxToDo = document.getElementById('awaitFeedback');
  for (let i = 0; i < tasks.length; i++) {
    if(tasks[i]['currentState'] == 'awaitFeedback'){
      contentBoxToDo.innerHTML += generateTodoHTML(i);
    } else{console.log('dont work')}
  } 
}

function renderDoneTasks(){
  let contentBoxToDo = document.getElementById('done');
  for (let i = 0; i < tasks.length; i++) {
    if(tasks[i]['currentState'] == 'done'){
      contentBoxToDo.innerHTML += generateTodoHTML(i);
    } else{console.log('dont work')}
  } 
}