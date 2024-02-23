let currentDraggedElement;
let selectedPrioPopupEdit;
let subTaskCounter = 0;

/**
 * Initialize the board by loading data, updating HTML elements, and setting initial user settings.
 */
async function initBoard() {
  await loadData();
  await loadUser();
  await updateHTML();
  await includeHTML();
  setUserInitials();
  setUserToContacts();
  setColorToContacts();
  // renderContacts();
  setColorToActive('sidebarBoard', 'board-img', 'bottomBarBoardMobile', 'boardImgMobile');
  checkTaskAreaDisplayEmpty();
  setNumberOnContacts();
}

/**
 * Render the add task popup for a specific column.
 * @param {string} column - The column identifier.
 */
function renderAddTaskPopUp(column) {
  let contentBoardTask = document.getElementById('boardAddTask');
  contentBoardTask.innerHTML = addTaskPopUpHtml(column);
}

/**
 * Set the minimum date for a date input field to today.
 * @param {string} inputIdPopup - The ID of the date input field.
 */
function setMinDateTodayPopup(inputIdPopup) {
  var today = new Date().toISOString().split('T')[0];
  document.getElementById(inputIdPopup).setAttribute('min', today);
  document.getElementById(inputIdPopup).addEventListener('input', function () {
    var selectedDate = this.value;
    var currentDate = new Date().toISOString().split('T')[0];
    if (selectedDate < currentDate) {
      this.value = today;
    }
  });
}

/**
 * Open the add task popup for a specific column.
 * @param {string} column - The column identifier.
 */
async function openAddTaskPopup(column) {
  await renderAddTaskPopUp(column);
  changePrioToMedium('mediumContainer', 'mediumImg');
  await renderSubTask();
  await showTaskForm('assignedTo');
  setMinDateTodayPopup('myDateInputPopup');
  document.getElementById('addTaskPopupWrapper').classList.remove('d-none');
  document.getElementById('addTaskPopup').classList.remove('d-none');
  document.getElementById('addTaskPopup').classList.add('slide-in');
}

/**
 * Add a task popup.
 * @param {string} id - The task identifier.
 * @param {string} section - The section of the task.
 */
async function addTaskPopUp(id, section) {
  await pushAddTask(id, section);
  await renderBoardTasks();
  closeAddTaskPopup();
}


/**
 * Close the add task popup.
 */
function closeAddTaskPopup() {
  let addTaskPopup = document.getElementById('addTaskPopup');
  addTaskPopup.classList.remove('slide-in');
  addTaskPopup.classList.add('slide-out');

  setTimeout(function () {
    addTaskPopup.classList.add('d-none');
    document.getElementById('addTaskPopupWrapper').classList.add('d-none');
  }, 500);
  setTimeout(function () {
    addTaskPopup.classList.remove('slide-out');
  }, 900);
}

/**
 * Open a task popup for editing.
 * @param {number} i - The index of the task.
 */
function openTaskPopup(i) {
  let taskPopup = document.getElementById('aTPopupWrapper');
  taskPopup.classList.remove('d-none');
  taskPopup.classList.add('slide-in');
  taskPopup.classList.add('d-block');

  let img = setPrioImg(i);
  let date = convertDateFormat(tasks[i].taskDueDate);
  taskPopup.innerHTML = '';
  taskPopup.innerHTML = generateTaskPopupHTML(i, img, date);

  setupTaskPopup(i);
}

/**
 * Setup the task popup by setting category background, checking subtasks, and rendering assigned contacts and subtasks.
 * @param {number} i - The index of the task.
 */
function setupTaskPopup(i) {
  setCategoryBackground(tasks[i]['selectedCategory'], `aTPopupCategory${i}`);
  checkSubtasksExisting(i);
  renderAssignedToContacs(i);
  renderSubtasks(i, 'subtaskContainerPopup');
}


/**
 * Close the task popup.
 */
function closeTaskPopup() {
  let taskPopup = document.getElementById('aTPopupWrapper');
  taskPopup.classList.remove('d-block');
  taskPopup.classList.remove('slide-in');
  taskPopup.classList.add('slide-out');

  setTimeout(function () {
    taskPopup.classList.remove('slide-out');
    taskPopup.classList.add('d-none');
  }, 500);

  updateHTML();
  subtasks = [];
}

/**
 * Check if subtasks exist for a task and update the display accordingly.
 * @param {number} i - The index of the task.
 */
function checkSubtasksExisting(i) {
  let container = document.getElementById(`aTPopupSubtasks${i}`);

  if (tasks[i].subtasks.length === 0) {
    container.classList.add('d-none');
  } else {
    container.classList.remove('d-none');
  }
}

