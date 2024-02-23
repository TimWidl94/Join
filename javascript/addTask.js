let tasks = [];
let subtasks = [];
let selectedContacts = [];
let filteredContacts = [];
let selectedCategories = [];
let categoryIsSelected = false;
let selectedPrio;

/**
 * Initializes the application.
 * Loads necessary data and sets up the initial UI.
 * @async
 */
async function init() {
  await includeHTML();
  await loadData();
  await loadUser();
  setUserInitials();
  setUserToContacts();
  setColorToContacts();
  setColorToActive('sidebarAddTask', 'addTask-img', 'bottomBarAddTaskMobile', 'addTaskImgMobile');
  await renderAddTask();
  await renderSubTask();
  await showTaskForm('assignedTo');
  changePrioToMedium('mediumContainer', 'mediumImg');
  setMinDateToday('myDateInput');
}

/**
 * Renders the add task form in the main content area and the board view.
 */
function renderAddTask() {
  let contentMain = document.getElementById('main');
  let contentBoardTask = document.getElementById('boardAddTask');

  if (contentMain) {
    contentMain.innerHTML = addTaskHtml('main');
  }
  if (contentBoardTask) {
    contentBoardTask.innerHTML = addTaskHtml('boardAddTask');
  }
}

/**
 * Renders the subtask input field.
 */
function renderSubTask() {
  let container = document.getElementById('subtasks');
  container.innerHTML += subTaskInputHtml();
}

/**
 * Sets the minimum date of an input field to today's date and prevents selecting past dates.
 * @param {string} inputId - The ID of the input field.
 */
function setMinDateToday(inputId) {
  var today = new Date().toISOString().split('T')[0];
  document.getElementById(inputId).setAttribute('min', today);
  document.getElementById(inputId).addEventListener('input', function () {
    var selectedDate = this.value;
    var currentDate = new Date().toISOString().split('T')[0];
    if (selectedDate < currentDate) {
      this.value = today;
    }
  });
}

/**
 * Adds a task to the tasks array and stores it in local storage.
 * @param {string} id - The ID of the input field.
 * @param {string} column - The column where the task is added.
 * @async
 */
async function addTask(id, column) {
  await pushAddTask(id, column);
  clearInputValue();
  showPopUpAddedTaskToBoard();
}

/**
 * Adds a new task to the tasks array with the provided details.
 * Handles async operations.
 * @async
 * @param {string} id - The ID of the input field for the due date.
 * @param {string} column - The column representing the current state of the task.
 * @returns {void}
 */
async function pushAddTask(id, column) {
  let taskTitle = document.getElementById('taskTitle').value;
  let taskDescription = document.getElementById('taskDescription').value;
  let taskDueDate = document.getElementById(id).value;
  let selectedCategoryElement = document.getElementById('showSelectedCategory');
  let selectedCategory = selectedCategoryElement.getAttribute('data-value');

  addTaskValues(
    taskTitle,
    taskDescription,
    taskDueDate,
    selectedCategory,
    selectedPrio,
    subtasks,
    selectedContacts,
    column
  );
}

/**
 * Adds a new task to the tasks array with the provided details.
 * @param {string} taskTitle - The title of the task.
 * @param {string} taskDescription - The description of the task.
 * @param {string} taskDueDate - The due date of the task.
 * @param {string} selectedCategory - The selected category of the task.
 * @param {string} selectedPrio - The priority of the task.
 * @param {Array} subtasks - An array of subtasks associated with the task.
 * @param {Array} selectedContacts - An array of contacts associated with the task.
 * @param {string} column - The column representing the current state of the task.
 * @returns {void}
 */
async function addTaskValues(
  taskTitle,
  taskDescription,
  taskDueDate,
  selectedCategory,
  selectedPrio,
  subtasks,
  selectedContacts,
  column
) {
  tasks.push({
    taskTitle: taskTitle,
    taskDescription: taskDescription,
    taskDueDate: taskDueDate,
    selectedCategory: selectedCategory,
    prio: selectedPrio,
    subtasks: subtasks,
    selectedContacts: selectedContacts,
    currentState: column,
  });

  await setItem('tasks', JSON.stringify(tasks));
}

