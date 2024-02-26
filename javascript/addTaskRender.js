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
  await resetIsChoosenValue();
  await renderAddTask();
  await renderSubTask();
  await showTaskForm('assignedTo');
  changePrioToMedium('mediumContainer', 'mediumImg');
  setMinDateToday('myDateInput');
  setNumberOnContacts();
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
async function showTaskForm(id) {
  let assignedTo = document.getElementById(id);
  assignedTo.innerHTML = showTaskFormHtml();
  sortContactsByAlphabet();

  for (let i = 0; i < contacts.length; i++) {
    let currentUser = contacts[i]['name'];
    let initials = getInitials(currentUser);
    let color = contacts[i]['color'];
    let assignedDropdown = document.getElementById('assignedDropdown');
    let username = checkForUserName();
    let contactNumber = contacts[i]['nr'];

    if (currentUser === username) {
      assignedDropdown.innerHTML += await assignedToUserYouHtml(i, color, currentUser, initials, contactNumber);
      checkIfSelectedContact(i, contactNumber);
    } else {
      assignedDropdown.innerHTML += await assignedToUserHtml(i, color, currentUser, initials, contactNumber);
      checkIfSelectedContact(i, contactNumber);
    }
  }
}

function checkIfSelectedContact(i, contactNumber) {
  let userId = document.getElementById(`user-${i}`);
  let checkboxImage = document.getElementById(`checkBox-${i}`);
  if (contacts[contactNumber]['isChoosen'] === true) {
    checkboxImage.src = './assets/img/icons/check_button-white.svg';
    userId.classList.add('selected-profile-active-item');
  }
  if (contacts[contactNumber]['isChoosen'] === false && userId.classList.contains('selected-profile-active-item')) {
    userId.classList.remove('selected-profile-active-item');
  }
}

/**
 * Filters contacts based on the search term and renders them.
 * @returns {void}
 */
async function filterAddTaskContact() {
  // let updatedFilteredContacts;
  let searchTerm = document.getElementById('search').value.toLowerCase();
  let assignedDropdown = document.getElementById('assignedDropdown');
  assignedDropdown.innerHTML = '';

  if (searchTerm === '') {
    await showTaskForm('assignedTo');
    assignedDropdown.classList.remove('d-none');
    openDropDown('assignedDropdown', 'dropdownImgArrow');
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

async function setIsChoosenValue(i) {
  if (contacts[i]['isChoosen'] === true) {
    contacts[i]['isChoosen'] = false;
    await saveContacts();
    return;
  }
  if (contacts[i]['isChoosen'] === false) {
    contacts[i]['isChoosen'] = true;
    await saveContacts();
    return;
  }
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
async function renderContacts(contacts) {
  let assignedDropdown = document.getElementById('assignedDropdown');
  assignedDropdown.innerHTML = '';

  for (let i = 0; i < contacts.length; i++) {
    let currentUser = contacts[i]['name'];
    let initials = getInitials(currentUser);
    let color = contacts[i]['color'];
    let contactNumber = contacts[i]['nr'];

    assignedDropdown.innerHTML += await assignedToUserHtml(i, color, currentUser, initials, contactNumber);
    checkIfSelectedContact(i);
  }
}

/**
 * Renders the filtered contacts in the assigned dropdown.
 * @param {Array} filteredContacts - The array of filtered contacts to render.
 * @returns {void}
 */
function renderFilteredContacts(filteredContacts) {
  let assignedDropdown = document.getElementById('assignedDropdown');
  assignedDropdown.innerHTML = '';
  let username = checkForUserName();

  for (let i = 0; i < filteredContacts.length; i++) {
    let currentUser = filteredContacts[i]['name'];
    let initials = getInitials(currentUser);
    let color = filteredContacts[i]['color'];
    let contactNumber = filteredContacts[i]['nr'];

    if (currentUser === username) {
      assignedDropdown.innerHTML += assignedToUserYouHtml(i, color, currentUser, initials, contactNumber);
      checkIfSelectedContact(i, contactNumber);
    } else {
      assignedDropdown.innerHTML += assignedToUserHtml(i, color, currentUser, initials, contactNumber);
      checkIfSelectedContact(i, contactNumber);
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
async function addAssignedContact(i, color, contactsNumber) {
  let assignedDropdown = document.getElementById('assignedDropdown');
  let selectedContact = await contacts[contactsNumber]['name'];
  let checkboxImage = document.getElementById(`checkBox-${i}`);
  let userID = document.getElementById(`user-${i}`);

  // renderContactList(assignedDropdown, checkboxImage, userID, selectedContact, color);
  addSelectedContact(assignedDropdown, checkboxImage, userID, selectedContact, color);
  await setIsChoosenValue(contactsNumber);
  await renderSelectedContacts(i);
}

async function addFilteredAssignedContact(i, color, contactsNumber) {
  // console.log('addAssignedContactFiltered i:', i);
  // console.log('addAssignedContactFiltered color:', color);
  let assignedDropdown = document.getElementById('assignedDropdown');
  let selectedContact = filteredContacts[i]['name'];
  let checkboxImage = document.getElementById(`checkBox-${i}`);
  let userID = document.getElementById(`user-${i}`);

  // renderContactList(assignedDropdown, checkboxImage, userID, selectedContact, color);
  addSelectedContact(assignedDropdown, checkboxImage, userID, selectedContact, color);
  await setIsChoosenValue(contactsNumber);
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
  } else {
    removeSelectedContact(assignedDropdown, checkboxImage, userID, selectedContact, color);
  }
}

function backgroundForSelectedContact(divId) {
  for (let i = 0; i < contacts.length; i++) {
    let userId = document.getElementById(`user-${divId}`);
    let checkboxImage = document.getElementById(`checkBox-${divId}`);
    if (contacts[i]['isChoosen'] === true) {
      checkboxImage.src = './assets/img/icons/check_button-white.svg';
      userID.classList.add('selected-profile-active-item');
    }
    if (contacts[i]['isChoosen'] === false && userId.classList.contains('selected-profile-active-item')) {
      userId.classList.remove('selected-profile-active-item');
    }
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
 * Moves a popup to the center of the screen.
 *
 * @param {HTMLElement} popup - The popup element to be moved.
 */
function moveToCenter(popup) {
  popup.classList.add('moveToCenterAddTask');
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

async function resetIsChoosenValue() {
  for (let i = 0; i < contacts.length; i++) {
    let contact = contacts[i];
    contact['isChoosen'] = false;
  }
  await saveContacts();
}