/**
 * Render the assigned contacts in the task popup.
 * @param {number} i - The index of the task.
 */
function renderAssignedToContacs(i) {
  let assingedToContainer = document.getElementById('assigned-contact-profile-container');
  assingedToContainer.innerHTML = '';

  const task = tasks[i];

  if (task.selectedContacts?.length > 0) {
    for (let j = 0; j < task.selectedContacts.length; j++) {
      const selectedContact = task.selectedContacts[j];
      const contactColor = getContactColor(selectedContact.name);
      const capitalLetters = getFirstLetters(selectedContact.name);
      assingedToContainer.innerHTML += renderAssignedToContacsInfoHtml(contactColor, capitalLetters, selectedContact);
    }
  }
}

/**
 * Get the color of a contact by its name.
 * @param {string} selectedContactName - The name of the contact.
 * @returns {string} The color of the contact.
 */
function getContactColor(selectedContactName) {
  let index = contacts.findIndex((contact) => contact.name === selectedContactName);
  if (index !== -1) {
    return contacts[index].color;
  }
}

/**
 * Render subtasks for a task.
 * @param {number} i - The index of the task.
 * @param {string} id - The ID of the HTML container for subtasks.
 */
async function renderSubtasks(i, id) {
  let subTaskContainer = document.getElementById(id);
  subTaskContainer.innerHTML = '';

  let task = tasks[i];

  if (task.subtasks.length > 0) {
    for (let j = 0; j < task.subtasks.length; j++) {
      let subTask = task.subtasks[j];
      subTaskContainer.innerHTML += renderSubtasksInfoHtml(j, subTask, i);
    }
  }
  await checkSubTaskInfoChecked(i);
}

/**
 * Set the priority image for a task.
 * @param {number} i - The index of the task.
 * @returns {string} The URL of the priority image.
 */
function setPrioImg(i) {
  if (tasks[i]['prio'] == 'low') {
    let img = './assets/img/AddTask/ArrowDownPrioSign.svg';
    return img;
  }
  if (tasks[i]['prio'] == 'medium') {
    let img = './assets/img/AddTask/MediumPrioSignInactive.svg';
    return img;
  }
  if (tasks[i]['prio'] == 'urgent') {
    let img = './assets/img/AddTask/ArrowUpPrioSign.svg';
    return img;
  }
}

/**
 * Convert the date format from YYYY-MM-DD to DD/MM/YYYY.
 * @param {string} date - The date in YYYY-MM-DD format.
 * @returns {string} The date in DD/MM/YYYY format.
 */
function convertDateFormat(date) {
  let parts = date.split('-');
  let newDate = parts[2] + '/' + parts[1] + '/' + parts[0];
  return newDate;
}

/**
 * Delete a task.
 * @param {number} i - The index of the task to delete.
 */
function deleteTask(i) {
  tasks.splice(i, 1);
  closeTaskPopup();
}

/**
 * Delete a subtask during task editing.
 * @param {string} id - The ID of the subtask.
 * @param {string} idContainer - The ID of the HTML container for subtasks.
 * @param {string} subTaskInput - The input field of the subtask.
 */
function deleteSubTaskEdit(id, idContainer, subTaskInput) {
  let taskIndex = findTaskEdit(subTaskInput);
  // let nr = findSubtaskPositionEdit(id, taskIndex);
  // let a;
  let nr = findSubtaskPositionEdit(id);
  if (subtasks.length == 0 && taskIndex >= 0) {
    pushCurrentSubtasksInArray(taskIndex);
  }
  subtasks.splice(nr, 1);
  renderGeneratedSubTasksEdit(idContainer, taskIndex);
}

/**
 * Find the index of a task based on the subtask input field.
 * @param {string} subTaskInput - The input field of the subtask.
 * @returns {number} The index of the task.
 */
function findTaskEdit(subTaskInput) {
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    for (let j = 0; j < task.subtasks.length; j++) {
      const subtask = task.subtasks[j];
      if (subtask.subTaskInput === subTaskInput) {
        return i;
      }
    }
  }
  console.error('Task not found!');
  return -1;
}

/**
 * Find the position of a subtask based on its ID.
 * @param {string} id - The ID of the subtask.
 * @returns {number} The position of the subtask.
 */
function findSubtaskPositionEdit(id) {
  let nr = subtasks.findIndex((obj) => obj.id === id);
  if (nr == -1) {
  }

  return nr;
}

/**
 * Edit a task.
 * @param {number} i - The index of the task to edit.
 */