/**
 * Adds a subtask to the subtasks array.
 * @param {string} idInput - The ID of the subtask input field.
 * @param {string} idContainer - The ID of the container for subtasks.
 */
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

/**
 * Renders the generated subtasks in the specified container.
 * @param {string} idContainer - The ID of the container where subtasks will be rendered.
 * @returns {void}
 */
function renderGeneratedSubTasks(idContainer) {
  let container = document.getElementById(idContainer);
  container.innerHTML = '';

  for (let i = 0; i < subtasks.length; i++) {
    let id = subtasks[i]['id'];
    container.innerHTML += subTasksValueHtml(id, i);
  }
}

/**
 * Finds the position of a subtask with the given ID.
 * @param {string} id - The ID of the subtask to find.
 * @returns {number} - The index of the subtask in the subtasks array, or -1 if not found.
 */
function findSubtaskPosition(id) {
  let nr = subtasks.findIndex((obj) => obj.id === id);
  return nr;
}

/**
 * Edits the subtask with the given ID.
 * @param {string} id - The ID of the subtask to edit.
 * @returns {void}
 */
function editSubTask(id) {
  let container = document.getElementById(id);
  let nr = findSubtaskPosition(id);
  let textContent = subtasks[nr]['subTaskInput'];
  container.innerHTML = editSubTaskHtml(textContent, id);
}

/**
 * Adds or edits a subtask at the specified index.
 * @param {number} i - The index of the subtask.
 * @returns {void}
 */
function addEditSubTask(i) {
  let subTaskInput = document.getElementById('editSubTaskInput');
  subtasks[i].subTaskInput = subTaskInput.value;
  renderGeneratedSubTasks('subTaskContainer');
}

/**
 * Displays the task form with assigned contacts.
 * @param {string} id - The ID of the container to display the task form in.
 * @returns {void}
 */
function showTaskForm(id) {
  let assignedTo = document.getElementById(id);
  assignedTo.innerHTML = showTaskFormHtml();
  sortContactsByAlphabet();

  for (let i = 0; i < contacts.length; i++) {
    let currentUser = contacts[i]['name'];
    let initials = getInitials(currentUser);
    let color = contacts[i]['color'];
    let isChoosen = contacts[i]['isChoosen'];
    let assignedDropdown = document.getElementById('assignedDropdown');
    let username = checkForUserName();

    if (currentUser === username) {
      assignedDropdown.innerHTML += assignedToUserYouHtml(i, color, currentUser, initials, isChoosen);
    } else {
      assignedDropdown.innerHTML += assignedToUserHtml(i, color, currentUser, initials, isChoosen);
    }
  }
}

/**
 * Filters contacts based on the search term and renders them.
 * @returns {void}
 */
function filterAddTaskContact() {
  // let updatedFilteredContacts;
  let searchTerm = document.getElementById('search').value.toLowerCase();
  let assignedDropdown = document.getElementById('assignedDropdown');
  assignedDropdown.innerHTML = '';

  if (searchTerm === '') {
    renderContacts(contacts);
    assignedDropdown.classList.remove('d-none');
  } else {
    // filterAndSetChosenContacts(contacts, searchTerm);
    filteredContacts = contacts.filter((contact) => contact.name.toLowerCase().startsWith(searchTerm));
    // const updatedFilteredContacts = filteredContacts.map((contact) => {
    //   return { ...contact, isChoosen: true };
    // });
    renderFilteredContacts(filteredContacts);
    if (filteredContacts.length === 0) {
      assignedDropdown.classList.add('d-none');
    } else {
      assignedDropdown.classList.remove('d-none');
    }
  }
}

function setIsChoosenValue(i) {
  console.log('filteredContacts:', filteredContacts);
  filteredContacts[i].isChoosen = !filteredContacts[i].isChoosen;
  // contacts[i].isChoosen = !filteredContacts[i].isChoosen;
  // console.log('filteredContacts[i].isChoosen:', filteredContacts[i].isChoosen);
  // showTaskForm('assignedTo');
  // console.log('filteredContacts[i].isChoosen', filteredContacts[i].isChoosen);
  // filteredContacts[i].isChoosen = true;
  // console.log('filteredContacts', filteredContacts);
  renderFilteredContacts(filteredContacts);
  // if (filteredContacts.length === 0) {
  //   assignedDropdown.classList.add('d-none');
  // } else {
  //   assignedDropdown.classList.remove('d-none');
  // }
}

