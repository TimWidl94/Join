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
let selectedCategories = [];
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

async function addTask() {
  let taskTitle = document.getElementById('taskTitle').value;
  let taskDescription = document.getElementById('taskDescription').value;
  let taskDueDate = document.getElementById('myDateInput').value;

  let selectedCategoryElement = document.getElementById('showSelectedCategory');
  let selectedCategory = selectedCategoryElement.getAttribute('data-value');

  tasks.push({
    taskTitle: taskTitle,
    taskDescription: taskDescription,
    taskDueDate: taskDueDate,
    selectedCategory: selectedCategory,
    prio: selectedPrio,
    subtasks: subtasks,
    selectedContacts: selectedContacts,
    currentState: "toDo",
  });
  await setItem("tasks", JSON.stringify(tasks));
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
      <div id="dropdown" class="dropdown" onclick="openDropDown()">
        <input class="contact-searchbar" onkeyup="filterAddTaskContact()" type="text" id="search" placeholder="Select contacts to assign" />
        <img id="dropdownImgArrow" class="rotate-arrow" src="../assets/img/AddTask/arrow_drop.svg" alt="">
      </div>
    </div>
    <div id="assignedDropdown" class="d-none">
      <div id="assignedAddedContacts"></div>
    </div>
  `;

  for (let i = 0; i < contacts.length; i++) {
    let currentUser = contacts[i]["name"];
    let initials = getInitials(currentUser);
    let color = contacts[i]["color"];
    let assignedDropdown = document.getElementById("assignedDropdown");
    assignedDropdown.innerHTML += /*html*/ `
      <div id="user-${i}" class="flex-checkbox selected-profile" onclick="addAssignedContact(${i}, '${color}')" data-value="${currentUser}">
        <div class="assigned-contact-profile selected-profile"><div class="assinged-contact-profile" style="background-color:${color}">${initials}</div>
        <span class="assigned-name">${currentUser}</span></div>
        <img id="hoverCheckbox" class="hover-checkbox" src="assets/img/icons/checkBoxWhite.svg" alt="">
        <img id="checkBox-${i}" class="flex-checkbox-img"src="assets/img/icons/checkBox.svg" alt="">
      `;
  }
}

function filterAddTaskContact() {
  let searchTerm = document.getElementById("search").value.toLowerCase();
  let assignedDropDown = document.getElementById("assignedDropdown");
  assignedDropDown.innerHTML = "";

  if (searchTerm === "") {
    renderAllContacts(contacts); 
    assignedDropDown.classList.remove("d-none");
  } else {
    const filteredContacts = contacts.filter(contact => contact.name.toLowerCase().startsWith(searchTerm));
    renderAllContacts(filteredContacts);

    if (filteredContacts.length === 0) {
      assignedDropDown.classList.add("d-none");
    } else {
      assignedDropDown.classList.remove("d-none");
    }
  }
}




function renderAllContacts(contactList) {
  for (let i = 0; i < contactList.length; i++) {
    let currentUser = contactList[i]["name"];
    let initials = getInitials(currentUser);
    let assignedDropdown = document.getElementById("assignedDropdown");
    assignedDropdown.innerHTML += /*html*/ `
      <div id="user-${i}" class="flex-checkbox selected-profile" onclick="addAssignedContact(${i})" data-value="${currentUser}">
        <div class="assigned-contact-profile selected-profile" onclick="deleteSelectedContact(${i})">${initials}</div>
        ${currentUser}
        <img id="checkBox-${i}" src="assets/img/icons/checkBox.svg" alt="">
      </div>`;

  }
  document.getElementById('contactInitials').innerHTML = getInitials(contactList[0]["name"]);
}


function openDropDown() {
  let assignedDropdown = document.getElementById("assignedDropdown");
  let dropdownImgArrow = document.getElementById("dropdownImgArrow");

  assignedDropdown.classList.toggle('d-none');
  dropdown.classList.toggle('border-active');
  assignedDropdown.classList.toggle('dropbtn');
  dropdownImgArrow.classList.toggle('rotate-arrow');

}

function openDropDownCategory() {
  let assignedDropdownCategory = document.getElementById("assignedDropdownCategory");
  let dropdownImgArrowCategory = document.getElementById("dropdownImgArrowCategory");
  dropdownCategory.classList.toggle('border-active');
  assignedDropdownCategory.classList.toggle('d-none');
  dropdownImgArrowCategory.classList.toggle('rotate-arrow');
}


function addAssignedContact(i, color) {
  let assignedDropdown = document.getElementById(`user-${i}`);
  let checkboxImage = document.getElementById(`checkBox-${i}`);

  let selectedContact = assignedDropdown.getAttribute('data-value');
  renderContactList(assignedDropdown, checkboxImage, selectedContact, color);

  renderSelectedContacts();
}

function renderContactList(assignedDropdown, checkboxImage, selectedContact, color) {
  if (selectedContact !== "1") {
    assignedDropdown.classList.toggle("addTask-selected");

    const index = selectedContacts.findIndex(contact => contact.name === selectedContact && contact.color === color);
    let hoverCheckbox = document.getElementById("hover-checkbox");
    if (assignedDropdown.classList.contains('addTask-selected')) {
      if (index === -1) {
        selectedContacts.push({ name: selectedContact, color: color });
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


function renderSelectedContacts(i) {
  let content = document.getElementById('assignedAddedContact');
  content.innerHTML = '';

  for (let i = 0; i < selectedContacts.length; i++) {
    let contact = selectedContacts[i];
    let initials = getInitials(contact.name);
    let color = contact["color"];
    content.innerHTML += `<div class="assinged-contact-overview" style="background-color:${color}">${initials}</div>`
  }
}


function getInitials(contactName) {
  const nameParts = contactName.split(" ");
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

function selectCategory(category) {
  const userStory = document.getElementById("userStory");
  const other = document.getElementById("other");
  const showSelectedCategory = document.getElementById("showSelectedCategory");
  const assignedDropdownCategory = document.getElementById("assignedDropdownCategory");
  selectCategoryIfElse(userStory, other, showSelectedCategory, assignedDropdownCategory, category);
}

function selectCategoryIfElse(userStory, other, showSelectedCategory, assignedDropdownCategory, category) {
  if (category === "user-story") {
    userStory.classList.add("category-selected");
    other.classList.remove("category-selected");
    showSelectedCategory.setAttribute("data-value", category);
    showSelectedCategory.innerHTML = `User Story`;
    assignedDropdownCategory.classList.add("d-none");
  } else if (category === "other") {
    other.classList.add("category-selected");
    userStory.classList.remove("category-selected");
    showSelectedCategory.setAttribute("data-value", category);
    showSelectedCategory.innerHTML = `Other`;
    assignedDropdownCategory.classList.add("d-none");
  } else {
    userStory.classList.remove("category-selected");
    other.classList.remove("category-selected");
    showSelectedCategory.setAttribute("data-value", "");
    showSelectedCategory.innerHTML = `Select task category`;
  }
}



function changeButtonsAddTask(){
  let inputField = document.getElementById('inputFieldBox');
  
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