async function editTask(i) {
  let popupInfo = document.getElementById('aTPopup');
  let popupEdit = document.getElementById('aTPopupEdit');

  popupEdit.classList.remove('d-none');
  popupInfo.classList.add('d-none');

  setEditTaskValues(i);
  renderEditTask(i);
  await pushTasksSubtasks(i);
  setMinDateTodayPopup('myDateInputEdit');
  await loadSelectedContacts(i);
  setAssignedToContactsDropdown();
}

/**
 * Set the values for editing a task.
 * @param {number} i - The index of the task.
 */
function setEditTaskValues(i) {
  let title = document.getElementById('taskTitleEdit');
  let description = document.getElementById('taskDescriptionEdit');
  let dueDate = document.getElementById('myDateInputEdit');
  let selectedCategoryElement = document.getElementById('showSelectedCategoryEdit');

  title.value = tasks[i].taskTitle;
  description.value = tasks[i].taskDescription;
  dueDate.value = tasks[i].taskDueDate;
  selectedCategoryElement.textContent = setCategoryTextContent(i);
  setPrioEdit(tasks[i].prio);
  selectedPrioPopupEdit = tasks[i].prio;
}

/**
 * Push subtasks of a task into the subtasks array.
 * @param {number} i - The index of the task.
 */
function pushTasksSubtasks(i) {
  for (let j = 0; j < tasks[i]['subtasks'].length; j++) {
    let subTask = tasks[i]['subtasks'][j];

    subtasks.push({
      subTaskInput: subTask['subTaskInput'],
      id: subTask['id'],
      isActive: subTask['isActive'],
    });
  }
}

/**
 * Load selected contacts for editing a task.
 * @param {number} i - The index of the task.
 */
function loadSelectedContacts(i) {
  clearSelectedContactsArray();
  addSelectedContactsFromTask(i);
  deleteSelectedContactsFromTask(i);
  renderSelectedContactsEdit(i);
}

/**
 * Clear the selected contacts array.
 */
function clearSelectedContactsArray() {
  if (selectedContacts.length > 0) {
    selectedContacts = [];
  }
}

/**
 * Add selected contacts from a task to the selected contacts array.
 * @param {number} i - The index of the task.
 */
function addSelectedContactsFromTask(i) {
  let task = tasks[i];

  if (tasks[i].selectedContacts.length > 0) {
    for (let j = 0; j < task.selectedContacts.length; j++) {
      let selectedContact = task.selectedContacts[j];
      selectedContacts.push(selectedContact);
    }
  }
}

/**
 * Delete selected contacts from a task.
 * @param {number} i - The index of the task.
 */
function deleteSelectedContactsFromTask(i) {
  let task = tasks[i];

  for (let j = task.selectedContacts.length - 1; j >= 0; j--) {
    task.selectedContacts.splice(j, 1);
  }
}

/**
 * Render selected contacts for editing a task.
 * @param {number} i - The index of the task.
 */
function renderSelectedContactsEdit(i) {
  let content = document.getElementById('assignedAddedContact');
  content.innerHTML = '';

  for (let j = 0; j < selectedContacts.length; j++) {
    let contact = selectedContacts[j];
    let initials = getInitials(selectedContacts[j]['name']);
    let color = contact['color'];
    content.innerHTML += renderSelectedContactsEditHtml(i, j, color, initials);
  }
}

/**
 * Remove a selected contact from a task.
 * @param {number} i - The index of the task.
 * @param {number} j - The index of the selected contact.
 */
function removeSelectedContact(i, j) {
  selectedContacts.splice(j, 1);
  renderSelectedContactsEdit(i);
}

/**
 * Set assigned-to contacts dropdown options.
 */
function setAssignedToContactsDropdown() {
  for (let i = 0; i < contacts.length; i++) {
    let contact = contacts[i];
    for (let j = 0; j < selectedContacts.length; j++) {
      if (contact.name === selectedContacts[j].name) {
        let userID = document.getElementById(`user-${i}`);
        let checkboxImage = document.getElementById(`checkBox-${i}`);
        userID.classList.add('selected-profile-active-item');
        checkboxImage.src = './assets/img/icons/check_button-white.svg';
      }
    }
  }
}

/**
 * Set the text content for the category element.
 * @param {number} i - The index of the task.
 * @returns {string} The text content for the category element.
 */
function setCategoryTextContent(i) {
  if (tasks[i].selectedCategory == '') {
    return 'Select task category';
  } else {
    return tasks[i].selectedCategory;
  }
}

/**
 * Add a subtask during task editing.
 * @param {string} idInput - The ID of the subtask input field.
 * @param {string} idContainer - The ID of the HTML container for subtasks.
 * @param {number} i - The index of the task.
 */