// function filterAndSetChosenContacts(contacts, searchTerm) {
//   const filteredContacts = contacts.filter((contact) => contact.name.toLowerCase().startsWith(searchTerm));
//   const updatedFilteredContacts = filteredContacts.map((contact) => {
//     return { ...contact, isChoosen: true };
//   });
//   return updatedFilteredContacts;
// }

/**
 * Renders the contacts in the assigned dropdown.
 * @param {Array} contacts - The array of contacts to render.
 * @returns {void}
 */
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

/**
 * Renders the filtered contacts in the assigned dropdown.
 * @param {Array} filteredContacts - The array of filtered contacts to render.
 * @returns {void}
 */
function renderFilteredContacts(filteredContacts) {
  console.log('renderFilteredContacts:', filteredContacts);
  let assignedDropdown = document.getElementById('assignedDropdown');
  assignedDropdown.innerHTML = '';
  let username = checkForUserName();

  for (let i = 0; i < filteredContacts.length; i++) {
    let currentUser = filteredContacts[i]['name'];
    let initials = getInitials(currentUser);
    let color = filteredContacts[i]['color'];
    let isChoosen = filteredContacts[i]['isChoosen'];

    if (currentUser === username) {
      assignedDropdown.innerHTML += assignedToUserYouHtml(i, color, currentUser, initials, isChoosen);
    } else {
      assignedDropdown.innerHTML += assignedToUserHtmlFILTERED(i, color, currentUser, initials, isChoosen);
    }
  }
}

/**
 * Toggles the display of a dropdown menu.
 * @param {string} idDropdown - The ID of the dropdown menu to toggle.
 * @param {string} idImgArrow - The ID of the arrow icon associated with the dropdown.
 * @returns {void}
 */
function openDropDown(idDropdown, idImgArrow) {
  let assignedDropdown = document.getElementById(idDropdown);
  let dropdownImgArrow = document.getElementById(idImgArrow);

  assignedDropdown.classList.toggle('d-none');
  assignedDropdown.classList.toggle('border-active');
  assignedDropdown.classList.toggle('dropbtn');
  dropdownImgArrow.classList.toggle('rotate-arrow');
}

/**
 * Toggles the display of a category dropdown menu.
 * @returns {void}
 */
function openDropDownCategory() {
  let assignedDropdownCategory = document.getElementById('assignedDropdownCategory');
  let dropdownImgArrowCategory = document.getElementById('dropdownImgArrowCategory');
  assignedDropdownCategory.classList.toggle('border-category-active');
  assignedDropdownCategory.classList.toggle('d-none');
  dropdownImgArrowCategory.classList.toggle('rotate-arrow');
}

/**
 * Adds an assigned contact to the selected contacts list.
 * @param {number} i - The index of the contact.
 * @param {string} color - The color associated with the contact.
 * @returns {void}
 */
async function addAssignedContact(i, color) {
  let assignedDropdown = document.getElementById('assignedDropdown');
  let selectedContact = contacts[i]['name'];
  let checkboxImage = document.getElementById(`checkBox-${i}`);
  let userID = document.getElementById(`user-${i}`);

  // renderContactList(assignedDropdown, checkboxImage, userID, selectedContact, color);
  addSelectedContact(assignedDropdown, checkboxImage, userID, selectedContact, color);
  await renderSelectedContacts(i);
}

async function addAssignedContactFiltered(i, color) {
  console.log('addAssignedContactFiltered i:', i);
  console.log('addAssignedContactFiltered color:', color);
  let assignedDropdown = document.getElementById('assignedDropdown');
  let selectedContact = filteredContacts[i]['name'];
  let checkboxImage = document.getElementById(`checkBox-${i}`);
  let userID = document.getElementById(`user-${i}`);

  // renderContactList(assignedDropdown, checkboxImage, userID, selectedContact, color);
  addSelectedContact(assignedDropdown, checkboxImage, userID, selectedContact, color);
  await renderSelectedContacts(i);
}

