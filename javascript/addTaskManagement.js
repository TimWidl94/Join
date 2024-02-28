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
 * Clears the input value and resets the task form.
 */
function clearInputValue() {
  renderAddTask();
  showTaskForm('assignedTo');
  changePrioToMedium('mediumContainer', 'mediumImg');
  renderSubTask();
}


/**
 * Clears the input value and resets the task form from the popup.
 */
function clearInputValuePopup() {
  renderAddTaskPopUp();
  showTaskForm('assignedTo');
  changePrioToMedium('mediumContainer', 'mediumImg');
  renderSubTask();
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
 * Changes the priority of a task to medium.
 *
 * @param {string} idContainer - The ID of the priority container.
 * @param {string} idImg - The ID of the priority image.
 */
function changePrioToMedium(idContainer, idImg) {
  let prioContainer = document.getElementById(idContainer);
  let img = document.getElementById(idImg);

  prioContainer.classList.add('priorityMediumActive');
  img.src = './assets/img/AddTask/mediumPrioSign.svg';
  selectedPrio = 'medium';
  document.getElementById('urgentContainer').classList.remove('priorityUrgentActive');
  document.getElementById('urgentImg').src = './assets/img/AddTask/ArrowUpPrioSign.svg';
  document.getElementById('lowContainer').classList.remove('priorityLowActive');
  document.getElementById('lowImg').src = './assets/img/AddTask/ArrowDownPrioSign.svg';
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
  img.src = './assets/img/AddTask/urgentPrioActive.svg';
  selectedPrio = 'urgent';
  document.getElementById('mediumContainer').classList.remove('priorityMediumActive');
  document.getElementById('mediumImg').src = './assets/img/AddTask/mediumPrioSignInactive.svg';
  document.getElementById('lowContainer').classList.remove('priorityLowActive');
  document.getElementById('lowImg').src = './assets/img/AddTask/ArrowDownPrioSign.svg';
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
  document.getElementById('urgentImg').src = './assets/img/AddTask/ArrowUpPrioSign.svg';
  document.getElementById('mediumContainer').classList.remove('priorityMediumActive');
  document.getElementById('mediumImg').src = './assets/img/AddTask/mediumPrioSignInactive.svg';
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
  selectCategoryIfElse(category, userStory, technicalTask, showSelectedCategory, assignedDropdownCategory);
  checkIfFormIsFilled(id);
}


/**
 * Selects a category for the task.
 *
 * @param {string} category - The category selected for the task.
 * @param {HTMLElement} userStory - The user story category element.
 * @param {HTMLElement} technicalTask - The technical task category element.
 * @param {HTMLElement} showSelectedCategory - The element displaying the selected category.
 * @param {HTMLElement} assignedDropdownCategory - The dropdown category element.
 */
function selectCategoryIfElse(category, userStory, technicalTask, showSelectedCategory, assignedDropdownCategory) {
  if (category === 'user-story' || category === 'User Story') {
    selectUserStory(userStory, technicalTask, showSelectedCategory, assignedDropdownCategory, category);
  } else if (category === 'technical-task' || category === 'Technical Task') {
    selectTechnicalTask(userStory, technicalTask, showSelectedCategory, assignedDropdownCategory, category);
  } else {
    selectDefaultCategory(userStory, technicalTask, showSelectedCategory, assignedDropdownCategory);
  }
}


/**
 * Selects the user story category.
 *
 * @param {HTMLElement} userStory - The user story category element.
 * @param {HTMLElement} technicalTask - The technical task category element.
 * @param {HTMLElement} showSelectedCategory - The element displaying the selected category.
 * @param {HTMLElement} assignedDropdownCategory - The dropdown category element.
 */
function selectUserStory(userStory, technicalTask, showSelectedCategory, assignedDropdownCategory, category) {
  userStory.classList.add('category-selected');
  technicalTask.classList.remove('category-selected');
  showSelectedCategory.setAttribute('data-value', category);
  showSelectedCategory.innerHTML = `User Story`;
  assignedDropdownCategory.classList.add('d-none');
  categoryIsSelected = true;
}


/**
 * Selects the technical task category.
 *
 * @param {HTMLElement} userStory - The user story category element.
 * @param {HTMLElement} technicalTask - The technical task category element.
 * @param {HTMLElement} showSelectedCategory - The element displaying the selected category.
 * @param {HTMLElement} assignedDropdownCategory - The dropdown category element.
 */
function selectTechnicalTask(userStory, technicalTask, showSelectedCategory, assignedDropdownCategory, category) {
  technicalTask.classList.add('category-selected');
  userStory.classList.remove('category-selected');
  showSelectedCategory.setAttribute('data-value', category);
  showSelectedCategory.innerHTML = `Technical Task`;
  assignedDropdownCategory.classList.add('d-none');
  categoryIsSelected = true;
}


/**
 * Selects the default category.
 *
 * @param {HTMLElement} userStory - The user story category element.
 * @param {HTMLElement} technicalTask - The technical task category element.
 * @param {HTMLElement} showSelectedCategory - The element displaying the selected category.
 * @param {HTMLElement} assignedDropdownCategory - The dropdown category element.
 */
function selectDefaultCategory(userStory, technicalTask, showSelectedCategory, assignedDropdownCategory) {
  userStory.classList.remove('category-selected');
  technicalTask.classList.remove('category-selected');
  showSelectedCategory.setAttribute('data-value', '');
  showSelectedCategory.innerHTML = `Select task category`;
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
  let index = selectedContacts.findIndex((contact) => contact.name === selectedContact && contact.color === color);
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
    addSubTaskFinalize(idInput, idContainer);
  }
}


/**
 * Adds a subtask and finalizes the process by clearing the input field, rendering generated subtasks, and resetting the input field style.
 *
 * @param {string} idInput - The ID of the input field for the subtask.
 * @param {string} idContainer - The ID of the container where generated subtasks are rendered.
 */
function addSubTaskFinalize(idInput, idContainer) {
  document.getElementById(idInput).value = '';
  renderGeneratedSubTasks(idContainer);
  resetSubTaskInputField(idInput);
}


/**
 * Finds the position of a subtask with the given ID.
 *
 * @param {string} id - The ID of the subtask to find.
 * @returns {number} - The index of the subtask in the subtasks array, or -1 if not found.
 */
function findSubtaskPosition(id) {
  let nr = subtasks.findIndex((obj) => obj.id === id);
  return nr;
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


/**
 * Sets the value of 'isChoosen' to 'false' for all contacts in the list and saves the updated contacts.
 */
async function resetIsChoosenValue() {
  for (let i = 0; i < contacts.length; i++) {
    let contact = contacts[i];
    contact['isChoosen'] = false;
  }
  await saveContacts();
}


/**
 * Toggles the 'isChoosen' value of the contact at the specified index.
 * If the value is currently true, it sets it to false, and vice versa.
 * Saves the updated contacts after toggling.
 *
 * @param {number} i - The index of the contact to toggle.
 */
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