function addSubTaskEdit(idInput, idContainer, i) {
  let subTaskInput = document.getElementById(idInput).value;
  let subTaskError = document.getElementById('subTaskErrorEdit');
  let nr = subtasks.length;
  validateAndAddSubTaskEdit(subTaskInput, subTaskError, nr, idInput, idContainer, i)

  document.getElementById(idInput).value = '';
  renderGeneratedSubTasksEdit(idContainer, i);
  resetSubTaskInputField(idInput);
}


/**
* Validate and add a subtask during task editing.
* @param {string} subTaskInput - The input value of the subtask.
* @param {HTMLElement} subTaskError - The element to display error messages.
* @param {number} nr - The number of subtasks.
* @param {string} idInput - The ID of the subtask input field.
* @param {string} idContainer - The ID of the HTML container for subtasks.
* @param {number} i - The index of the task.
*/
function validateAndAddSubTaskEdit(subTaskInput, subTaskError, nr, idInput, idContainer, i) {
  if (subTaskInput.trim() === '') {
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
    renderGeneratedSubTasksEdit(idContainer, i);
    resetSubTaskInputField(idInput);
  }
}


/**
 * Reset the IDs of subtasks.
 */
function resetSubTaskIDs() {
  for (let i = 0; i < subtasks.length; i++) {
    subtasks[i].id = i;
  }
}

/**
 * Render the generated subtasks for editing.
 * @param {string} idContainer - The ID of the HTML container for subtasks.
 */
function renderGeneratedSubTasksEdit(idContainer, j) {
  if (j >= 0) {
    if (tasks[j].subtasks.length > 0) {
      deleteExistingSubtasks(j);
    }
  }

  let container = document.getElementById(idContainer);
  container.innerHTML = ``;
  for (let i = 0; i < subtasks.length; i++) {
    let id = subtasks[i]['id'];
    let subTaskInput = subtasks[i]['subTaskInput'];
    container.innerHTML += subTasksValueEditHtml(id, subTaskInput, j);
  }
}

/**
 * Save the edited task.
 * @param {number} i - The index of the task.
 */
function renderEditTask(i) {
  renderSubTasksInput(i);
  renderSubTasksEditable(i, 'subTaskContainerEdit');
  showTaskFormEdit('assignedToEdit');
}

/**
 * Start dragging a task.
 * @param {string} id - The ID of the task being dragged.
 */
function renderSubTasksInput(i) {
  let container = document.getElementById('subtasksEdit');
  container.innerHTML += subTaskInputEditHtml(i);
}

/**
 * Allow dropping of a task.
 * @param {Event} ev - The drag event.
 */
function renderSubTasksEditable(i, id1) {
  let container = document.getElementById(id1);
  container.innerHTML = ``;

  let task = tasks[i];

  if (task.subtasks.length > 0) {
    for (let j = 0; j < task.subtasks.length; j++) {
      let subTask = task.subtasks[j];
      let id = task.subtasks[j]['id'];
      container.innerHTML += subTasksValueEditHtml(id, subTask.subTaskInput);
    }
  }
}

/**
 * Move a task to a different category.
 * @param {string} category - The category to move the task to.
 */
function showTaskFormEdit(id) {
  let assignedTo = document.getElementById(id);
  assignedTo.innerHTML = showTaskFormEditHtml();
  sortContactsByAlphabet();
  populateAssignedDropdown();
}

/**
 * Populate the assigned dropdown menu with contacts.
 */
