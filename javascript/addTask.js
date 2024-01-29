async function init() {
  await loadData();
  await loadUser();
  setUserInitials();
  showTaskForm();
  setColorToActive('sidebarAddTask');
}
let tasks = [{}];
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
    tasks.push({
      subTaskInput: subTaskInput,
    });
    document.getElementById('subTaskInput').value = '';

    //need iteration
    subTaskContainer.innerHTML += /*HTML*/ `<div id="" class="subtask-div-list">${subTaskInput}
    <div><img class="subtask-div-btn" onclick="editSubTask()" src="./assets/img/icons/edit.svg" alt="">
    <img class="subtask-div-btn" onclick="deleteSubTask()" src="./assets/img/icons/delete.svg" alt=""></div>
    </div>`;
  }
  //add lear input
  //push into array is missing
  //add delete and edit funktion
}

function deleteSubTask() {}

function editSubTask() {}

function showTaskForm() {
  let assignedTo = document.getElementById('assignedTo');

  assignedTo.innerHTML = /*html*/ `
    <select name="assigned" id="assignedDropdown">
      <option value="1">Select contacts to assign</option>
    </select>`;

  for (let i = 0; i < users.length; i++) {
    let currentUser = users[i].username;

    let assignedDropdown = document.getElementById('assignedDropdown');
    assignedDropdown.innerHTML += /*html*/ `
      <option value="">${currentUser}</option>`;
  }
}
