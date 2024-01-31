async function init() {
  await includeHTML()
  await loadData();
  await loadUser();
  setUserInitials();
  setColorToActive('sidebarAddTask', 'addTask-img', 'bottomBarAddTaskMobile', 'addTaskImgMobile');
  await renderAddTask();
  showTaskForm();
}

let tasks = [];
let subtasks = [];
let selectedContacts = [];

let contactColors = ['#FF7A00', '#9327FF', '#6E52FF', '#FC71FF', '#FFBB2B', '#1FD7C1', '#462F8A', '#FF4646'];
let letters = [];

/*Popup function */

function renderAddTask() {
  content = document.getElementById('main');
  content.innerHTML = addTaskHtml();
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
    selectedContacts: selectedContacts,
  });
  console.log(tasks);
}

function addSubTask() {
  let subTaskInput = document.getElementById('subTaskInput').value;
  let subTaskError = document.getElementById('subTaskError');
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
    document.getElementById('subTaskInput').value = '';
    renderSubTask();
  }
}

function renderSubTask() {
  let container = document.getElementById('subTaskContainer');
  container.innerHTML = ``;
  for (let i = 0; i < subtasks.length; i++) {
    let id = subtasks[i]["id"];
    container.innerHTML += subTaskHtml(id, i);
  }
}

function renderSelectedContacts() {
  let content = document.getElementById('basic-info-wrapper');
  content.innerHTML = '';

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
  let nr = subtasks.findIndex(obj => obj.id === id)
  return nr;
}

function editSubTask(id) {
  let container = document.getElementById(id);
  let nr = findSubtaskPosition(id);
  let textContent = subtasks[nr]["subTaskInput"]
  container.innerHTML = /*html*/ `
<input id="editSubTaskInput" type="text" placeholder=${textContent} value=${textContent} />
<div class="editSubTaskButtonBox">
<img src="assets/img/icons/delete.svg" alt="Clear Icon" class="inputImgTrash" onclick="deleteSubTask(${id})"/>
<img src="assets/img/icons/check_black.svg" alt="check" class="inputImgTrash" onclick="addEditSubTask(${id})"/>
</div>`
}

function addEditSubTask(i) {
  let subTaskInput = document.getElementById('editSubTaskInput');
  subtasks[i].subTaskInput = subTaskInput.value;
  renderSubTask()
}


function showTaskForm() {
  let assignedTo = document.getElementById('assignedTo');
  assignedTo.innerHTML = /*html*/ `
    <div name="assigned" onchange="addAssignedContact()">
      <div id="dropdown" class="dropdown" onclick="openDropDown()">
      <input class="contact-searchbar" onkeyup="filterAddTaskContact()" type="text" id="search" placeholder="Select contacts to assgin" />
        <img id="dropdownImgArrow" class="rotate-arrow" src="../assets/img/AddTask/arrow_drop.svg" alt="">
      </div>
    </div>
    <div id="assignedDropdown" class="d-none">
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
    let assignedDropdown = document.getElementById("assignedDropdown");
    assignedDropdown.innerHTML += /*html*/ `
      <div id="user-${i}" class="flex-checkbox selected-profile" onclick="addAssignedContact(${i})" data-value="${currentUser}">${currentUser}<img id="checkBox-${i}" src="assets/img/icons/checkBox.svg" alt=""></div>`;
  }
}



function openDropDown() {
  let assignedDropdown = document.getElementById("assignedDropdown");
  let dropdownImgArrow = document.getElementById("dropdownImgArrow");
  let dropdown = document.getElementById("dropdown");

  assignedDropdown.classList.toggle('d-none');
  dropdown.classList.toggle('border-active');
  assignedDropdown.classList.toggle('dropbtn');
  dropdownImgArrow.classList.toggle('rotate-arrow');
}




function openDropDownCategory() {
  let assignedDropdown = document.getElementById("assignedDropdown");
  let dropdownImgArrow = document.getElementById("dropdownImgArrow");
  assignedDropdown.classList.toggle('d-none');
  assignedDropdown.classList.toggle('dropbtn');
  dropdownImgArrow.classList.toggle('rotate-arrow');
}

function addAssignedContact(i) {
  let assignedDropdown = document.getElementById(`user-${i}`);
  let checkboxImage = document.getElementById(`checkBox-${i}`);
  let selectedContact = assignedDropdown.getAttribute('data-value');
  renderContactList(assignedDropdown, checkboxImage, selectedContact);


  renderSelectedContacts();
}

function renderContactList(assignedDropdown, checkboxImage, selectedContact) {
  if (selectedContact !== "1") {
    assignedDropdown.classList.toggle('addTask-selected');

    const index = selectedContacts.indexOf(selectedContact);
    if (assignedDropdown.classList.contains('addTask-selected')) {
      if (index === -1) {
        selectedContacts.push(selectedContact);
      }
      checkboxImage.src = './assets/img/icons/check_button-white.svg';
    } else {
      if (index !== -1) {
        selectedContacts.splice(index, 1);
      }
      checkboxImage.src = './assets/img/icons/checkBox.svg';
    }
  }
}

function renderSelectedContacts() {
  let content = document.getElementById('assignedAddedContact');
  content.innerHTML = '';

  for (let i = 0; i < selectedContacts.length; i++) {
    const contact = selectedContacts[i];
    const initials = getInitials(contact);
    content.innerHTML += `<div class="assinged-contact-profile selected-profile" onclick="deleteSelectedContact(${i})">${initials}</div>`
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
  subTaskContainer = document.getElementById('subTaskContainer');
  subTaskContainer.innerHTML = ``;
  for (let i = 0; i < subtasks.length; i++) {
    let nr = subtasks[i]["id"];
    subTaskContainer.innerHTML += /*HTML*/ `<div id="${nr}" class="subtask-div-list">${subtasks[i]["subTaskInput"]}
    <div><img class="subtask-div-btn" onclick="editSubTask(${nr})" src="./assets/img/icons/edit.svg" alt="">
    <img class="subtask-div-btn" onclick="deleteSubTask(${nr})" src="./assets/img/icons/delete.svg" alt=""></div>
    </div>`
  }
}

function clearInputValue() {
  renderAddTask();
  showTaskForm();
}