function populateAssignedDropdown() {
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


/**
 * Move a task to a different category on mobile devices.
 * @param {number} i - The index of the task.
 * @param {string} category - The category to move the task to.
 */
function changeButtonsAddTaskEdit(id, i) {
  let inputField = document.getElementById(id);

  inputField.innerHTML = changeButtonsAddTaskEditHtml(i);
  document.getElementById('subTaskInputEdit').focus();
}

/**
 * Task progress bar.
 * @param {number} i - The index of the task.
 */
function setPrioEdit(prio) {
  if (prio == 'low') {
    classlistAdd('lowContainerEdit', 'priorityLowActive');
    document.getElementById('lowImgEdit').src = './assets/img/AddTask/lowPrioActive.svg';
  }
  if (prio == 'medium') {
    classlistAdd('mediumContainerEdit', 'priorityMediumActive');
    document.getElementById('mediumImgEdit').src = './assets/img/AddTask/mediumPrioSign.svg';
  }
  if (prio == 'urgent') {
    classlistAdd('urgentContainerEdit', 'priorityUrgentActive');
    document.getElementById('urgentImgEdit').src = './assets/img/AddTask/urgentPrioActive.svg';
  }
  selectedPrioPopupEdit = prio;
}

/**
 * Active a subtask.
 * @param {number} j - The index of the subtask.
 * @param {number} i - The index of the task.
 */
function changePriorityEdit(idContainer, idImg, priority) {
  let prioContainer = document.getElementById(idContainer);
  let img = document.getElementById(idImg);
  resetPriorityContainers();
  prioContainer.classList.add('priority' + priority.charAt(0).toUpperCase() + priority.slice(1) + 'Active');
  img.src = './assets/img/addTask/' + priority + 'PrioActive.svg';
  selectedPrioPopupEdit = priority;
}

/**
 * Reset priority containers and images.
 */
function resetPriorityContainers() {
  document.getElementById('urgentContainerEdit').classList.remove('priorityUrgentActive');
  document.getElementById('urgentImgEdit').src = './assets/img/addTask/ArrowUpPrioSign.svg';
  document.getElementById('mediumContainerEdit').classList.remove('priorityMediumActive');
  document.getElementById('mediumImgEdit').src = './assets/img/addTask/MediumPrioSignInactive.svg';
  document.getElementById('lowContainerEdit').classList.remove('priorityLowActive');
  document.getElementById('lowImgEdit').src = './assets/img/addTask/ArrowDownPrioSign.svg';
}

/**
 * Check if subtask information is checked.
 * @param {number} i - The index of the task.
 * @returns {boolean} Whether the subtask information is checked.
 */
async function saveEditedTask(i) {
  let title = document.getElementById('taskTitleEdit');
  let description = document.getElementById('taskDescriptionEdit');
  let dueDate = document.getElementById('myDateInputEdit');
  let selectedCategoryElement = document.getElementById('showSelectedCategoryEdit');
  let selectedCategoryValue = selectedCategoryElement.textContent;

  updateTaskInformation(i, title.value, description.value, dueDate.value, selectedCategoryValue);
  closeTaskPopup();
}

/**
 * Update task information.
 * @param {number} i - The index of the task.
 * @param {string} taskTitle - The title of the task.
 * @param {string} taskDescription - The description of the task.
 * @param {string} taskDueDate - The due date of the task.
 * @param {string} selectedCategoryValue - The selected category of the task.
 */
function updateTaskInformation(i, taskTitle, taskDescription, taskDueDate, selectedCategoryValue) {
  tasks[i].taskTitle = taskTitle;
  tasks[i].taskDescription = taskDescription;
  tasks[i].taskDueDate = taskDueDate;
  tasks[i].selectedContacts = selectedContacts;
  tasks[i].selectedCategory = selectedCategoryValue;
  tasks[i].prio = selectedPrioPopupEdit;
  tasks[i]['subtasks'] = subtasks;
}


/**
 * Check how many subtasks are checked.
 * @param {number} i - The index of the task.
 * @returns {number} The number of checked subtasks.
 */
function saveAddedSubtasks(i) {
  deleteExistingSubtasks(i);
  tasks[i]['subtasks'].push(subtasks);
}

/**
 * Render the board tasks.
 */
function deleteExistingSubtasks(i) {
  let task = tasks[i];
  task.subtasks.splice(0, task.subtasks.length);
}

/**
 * Render the "To Do" tasks.
 */
function setCategoryBackground(category, id) {
  if (category == 'user-story' || category == 'User Story') {
    document.getElementById(id).classList.add('board-task-epic-green');
  }
  if (category === 'technical-task' || category === 'Technical Task') {
    document.getElementById(id).classList.add('board-task-epic-blue');
  }
}

/**
 * Render the "In Progress" tasks.
 */
function updateHTML() {
  todoAreaUpdate();
  inProgressUpdate();
  feedbackAreaUpdate();
  doneUpdate();
  renderBoardTasks();
}

/**
 * Render the "Awaiting Feedback" tasks.
 */
async function todoAreaUpdate() {
  let todo = tasks.filter((t) => t['selectedCategory'] == 'toDo');
  document.getElementById('todo').innerHTML = '';

  for (let index = 0; index < todo.length; index++) {
    const element = todo[index];
    await setPrioImg(i);
    document.getElementById('todo').innerHTML += generateTodoHTML(element, img);
  }
}

/**
 * Render the "Done" tasks.
 */
async function inProgressUpdate() {
  let inProgress = tasks.filter((t) => t['selectedCategory'] == 'inProgress');
  document.getElementById('inProgress').innerHTML = '';

  for (let index = 0; index < inProgress.length; index++) {
    const element = inProgress[index];
    await setPrioImg(i);
    document.getElementById('inProgress').innerHTML += generateTodoHTML(element, img);
  }
}

/**
 * Update the HTML elements.
 */
async function feedbackAreaUpdate() {
  let awaitFeedback = tasks.filter((t) => t['selectedCategory'] == 'awaitFeedback');
  document.getElementById('awaitFeedback').innerHTML = '';

  for (let index = 0; index < awaitFeedback.length; index++) {
    const element = awaitFeedback[index];
    await setPrioImg(i);
    document.getElementById('awaitFeedback').innerHTML += generateTodoHTML(element, img);
  }
}

/**
 * Update the "To Do" area.
 */
async function doneUpdate() {
  let done = tasks.filter((t) => t['selectedCategory'] == 'done');
  document.getElementById('done').innerHTML = '';

  for (let index = 0; index < done.length; index++) {
    const element = done[index];
    await setPrioImg(i);
    document.getElementById('done').innerHTML += generateTodoHTML(element, img);
  }
}

/**
 * Allow dropping items into a drop zone.
 * @param {Event} ev - The event object.
 */
function allowDrop(ev) {
  ev.preventDefault();
}

/**
 * Move a task to a different category.
 * @param {string} category - The category to move the task to.
 */
async function moveTo(category) {
  tasks[currentDraggedElement]['currentState'] = category;
  await updateHTML();
}

/**
 * Start dragging an element.
 * @param {number} id - The ID of the element being dragged.
 */
function startDragging(id) {
  currentDraggedElement = id;
}

/**
 * Highlight a drop zone.
 * @param {string} id - The ID of the drop zone to highlight.
 */
function highlight(id) {
  document.getElementById(id).classList.add('drag-area-highlight');
}

/**
 * Remove highlight from a drop zone.
 * @param {string} id - The ID of the drop zone to remove highlight from.
 */
function removeHighlight(id) {
  document.getElementById(id).classList.remove('drag-area-highlight');
}

/**
 * Check if a task area is empty and display a message if it is.
 */
function checkTaskAreaDisplayEmpty() {
  let dragAreas = document.getElementsByClassName('drag-area');
  let categories = ['To do', 'In progress', 'Await feedback', 'Done'];

  for (let i = 0; i < dragAreas.length; i++) {
    let dragArea = dragAreas[i];
    let category = categories[i];

    if (dragArea.children.length < 1) {
      dragArea.innerHTML = /*html*/ `<div class="drag-area-empty">No task in "${category}"</div>`;
    }
  }
}

/**
 * Open the category dropdown for editing a task.
 */
function openDropDownCategoryEdit() {
  let assignedDropdownCategory = document.getElementById('assignedDropdownCategoryEdit');
  let dropdownImgArrowCategory = document.getElementById('dropdownImgArrowCategoryEdit');
  // dropdownCategory.classList.toggle('border-category-active');
  assignedDropdownCategory.classList.toggle('d-none');
  dropdownImgArrowCategory.classList.toggle('rotate-arrow');
}

/**
 * Select a category for editing a task.
 * @param {string} category - The selected category.
 */

function selectCategoryEdit(category) {
  const userStory = document.getElementById('userStoryEdit');
  const technicalTask = document.getElementById('otherEdit');
  const showSelectedCategory = document.getElementById('showSelectedCategoryEdit');
  const assignedDropdownCategory = document.getElementById('assignedDropdownCategoryEdit');
  selectCategoryIfElse(userStory, technicalTask, showSelectedCategory, assignedDropdownCategory, category);
}

/**
 * Render tasks on the board for all categories.
 */
async function renderBoardTasks() {
  await renderToDoTasks();
  await renderInProgressTasks();
  await renderAwaitFeedbackTasks();
  await renderDoneTasks();
  await checkTaskAreaDisplayEmpty();
  await setItem('tasks', JSON.stringify(tasks));
}

/**
 * Render tasks in the "To do" category.
 */
async function renderToDoTasks() {
  let contentBoxToDo = document.getElementById('todo');
  contentBoxToDo.innerHTML = '';
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i]['currentState'] == 'toDo' && tasks[i]['currentState'].length > 0) {
      let img = await setPrioImg(i);
      let x = await checkHowManySubtasksChecked(i);
      contentBoxToDo.innerHTML += generateTodoHTML(i, img, x);
      renderContactsInBoardTask(i);
      setCategoryBackground(tasks[i].selectedCategory, `board-task-epic${i}`);
      await taskProgressBar(i);
    }
  }
}

