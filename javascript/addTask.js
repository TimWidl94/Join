async function init() {
  await includeHTML();
  await loadData();
  await loadUser();
  setUserInitials();
  setColorToActive(
    "sidebarAddTask",
    "addTask-img",
    "bottomBarAddTaskMobile",
    "addTaskImgMobile"
  );
  await renderAddTask();
  await renderSubTask();
  showTaskForm();
}

let tasks = [];
let subtasks = [];
let selectedContacts = [];

let contactColors = [
  "#FF7A00",
  "#9327FF",
  "#6E52FF",
  "#FC71FF",
  "#FFBB2B",
  "#1FD7C1",
  "#462F8A",
  "#FF4646",
];
let letters = [];
let selectedPrio;

/*Popup function */

function renderAddTask() {
  content = document.getElementById("main");
  content.innerHTML = addTaskHtml();
}

function renderSubTask() {
  let container = document.getElementById("subtasks");
  container.innerHTML += subTaskInputHtml();
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
    addTaskPopup.classList.remove("slide-out");
    addTaskPopup.classList.add("d-none");
  }, 900);
}

function addTask() {
  let taskTitle = document.getElementById("taskTitle").value;
  let taskDescription = document.getElementById("taskDescription").value;
  let taskDueDate = document.getElementById("myDateInput").value; // braucht noch funktion dass vergangene Tage nicht anklickbar sind
  // prio muss noch hinzugefügt werden
  let categorySelect = document.getElementById("category-options");
  let selectedCategory = categorySelect.value;
  tasks.push({
    taskTitle: taskTitle,
    taskDescription: taskDescription,
    taskDueDate: taskDueDate,
    selectedCategory: selectedCategory,
    prio: selectedPrio,
    subtasks: subtasks,
    selectedContacts: selectedContacts,
  });
  console.log(tasks);
}

function addSubTask() {
  let subTaskInput = document.getElementById("subTaskInput").value;
  let subTaskError = document.getElementById("subTaskError");
  let nr = subtasks.length;
  if (subTaskInput == 0) {
    subTaskError.innerHTML = /*HTML*/ `
    Subtask bitte bei Bedarf hinzufügen.`;
  } else {
    subTaskError.innerHTML = /*HTML*/ ``;
    subtasks.push({
      subTaskInput: subTaskInput,
      id: nr,
    });
    document.getElementById("subTaskInput").value = "";
    renderGeneratedSubTasks();
    resetSubTaskInputField();
  }
}

function renderGeneratedSubTasks() {
  let container = document.getElementById("subTaskContainer");
  container.innerHTML = ``;
  for (let i = 0; i < subtasks.length; i++) {
    let id = subtasks[i]["id"];
    container.innerHTML += subTasksValueHtml(id, i);
  }
}

function renderSelectedContacts() {
  let content = document.getElementById("basic-info-wrapper");
  content.innerHTML = "";

  for (let i = 0; i < contacts.length; i++) {
    const contact = contacts[i];
    const firstLetter = contact.name.charAt(0);

    if (!letters.includes(firstLetter)) {
      letters.push(firstLetter);
    }
  }
  sortLetters();
  renderLetters();
}

function findSubtaskPosition(id) {
  let nr = subtasks.findIndex((obj) => obj.id === id);
  return nr;
}

function editSubTask(id) {
  let container = document.getElementById(id);
  let nr = findSubtaskPosition(id);
  let textContent = subtasks[nr]["subTaskInput"];
  container.innerHTML = /*html*/ `
<input id="editSubTaskInput" type="text" placeholder=${textContent} value=${textContent} />
<div class="editSubTaskButtonBox">
<img src="assets/img/icons/delete.svg" alt="Clear Icon" class="inputImgTrash" onclick="deleteSubTask(${id})"/>
<img src="assets/img/icons/check_black.svg" alt="check" class="inputImgTrash" onclick="addEditSubTask(${id})"/>
</div>`;
}

function addEditSubTask(i) {
  let subTaskInput = document.getElementById("editSubTaskInput");
  subtasks[i].subTaskInput = subTaskInput.value;
  renderGeneratedSubTasks();
}

function showTaskForm() {
  let assignedTo = document.getElementById("assignedTo");
  assignedTo.innerHTML = /*html*/ `
    <div name="assigned" onchange="addAssignedContact()">
    <div class=" dropdown" onclick="openDropDown()" style="border-color: rgb(41, 171, 226);">
                                Select contacts to assign <img id="dropdownImgArrow" class="" src="../assets/img/AddTask/arrow_drop.svg" alt="">
                              </div>
    </div>
    <div id="assignedDropdown">
      <div id="assignedAddedContacts"></div>
    </div>
    `;

  for (let i = 0; i < contacts.length; i++) {
    let currentUser = contacts[i]["name"];
    let assignedDropdown = document.getElementById("assignedDropdown");
    assignedDropdown.innerHTML += /*html*/ `
      <div id="user-${i}" class="flex-checkbox selected-profile" onclick="addAssignedContact(${i})" data-value="${currentUser}">${currentUser}<img id="checkBox-${i}" src="assets/img/icons/checkBox.svg" alt=""></div>`;
  }
}

function openDropDown() {
  let assignedDropdown = document.getElementById("assignedDropdown");
  let dropdownImgArrow = document.getElementById("dropdownImgArrow");
  assignedDropdown.classList.toggle("d-none");
  assignedDropdown.classList.toggle("dropbtn");
  dropdownImgArrow.classList.toggle("rotate-arrow");
}

