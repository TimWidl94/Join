async function init() {
  await includeHTML();
  await loadData();
  await loadUser();
  setUserInitials();
  setColorToActive('sidebarAddTask', 'addTask-img', 'bottomBarAddTaskMobile', 'addTaskImgMobile');
  await renderAddTask();
  await renderSubTask();
  await showTaskForm('assignedTo');
  changePrioToMedium('mediumContainer', 'mediumImg');
}

let tasks = [];
let subtasks = [];
let selectedContacts = [];
let filteredContacts = [];
let selectedCategories = [];
let selectedPrio;
let categoryIsSelected = false;

/*Popup function */

function renderAddTask() {
  let contentMain = document.getElementById('main');
  let contentBoardTask = document.getElementById('boardAddTask');

  if (contentMain) {
    contentMain.innerHTML = addTaskHtml('main');
  }

  if (contentBoardTask) {
    console.log('addTask Popup rendered');
    contentBoardTask.innerHTML = addTaskHtml('boardAddTask');
  }
}

function renderSubTask() {
  let container = document.getElementById('subtasks');
  container.innerHTML += subTaskInputHtml();
}

// function openAddTaskPopup() {
// document.getElementById('addTaskPopup').classList.remove('d-none');
// document.getElementById('addTaskPopup').classList.add('slide-in');
// }

// function closeAddTaskPopup() {
// let addTaskPopup = document.getElementById('addTaskPopup');
// addTaskPopup.classList.remove('slide-in');
// addTaskPopup.classList.add('slide-out');
//
// setTimeout(function () {
// addTaskPopup.classList.remove('slide-out');
// addTaskPopup.classList.add('d-none');
// }, 900);
// }

async function addTask() {
  console.log('tasks');
  await pushAddTask();
  clearInputValue();
  showPopUpAddedTaskToBoard();
}

async function pushAddTask() {
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
    currentState: 'toDo',
  });
  console.log('tasks');
  await setItem('tasks', JSON.stringify(tasks));
}

function addSubTask(idInput, idContainer) {
  let subTaskInput = document.getElementById(idInput).value;
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
      isActive: false,
    });
    document.getElementById(idInput).value = '';
    renderGeneratedSubTasks(idContainer);
    resetSubTaskInputField(idInput);
  }
}

function renderGeneratedSubTasks(idContainer) {
  let container = document.getElementById(idContainer);
  container.innerHTML = ``;

  for (let i = 0; i < subtasks.length; i++) {
    let id = subtasks[i]['id'];
    container.innerHTML += subTasksValueHtml(id, i);
  }
}

function findSubtaskPosition(id) {
  let nr = subtasks.findIndex((obj) => obj.id === id);
  if (nr == -1) {
    console.log('Number of Subtask not found!');
  }
  console.log('findSubtaskPosition nr:', nr);

  return nr;
}

function editSubTask(id) {
  console.log('editSubTask id:', id);
  let container = document.getElementById(id);
  let nr = findSubtaskPosition(id);
  let textContent = subtasks[nr]['subTaskInput'];
  container.innerHTML = /*html*/ `<div class="test-2">
<input id="editSubTaskInput" type="text" placeholder=${textContent} value=${textContent} />
<div class="editSubTaskButtonBox">
<img src="assets/img/icons/delete.svg" alt="Clear Icon" class="inputImgTrash" onclick="deleteSubTask(${id}, 'subTaskContainer')"/>
<span class="subTaskInputImg-vertical-edit"></span>
<img src="./assets/img/icons/checkAddTask.svg" alt="check" class="inputImgTrash" onclick="addEditSubTask(${id})"/>
</div>
</div>`;
}

function addEditSubTask(i) {
  let subTaskInput = document.getElementById('editSubTaskInput');
  subtasks[i].subTaskInput = subTaskInput.value;
  renderGeneratedSubTasks('subTaskContainer');
}