/**
 * Render tasks in the "In progress" category.
 */
async function renderInProgressTasks() {
  let contentBoxToDo = document.getElementById('inProgress');
  contentBoxToDo.innerHTML = '';
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i]['currentState'] == 'inProgress' && tasks[i]['currentState'].length > 0) {
      let img = await setPrioImg(i);
      let x = await checkHowManySubtasksChecked(i);
      contentBoxToDo.innerHTML += generateTodoHTML(i, img, x);
      renderContactsInBoardTask(i);
      setCategoryBackground(tasks[i].selectedCategory, `board-task-epic${i}`);
      await taskProgressBar(i);
    }
  }
}

/**
 * Render tasks in the "Await feedback" category.
 */
async function renderAwaitFeedbackTasks() {
  let contentBoxToDo = document.getElementById('awaitFeedback');
  contentBoxToDo.innerHTML = '';
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i]['currentState'] == 'awaitFeedback' && tasks[i]['currentState'].length > 0) {
      let img = await setPrioImg(i);
      let x = await checkHowManySubtasksChecked(i);
      contentBoxToDo.innerHTML += await generateTodoHTML(i, img, x);
      renderContactsInBoardTask(i);
      setCategoryBackground(tasks[i].selectedCategory, `board-task-epic${i}`);
      await taskProgressBar(i);
    }
  }
}

