async function init() {
  await loadData();
  await loadUser();
  setUserInitials();
  showTaskForm();
  setColorToActive('sidebarAddTask', 'addTask-img', 'bottomBarAddTaskMobile', 'addTaskImgMobile');
}
let tasks = [];
let subtasks = [];
/*Popup function */

function openAddTaskPopup() {
  document.getElementById('addTaskPopup').classList.remove('d-none');
  document.getElementById('addTaskPopup').classList.add('slide-in');
}

function closeAddTaskPopup() {
  let addTaskPopup = document.getElementById('addTaskPopup');
  addTaskPopup.classList.remove('slide-in');
  addTaskPopup.classList.add('slide-out');

  setTimeout(function () {
    addTaskPopup.classList.remove('slide-out');
    addTaskPopup.classList.add('d-none');
  }, 900);
}

function addTask() {
  let taskTitle = document.getElementById('taskTitle').value;
  let taskDescription = document.getElementById('taskDescription').value;
  let taskDueDate = document.getElementById('myDateInput').value; // braucht noch funktion dass vergangene Tage nicht anklickbar sind
  // prio muss noch hinzugefügt werden
  let categorySelect = document.getElementById('category-options');
  let selectedCategory = categorySelect.value;
  tasks.push({
    taskTitle: taskTitle,
    taskDescription: taskDescription,
    taskDueDate: taskDueDate,
    selectedCategory: selectedCategory,
    subtasks: subtasks,
  });
  console.log(tasks);
}

function addSubTask() {
  let subTaskContainer = document.getElementById('subTaskContainer');
  let subTaskInput = document.getElementById('subTaskInput').value;
  let subTaskError = document.getElementById('subTaskError');
  if (subTaskInput == 0) {
    subTaskError.innerHTML = /*HTML*/ `
    Subtask bitte bei Bedarf hinzufügen.`;
  } else {
    subTaskError.innerHTML = /*HTML*/ ``;
    subtasks.push({
      subTaskInput: subTaskInput,
    });
    document.getElementById('subTaskInput').value = '';
    let nr = subtasks.length -1;
    //need iteration
    subTaskContainer.innerHTML += /*HTML*/ `<div id="${nr}" class="subtask-div-list">${subTaskInput}
    <div><img class="subtask-div-btn" onclick="editSubTask()" src="./assets/img/icons/edit.svg" alt="">
    <img class="subtask-div-btn" onclick="deleteSubTask(${nr})" src="./assets/img/icons/delete.svg" alt=""></div>
    </div>`;
  }
  //add lear input
  //push into array is missing
  //add delete and edit funktion
}

function deleteSubTask(Number) {
subtasks.splice(Number, 1);
subTaskContainer = document.getElementById('subTaskContainer');
subTaskContainer.innerHTML = ``;
for (let i = 0; i < subtasks.length; i++) {
  let nr = subtasks.length -1;
  subTaskContainer.innerHTML += /*HTML*/ `<div id="${nr}" class="subtask-div-list">${subtasks[i]["subTaskInput"]}
  <div><img class="subtask-div-btn" onclick="editSubTask()" src="./assets/img/icons/edit.svg" alt="">
  <img class="subtask-div-btn" onclick="deleteSubTask(${nr})" src="./assets/img/icons/delete.svg" alt=""></div>
  </div>`
}
}

function editSubTask() {}

function showTaskForm() {
  let assignedTo = document.getElementById('assignedTo');

  assignedTo.innerHTML = /*html*/ `
    <select name="assigned" id="assignedDropdown">
      <option value="1">Select contacts to assign</option>
    </select>`;

  for (let i = 0; i < contacts.length; i++) {
    let currentUser = contacts[i]["name"];

    let assignedDropdown = document.getElementById('assignedDropdown');
    assignedDropdown.innerHTML += /*html*/ `
      <option value="">${currentUser}</option>`;
  }
}

function clearInputValue(){
  let titel = document.getElementById('taskTitle')
  let description = document.getElementById('taskDescription')
  let assignedTo = document.getElementById('')
  let dueDate = document.getElementById('')
  let prio = document.getElementById('')
  let category = document.getElementById('')
  let subtasks = document.getElementById('')
}