function showTaskForm(id) {
  let assignedTo = document.getElementById(id);
  assignedTo.innerHTML = /*html*/ `
    <div name="assigned" onchange="addAssignedContact()">
      <div id="dropdown" class="dropdown" onclick="openDropDown('assignedDropdown', 'dropdownImgArrow')">
        <input class="contact-searchbar" onkeyup="filterAddTaskContact()" type="text" id="search" placeholder="Select contacts to assign" />
        <img id="dropdownImgArrow" class="rotate-arrow dropdown-arrow-hover dropdown-arrow-hover" src="../assets/img/AddTask/arrow_drop.svg" alt="">
      </div>
    </div>
    <div id="assignedDropdown" class="d-none">
      <div id="assignedAddedContacts"></div>
      <!-- <div id="assignedAddedContactsEdit"></div> -->
    </div>
  `;

  for (let i = 0; i < contacts.length; i++) {
    let currentUser = contacts[i]['name'];
    let initials = getInitials(currentUser);
    let color = contacts[i]['color'];
    let assignedDropdown = document.getElementById('assignedDropdown');
    let username = checkForUserName();

    if (contacts[i]['name'] === username) {
      assignedDropdown.innerHTML += assignedToUserYouHtml(i, color, currentUser, initials);
    } else {
      assignedDropdown.innerHTML += assignedToUserHtml(i, color, currentUser, initials);
    }
  }
}

function filterAddTaskContact() {
  let searchTerm = document.getElementById('search').value.toLowerCase();
  let assignedDropdown = document.getElementById('assignedDropdown');
  assignedDropdown.innerHTML = '';

  if (searchTerm === '') {
    renderContacts(contacts);
    assignedDropdown.classList.remove('d-none');
  } else {
    const filteredContacts = contacts.filter((contact) => contact.name.toLowerCase().startsWith(searchTerm));
    renderFilteredContacts(filteredContacts);
    if (filteredContacts.length === 0) {
      assignedDropdown.classList.add('d-none');
    } else {
      assignedDropdown.classList.remove('d-none');
    }
  }
}

function renderContacts(contacts) {
  let assignedDropdown = document.getElementById('assignedDropdown');
  assignedDropdown.innerHTML = '';

  for (let i = 0; i < contacts.length; i++) {
    let currentUser = contacts[i]['name'];
    let initials = getInitials(currentUser);
    let color = contacts[i]['color'];
    assignedDropdown.innerHTML += assignedToUserHtml(i, color, currentUser, initials);
  }
}

function renderFilteredContacts(filteredContacts) {
  let assignedDropdown = document.getElementById('assignedDropdown');
  assignedDropdown.innerHTML = '';

  for (let i = 0; i < filteredContacts.length; i++) {
    let currentUser = filteredContacts[i]['name'];
    let initials = getInitials(currentUser);
    let color = filteredContacts[i]['color'];
    assignedDropdown.innerHTML += assignedToUserHtml(i, color, currentUser, initials);
  }
}

function openDropDown(idDropdown, idImgArrow) {
  let assignedDropdown = document.getElementById(idDropdown);
  let dropdownImgArrow = document.getElementById(idImgArrow);

  assignedDropdown.classList.toggle('d-none');
  // dropdown.classList.toggle('border-active');
  assignedDropdown.classList.toggle('dropbtn');
  dropdownImgArrow.classList.toggle('rotate-arrow');
}

function openDropDownCategory() {
  let assignedDropdownCategory = document.getElementById('assignedDropdownCategory');
  let dropdownImgArrowCategory = document.getElementById('dropdownImgArrowCategory');
  // dropdownCategory.classList.toggle('border-category-active');
  assignedDropdownCategory.classList.toggle('d-none');
  dropdownImgArrowCategory.classList.toggle('rotate-arrow');
}

async function addAssignedContact(i, color) {
  let assignedDropdown = document.getElementById('assignedDropdown');
  let selectedContact = contacts[i]['name'];
  let checkboxImage = document.getElementById(`checkBox-${i}`);
  let userID = document.getElementById(`user-${i}`);

  renderContactList(assignedDropdown, checkboxImage, userID, selectedContact, color);
  await renderSelectedContacts(i);
}