/**
 * Render tasks in the "Done" category.
 */
async function renderDoneTasks() {
  let contentBoxToDo = document.getElementById('done');
  contentBoxToDo.innerHTML = '';
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i]['currentState'] == 'done' && tasks[i]['currentState'].length > 0) {
      let img = await setPrioImg(i);
      let x = await checkHowManySubtasksChecked(i);
      contentBoxToDo.innerHTML += await generateTodoHTML(i, img, x);
      renderContactsInBoardTask(i);
      setCategoryBackground(tasks[i].selectedCategory, `board-task-epic${i}`);
      await taskProgressBar(i);
    }
  }
}

/**
 * Render contacts associated with a task on the board.
 * @param {number} x - The index of the task.
 */
function renderContactsInBoardTask(x) {
  let container = document.getElementById('contactsInBoardTask' + x);
  container.innerHTML = '';
  if (tasks[x]['selectedContacts'].length > 0) {
    for (let i = 0; i < 4; i++) {
      if (tasks[x]['selectedContacts'][i]) {
        let contact = getFirstLetters(tasks[x]['selectedContacts'][i]['name']);
        const contactColor = getContactColor(tasks[x]['selectedContacts'][i]['name']);

        container.innerHTML += renderContactsInBoardTaskHtml(contact, contactColor);
      }
    }
  }
  renderIfMoreContactsThanFour(x);
}

/**
 * Render additional contacts count if more than four contacts associated with a task.
 * @param {number} x - The index of the task.
 */
function renderIfMoreContactsThanFour(x) {
  let container = document.getElementById('contactsInBoardTask' + x);

  if (tasks[x]['selectedContacts'].length > 4) {
    let additionalContactLength = '+' + (tasks[x]['selectedContacts'].length - 4);

    container.innerHTML += renderIfMoreContactsThanFourHtml(additionalContactLength);
  }
}

/**
 * Filter tasks based on search input.
 */
function filterTasks() {
  let search = document.getElementById('searchTasks').value.toLowerCase();
  clearTasksContainer();
  if (search.trim() === '') {
    updateHTML();
  } else {
    for (let i = 0; i < tasks.length; i++) {
      let taskTitle = tasks[i]['taskTitle'];
      let taskDescription = tasks[i]['taskDescription'];
      if (taskTitle.toLowerCase().includes(search) || taskDescription.toLowerCase().includes(search)) {
        renderSearchedTasks(i);
      }
    }
  }
}

/**
 * Clear the task containers on the board.
 */
function clearTasksContainer() {
  document.getElementById('todo').innerHTML = ``;
  document.getElementById('inProgress').innerHTML = ``;
  document.getElementById('awaitFeedback').innerHTML = ``;
  document.getElementById('done').innerHTML = ``;
}

/**
 * Render searched tasks.
 * @param {number} i - The index of the task.
 */
function renderSearchedTasks(i) {
  if (tasks[i]['currentState'] == 'toDo') {
    renderSearchedTasksToDo(i);
  }
  if (tasks[i]['currentState'] == 'inProgress') {
    renderSearchedTasksInProgress(i);
  }
  if (tasks[i]['currentState'] == 'awaitFeedback') {
    renderSearchedTasksAwaitFeedback(i);
  }
  if (tasks[i]['currentState'] == 'done') {
    renderSearchedTasksDone(i);
  }
  checkTaskAreaDisplayEmpty();
}

/**
 * Render searched tasks in the "To do" category.
 * @param {number} i - The index of the task.
 */