/**
 * Adds a selected contact to the list of selected contacts.
 *
 * @param {HTMLElement} assignedDropdown - The dropdown menu element where the contacts will be rendered.
 * @param {HTMLElement} checkboxImage - The checkbox image for the selected contact.
 * @param {HTMLElement} userID - The user ID of the selected contact.
 * @param {string} selectedContact - The selected contact.
 * @param {string} color - The color of the selected contact.
 * @returns {void}
 */
function addSelectedContact(assignedDropdown, checkboxImage, userID, selectedContact, color) {
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
  }
}

/**
 * Removes a selected contact from the list of selected contacts.
 *
 * @param {HTMLElement} assignedDropdown - The dropdown menu element where the contacts will be rendered.
 * @param {HTMLElement} checkboxImage - The checkbox image for the selected contact.
 * @param {HTMLElement} userID - The user ID of the selected contact.
 * @param {string} selectedContact - The selected contact.
 * @param {string} color - The color of the selected contact.
 * @returns {void}
 */
function removeSelectedContact(assignedDropdown, checkboxImage, userID, selectedContact, color) {
  const index = selectedContacts.findIndex((contact) => contact.name === selectedContact && contact.color === color);
  if (checkIfSelectedContactExist(selectedContact)) {
    if (index !== -1) {
      selectedContacts.splice(index, 1);
    }
    checkboxImage.src = './assets/img/icons/checkBox.svg';
    userID.classList.remove('selected-profile-active-item');
    assignedDropdown.classList.toggle('addTask-selected');
  }
}

/**
 * Checks if the selected contact already exists in the list of selected contacts.
 *
 * @param {string} selectedContact - The selected contact.
 * @returns {boolean} - Returns true if the selected contact already exists, otherwise false.
 */
function checkIfSelectedContactExist(selectedContact) {
  for (let i = 0; i < selectedContacts.length; i++) {
    if (selectedContacts[i]['name'].includes(selectedContact)) {
      return true;
    }
  }
}

/**
 * Renders the selected contacts in the "Assigned Contacts" section on the user interface.
 *
 * @param {number} i - The index of the currently selected contact.
 * @returns {void}
 */
function renderSelectedContacts(i) {
  let content = document.getElementById('assignedAddedContact');
  content.innerHTML = '';

  for (let j = 0; j < selectedContacts.length; j++) {
    let contact = selectedContacts[j];
    let initials = getInitials(selectedContacts[j]['name']);
    let color = contact['color'];
    content.innerHTML += renderSelectedContactsHtml(i, j, initials, color);
  }
}

/**
 * Generates initials from a contact name.
 *
 * @param {string} contactName - The full name of the contact.
 * @returns {string} The initials generated from the contact name.
 */
function getInitials(contactName) {
  const nameParts = contactName.split(' ');
  let initials = '';
  for (let i = 0; i < nameParts.length; i++) {
    initials += nameParts[i][0];
  }
  return initials.toUpperCase();
}

/**
 * Deletes a subtask from the list of subtasks.
 *
 * @param {number} number - The number of the subtask to be deleted.
 * @param {string} idContainer - The ID of the container holding the subtasks.
 */
function deleteSubTask(number, idContainer) {
  let nr = findSubtaskPosition(number);
  subtasks.splice(nr, 1);
  subTaskContainer = document.getElementById(idContainer);
  subTaskContainer.innerHTML = ``;
  for (let i = 0; i < subtasks.length; i++) {
    let nr = subtasks[i]['id'];
    subTaskContainer.innerHTML += subtasksAfterDeletionHtml(i, nr, idContainer);
  }
}

/**
 * Clears the input value and resets the task form.
 */
function clearInputValue() {
  renderAddTask();
  showTaskForm('assignedTo');
  changePrioToMedium('mediumContainer', 'mediumImg');
}

/**
 * Shows a popup indicating that a task has been added to the board.
 */
async function showPopUpAddedTaskToBoard() {
  let popup = document.getElementById('addedTaskToBoard');
  popup.classList.remove('d-none');
  await setTimeout(() => moveToCenter(popup), 200);
  setTimeout(() => (window.location.href = './board.html'), 3000);
}