function renderContactList(assignedDropdown, checkboxImage, userID, selectedContact, color) {
  const index = selectedContacts.findIndex((contact) => contact.name === selectedContact && contact.color === color);
  if (!checkIfSelectedContactExist(selectedContact)) {
    assignedDropdown.classList.toggle('addTask-selected');
    if (!selectedContacts.includes(selectedContact)) {
      if (index === -1) {
        selectedContacts.push({
          name: selectedContact,
          color: color,
        });
      }
    }
    checkboxImage.src = './assets/img/icons/check_button-white.svg';
    userID.classList.add('selected-profile-active-item');
  } else {
    if (index !== -1) {
      selectedContacts.splice(index, 1);
    }
    checkboxImage.src = './assets/img/icons/checkBox.svg';
    userID.classList.remove('selected-profile-active-item');
    assignedDropdown.classList.toggle('addTask-selected');
  }
}

function checkIfSelectedContactExist(selectedContact) {
  for (let i = 0; i < selectedContacts.length; i++) {
    if (selectedContacts[i]['name'].includes(selectedContact)) {
      return true;
    }
  }
}

function renderSelectedContacts(i) {
  let content = document.getElementById('assignedAddedContact');
  content.innerHTML = '';

  for (let j = 0; j < selectedContacts.length; j++) {
    let contact = selectedContacts[j];
    let initials = getInitials(selectedContacts[j]['name']);
    let color = contact['color'];
    content.innerHTML += /*html*/ `<div class="assinged-contact-overview" style="background-color:${color}" onclick="removeSelectedContact(${i}, ${j})">${initials}</div>`;
  }
}

function getInitials(contactName) {
  const nameParts = contactName.split(' ');
  let initials = '';
  for (let i = 0; i < nameParts.length; i++) {
    initials += nameParts[i][0];
  }
  return initials.toUpperCase();
}

function deleteSubTask(number, idContainer) {
  let nr = findSubtaskPosition(number);
  console.log('subtasks idContainer:', idContainer);
  console.log('subtasks befor delete:', subtasks);
  subtasks.splice(nr, 1);
  console.log('subtasks after delete:', subtasks);
  subTaskContainer = document.getElementById(idContainer);
  subTaskContainer.innerHTML = ``;
  for (let i = 0; i < subtasks.length; i++) {
    let nr = subtasks[i]['id'];
    subTaskContainer.innerHTML += subtasksAfterDeletionHtml(i, nr, idContainer);
  }
}

function clearInputValue() {
  renderAddTask();
  showTaskForm('assignedTo');
  changePrioToMedium('mediumContainer', 'mediumImg');
}

async function showPopUpAddedTaskToBoard() {
  let popup = document.getElementById('addedTaskToBoard');
  popup.classList.remove('d-none');
  await setTimeout(() => moveToCenter(popup), 200);
  setTimeout(() => (window.location.href = './board.html'), 3000);
}

function moveToCenter(popup) {
  popup.classList.add('moveToCenterAddTask');
}

function selectCategory(category) {
  const userStory = document.getElementById('userStory');
  const other = document.getElementById('other');
  const showSelectedCategory = document.getElementById('showSelectedCategory');
  const assignedDropdownCategory = document.getElementById('assignedDropdownCategory');
  selectCategoryIfElse(userStory, other, showSelectedCategory, assignedDropdownCategory, category);
  checkIfFormIsFilled();
}