function addAssignedContact(i) {
  let assignedDropdown = document.getElementById(`user-${i}`);
  let checkboxImage = document.getElementById(`checkBox-${i}`);
  let selectedContact = assignedDropdown.getAttribute("data-value");
  renderContactList(assignedDropdown, checkboxImage, selectedContact);

  renderSelectedContacts();
}

function renderContactList(assignedDropdown, checkboxImage, selectedContact) {
  if (selectedContact !== "1") {
    assignedDropdown.classList.toggle("addTask-selected");

    const index = selectedContacts.indexOf(selectedContact);
    if (assignedDropdown.classList.contains("addTask-selected")) {
      if (index === -1) {
        selectedContacts.push(selectedContact);
      }
      checkboxImage.src = "./assets/img/icons/check_button-white.svg";
    } else {
      if (index !== -1) {
        selectedContacts.splice(index, 1);
      }
      checkboxImage.src = "./assets/img/icons/checkBox.svg";
    }
  }
}

function renderSelectedContacts() {
  let content = document.getElementById("assignedAddedContact");
  content.innerHTML = "";

  for (let i = 0; i < selectedContacts.length; i++) {
    const contact = selectedContacts[i];
    const initials = getInitials(contact);
    content.innerHTML += `<div class="assinged-contact-profile selected-profile" onclick="deleteSelectedContact(${i})">${initials}</div>`;
  }
}

function setBackgroundColor(i) {
  return contactColors[i % contactColors.length];
}

function deleteSelectedContact(i) {
  selectedContacts.splice(i, 1);
  renderSelectedContacts();
}

function getInitials(contact) {
  const nameParts = contact.split(" ");
  let initials = "";
  for (let i = 0; i < nameParts.length; i++) {
    initials += nameParts[i][0];
  }
  return initials.toUpperCase();
}

function deleteSubTask(number) {
  let nr = findSubtaskPosition(number);

  subtasks.splice(nr, 1);
  subTaskContainer = document.getElementById("subTaskContainer");
  subTaskContainer.innerHTML = ``;
  for (let i = 0; i < subtasks.length; i++) {
    let nr = subtasks[i]["id"];
    subTaskContainer.innerHTML += /*HTML*/ `<div id="${nr}" class="subtask-div-list">${subtasks[i]["subTaskInput"]}
    <div><img class="subtask-div-btn" onclick="editSubTask(${nr})" src="./assets/img/icons/edit.svg" alt="">
    <img class="subtask-div-btn" onclick="deleteSubTask(${nr})" src="./assets/img/icons/delete.svg" alt=""></div>
    </div>`;
  }
}

function clearInputValue() {
  renderAddTask();
  showTaskForm();
}

function changeButtonsAddTask() {
  let inputField = document.getElementById("inputFieldBox");

  inputField.innerHTML = /*html*/ `
    <input id="subTaskInput" type="text" placeholder="Add new subtask" onclick="" class="PosRel" />
    <div class="subTaskInputButtons">
      <img class="subTaskInputImg" onclick="setValueBack('subTaskInput')" src="./assets/img/icons/close.svg" alt="">
      <img class="subTaskInputImg checkImg" onclick="addSubTask()" src="./assets/img/icons/checkAddTask.svg" alt="">
    </div>
  `;
  document.getElementById("subTaskInput").focus();
}

function setValueBack(id) {
  let inputField = document.getElementById(id);
  inputField.value = ``;
  resetSubTaskInputField();
}

function resetSubTaskInputField() {
  let inputContainer = document.getElementById("inputFieldBox");
  inputContainer.innerHTML = subTaskInputFieldHtml();
}

function changePrioToMedium(idContainer, idImg) {
  let prioContainer = document.getElementById(idContainer);
  let img = document.getElementById(idImg);
  prioContainer.classList.add("priorityMediumActive");
  img.src = "./assets/img/addTask/mediumPrioSign.svg";
  selectedPrio = "medium";
  document
    .getElementById("urgentContainer")
    .classList.remove("priorityUrgentActive");
  document.getElementById("urgentImg").src =
    "./assets/img/addTask/ArrowUpPrioSign.svg";
  document.getElementById("lowContainer").classList.remove("priorityLowActive");
  document.getElementById("lowImg").src =
    "./assets/img/addTask/ArrowDownPrioSign.svg";
}

function changePrioToUrgent(idContainer, idImg) {
  let prioContainer = document.getElementById(idContainer);
  let img = document.getElementById(idImg);
  prioContainer.classList.add("priorityUrgentActive");
  img.src = "./assets/img/addTask/urgentPrioActive.svg";
  selectedPrio = "urgent";
  document
    .getElementById("mediumContainer")
    .classList.remove("priorityMediumActive");
  document.getElementById("mediumImg").src =
    "./assets/img/addTask/mediumPrioSignInactive.svg";
  document.getElementById("lowContainer").classList.remove("priorityLowActive");
  document.getElementById("lowImg").src =
    "./assets/img/addTask/ArrowDownPrioSign.svg";
}

function changePrioToLow(idContainer, idImg) {
  let prioContainer = document.getElementById(idContainer);
  let img = document.getElementById(idImg);
  prioContainer.classList.add("priorityLowActive");
  img.src = "./assets/img/addTask/lowPrioActive.svg";
  selectedPrio = "low";
  document
    .getElementById("urgentContainer")
    .classList.remove("priorityUrgentActive");
  document.getElementById("urgentImg").src =
    "./assets/img/addTask/ArrowUpPrioSign.svg";
  document
    .getElementById("mediumContainer")
    .classList.remove("priorityMediumActive");
  document.getElementById("mediumImg").src =
    "./assets/img/addTask/mediumPrioSignInactive.svg";
}