/**
 * Moves a popup to the center of the screen.
 *
 * @param {HTMLElement} popup - The popup element to be moved.
 */
function moveToCenter(popup) {
  popup.classList.add('moveToCenterAddTask');
}

/**
 * Selects a category for the task.
 *
 * @param {string} category - The category selected for the task.
 * @param {string} id - The ID of the category element.
 */
function selectCategory(category, id) {
  const userStory = document.getElementById('userStory');
  const technicalTask = document.getElementById('other');
  const showSelectedCategory = document.getElementById('showSelectedCategory');
  const assignedDropdownCategory = document.getElementById('assignedDropdownCategory');
  selectCategoryIfElse(userStory, technicalTask, showSelectedCategory, assignedDropdownCategory, category);
  checkIfFormIsFilled(id);
}

/**
 * Handles the selection of a task category.
 *
 * @param {HTMLElement} userStory - The user story category element.
 * @param {HTMLElement} technicalTask - The technical task category element.
 * @param {HTMLElement} showSelectedCategory - The element displaying the selected category.
 * @param {HTMLElement} assignedDropdownCategory - The dropdown category element.
 * @param {string} category - The category selected for the task.
 */
function selectCategoryIfElse(userStory, technicalTask, showSelectedCategory, assignedDropdownCategory, category) {
  if (category === 'user-story' || category === 'User Story') {
    userStory.classList.add('category-selected');
    technicalTask.classList.remove('category-selected');
    showSelectedCategory.setAttribute('data-value', category);
    showSelectedCategory.innerHTML = `User Story`;
    assignedDropdownCategory.classList.add('d-none');
    categoryIsSelected = true;
  } else if (category === 'technical-task' || category === 'Technical Task') {
    technicalTask.classList.add('category-selected');
    userStory.classList.remove('category-selected');
    showSelectedCategory.setAttribute('data-value', category);
    showSelectedCategory.innerHTML = `Technical Task`;
    assignedDropdownCategory.classList.add('d-none');
    categoryIsSelected = true;
  } else {
    userStory.classList.remove('category-selected');
    technicalTask.classList.remove('category-selected');
    showSelectedCategory.setAttribute('data-value', '');
    showSelectedCategory.innerHTML = `Select task category`;
  }
}

/**
 * Changes the buttons for adding a task.
 *
 * @param {string} id - The ID of the input field.
 */
function changeButtonsAddTask(id) {
  let inputField = document.getElementById(id);

  inputField.innerHTML = changeButtonsAddTaskHtml();
  document.getElementById('subTaskInput').focus();
}

/**
 * Sets the value of an input field back to an empty string.
 *
 * @param {string} idInput - The ID of the input field.
 * @param {string} idContainer - The ID of the container.
 */
function setValueBack(idInput, idContainer) {
  let inputField = document.getElementById(idInput);
  inputField.value = ``;
  resetSubTaskInputField(idContainer);
}

/**
 * Resets the input field for subtasks.
 *
 * @param {string} idContainer - The ID of the subtask input container.
 */
function resetSubTaskInputField(idContainer) {
  let inputContainer = document.getElementById(idContainer);
  inputContainer.innerHTML = subTaskInputFieldHtml();
}

/**
 * Changes the priority of a task to medium.
 *
 * @param {string} idContainer - The ID of the priority container.
 * @param {string} idImg - The ID of the priority image.
 */
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

/**
 * Changes the priority of a task to urgent.
 *
 * @param {string} idContainer - The ID of the priority container.
 * @param {string} idImg - The ID of the priority image.
 */
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

/**
 * Changes the priority of a task to low.
 *
 * @param {string} idContainer - The ID of the priority container.
 * @param {string} idImg - The ID of the priority image.
 */
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

/**
 * Checks if the task form is filled with required information.
 *
 * @param {string} id - The ID of the due date input field.
 */
function checkIfFormIsFilled(id) {
  let title = document.getElementById('taskTitle');
  let dueDate = document.getElementById(id);
  if (categoryIsSelected === true && title.value > '' && dueDate.value > '') {
    document.getElementById('create-task').disabled = false;
  }
}