function selectCategoryIfElse(userStory, other, showSelectedCategory, assignedDropdownCategory, category) {
  if (category === 'user-story') {
    userStory.classList.add('category-selected');
    other.classList.remove('category-selected');
    showSelectedCategory.setAttribute('data-value', category);
    showSelectedCategory.innerHTML = `User Story`;
    assignedDropdownCategory.classList.add('d-none');
    categoryIsSelected = true;
  } else if (category === 'other') {
    other.classList.add('category-selected');
    userStory.classList.remove('category-selected');
    showSelectedCategory.setAttribute('data-value', category);
    showSelectedCategory.innerHTML = `Other`;
    assignedDropdownCategory.classList.add('d-none');
    categoryIsSelected = true;
  } else {
    userStory.classList.remove('category-selected');
    other.classList.remove('category-selected');
    showSelectedCategory.setAttribute('data-value', '');
    showSelectedCategory.innerHTML = `Select task category`;
  }
}

function changeButtonsAddTask(id) {
  let inputField = document.getElementById(id);

  inputField.innerHTML = /*html*/ `
    <input id="subTaskInput" type="text" placeholder="Add new subtask" onclick="" class="PosRel" />
    <div class="subTaskInputButtons">
      <img class="subTaskInputImg" onclick="setValueBack('subTaskInput')" src="./assets/img/icons/close.svg" alt="">
      <span class="subTaskInputImg-vertical"></span>
      <img class="subTaskInputImg checkImg" onclick="addSubTask('subTaskInput', 'subTaskContainer')" src="./assets/img/icons/checkAddTask.svg" alt="">
    </div>
  `;
  document.getElementById('subTaskInput').focus();
}

function setValueBack(idInput, idContainer) {
  let inputField = document.getElementById(idInput);
  inputField.value = ``;
  resetSubTaskInputField(idContainer);
}

function resetSubTaskInputField(idContainer) {
  let inputContainer = document.getElementById(idContainer);
  inputContainer.innerHTML = subTaskInputFieldHtml();
}

function changePrioToMedium(idContainer, idImg) {
  let prioContainer = document.getElementById(idContainer);
  let img = document.getElementById(idImg);
  prioContainer.classList.add('priorityMediumActive');
  img.src = './assets/img/addTask/mediumPrioSign.svg';
  selectedPrio = 'medium';
  document.getElementById('urgentContainer').classList.remove('priorityUrgentActive');
  document.getElementById('urgentImg').src = './assets/img/addTask/ArrowUpPrioSign.svg';
  document.getElementById('lowContainer').classList.remove('priorityLowActive');
  document.getElementById('lowImg').src = './assets/img/addTask/ArrowDownPrioSign.svg';
}

function changePrioToUrgent(idContainer, idImg) {
  let prioContainer = document.getElementById(idContainer);
  let img = document.getElementById(idImg);
  prioContainer.classList.add('priorityUrgentActive');
  img.src = './assets/img/addTask/urgentPrioActive.svg';
  selectedPrio = 'urgent';
  document.getElementById('mediumContainer').classList.remove('priorityMediumActive');
  document.getElementById('mediumImg').src = './assets/img/addTask/mediumPrioSignInactive.svg';
  document.getElementById('lowContainer').classList.remove('priorityLowActive');
  document.getElementById('lowImg').src = './assets/img/addTask/ArrowDownPrioSign.svg';
}

function changePrioToLow(idContainer, idImg) {
  let prioContainer = document.getElementById(idContainer);
  let img = document.getElementById(idImg);
  prioContainer.classList.add('priorityLowActive');
  img.src = './assets/img/addTask/lowPrioActive.svg';
  selectedPrio = 'low';
  document.getElementById('urgentContainer').classList.remove('priorityUrgentActive');
  document.getElementById('urgentImg').src = './assets/img/addTask/ArrowUpPrioSign.svg';
  document.getElementById('mediumContainer').classList.remove('priorityMediumActive');
  document.getElementById('mediumImg').src = './assets/img/addTask/mediumPrioSignInactive.svg';
}

function checkIfFormIsFilled() {
  let title = document.getElementById('taskTitle');
  let dueDate = document.getElementById('myDateInput');
  if (categoryIsSelected === true && title.value > '' && dueDate.value > '') {
    document.getElementById('create-task').disabled = false;
  }
}