async function renderSearchedTasksToDo(i) {
  let contentBoxToDo = document.getElementById('todo');
  let img = await setPrioImg(i);
  let x = await checkHowManySubtasksChecked(i);
  contentBoxToDo.innerHTML += generateTodoHTML(i, img, x);
  setCategoryBackground(tasks[i].selectedCategory, `board-task-epic${i}`);
  await taskProgressBar(i);
}

/**
 * Render searched tasks in the "In progress" category.
 * @param {number} i - The index of the task.
 */
async function renderSearchedTasksInProgress(i) {
  let contentBoxInProress = document.getElementById('inProgress');
  let img = await setPrioImg(i);
  let x = await checkHowManySubtasksChecked(i);
  contentBoxInProress.innerHTML += generateTodoHTML(i, img, x);
  setCategoryBackground(tasks[i].selectedCategory, `board-task-epic${i}`);
  await taskProgressBar(i);
}

/**
 * Render searched tasks in the "Await feedback" category.
 * @param {number} i - The index of the task.
 */
async function renderSearchedTasksAwaitFeedback(i) {
  let contentBoxAwaitFeedback = document.getElementById('awaitFeedback');
  let img = await setPrioImg(i);
  let x = await checkHowManySubtasksChecked(i);
  contentBoxAwaitFeedback.innerHTML += generateTodoHTML(i, img, x);
  setCategoryBackground(tasks[i].selectedCategory, `board-task-epic${i}`);
  await taskProgressBar(i);
}

/**
 * Render searched tasks in the "Done" category.
 * @param {number} i - The index of the task.
 */
async function renderSearchedTasksDone(i) {
  let contentBoxDone = document.getElementById('done');
  let img = await setPrioImg(i);
  let x = await checkHowManySubtasksChecked(i);
  contentBoxDone.innerHTML += generateTodoHTML(i, img, x);
  setCategoryBackground(tasks[i].selectedCategory, `board-task-epic${i}`);
  await taskProgressBar(i);
}

/**
 * Prevent closing event propagation.
 * @param {Event} event - The event object.
 */
function doNotClose(event) {
  event.stopPropagation();
}

/**
 * Open the move to menu.
 */
function openMenuMoveTo() {
  let container = document.getElementById('menuMoveToMobile');
  container.classList.toggle('d-none');
}

/**
 * Move a task to a different category in mobile view.
 * @param {number} i - The index of the task.
 * @param {string} category - The category to move the task to.
 */
async function moveToMobile(i, category) {
  tasks[i]['currentState'] = category;
  await openMenuMoveTo();
  await renderBoardTasks();
}

/**
 * Toggle the active state of a subtask.
 * @param {number} j - The index of the subtask.
 * @param {number} i - The index of the task.
 * @returns {Promise<void>}
 */
async function subTaskActive(j, i) {
  let checkbox = document.getElementById('checkboxSubtask-' + j);
  if (checkbox.checked === false) {
    checkbox.checked = true;
    tasks[i]['subtasks'][j]['isActive'] = true;
    await setItem('tasks', JSON.stringify(tasks));
    return;
  }
  if (checkbox.checked === true) {
    checkbox.checked = false;
    tasks[i]['subtasks'][j]['isActive'] = false;
    await setItem('tasks', JSON.stringify(tasks));
    return;
  }
}

/**
 * Check the active state of subtasks and update the UI.
 * @param {number} i - The index of the task.
 */
function checkSubTaskInfoChecked(i) {
  for (let j = 0; j < tasks[i]['subtasks'].length; j++) {
    const isActive = tasks[i]['subtasks'][j]['isActive'];
    let checkbox = document.getElementById('checkboxSubtask-' + j);
    if (isActive === true) {
      checkbox.checked = true;
    }
    if (isActive === false) {
      checkbox.checked = false;
    }
  }
}

/**
 * Update the task progress bar based on the completion of subtasks.
 * @param {number} i - The index of the task.
 * @returns {Promise<void>}
 */
async function taskProgressBar(i) {
  let x = await checkHowManySubtasksChecked(i);
  let progressBar = document.getElementById('progress-' + i);
  let allSubtasks = tasks[i]['subtasks'].length;
  let width = (100 / allSubtasks) * x;
  progressBar.style.width = `${width}%`;
}

/**
 * Count the number of subtasks that are checked.
 * @param {number} i - The index of the task.
 * @returns {number} The number of checked subtasks.
 */
function checkHowManySubtasksChecked(i) {
  let x = 0;
  for (let j = 0; j < tasks[i]['subtasks'].length; j++) {
    let checked = tasks[i]['subtasks'][j]['isActive'];
    if (checked === true) {
      x++;
    }
  }
  return x;
}
