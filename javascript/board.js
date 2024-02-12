let currentDraggedElement;
let selectedPrioPopupEdit;

async function initBoard() {
  await loadData();
  await loadUser();
  await updateHTML();
  await includeHTML();
  setUserInitials();
  setColorToActive('sidebarBoard', 'board-img', 'bottomBarBoardMobile', 'boardImgMobile');
  await renderAddTask();
  await renderSubTask();
  await showTaskForm('assignedTo');
  checkTaskAreaDisplayEmpty();
}

// function checkIfFormEditPopupIsFilled() {
//   let title = document.getElementById('taskTitle');
//   let dueDate = document.getElementById('myDateInput');
//   if ((categoryIsSelected = true && title.value > '' && dueDate.value > '')) {
//     document.getElementById('create-task').disabled = false;
//   }
// }

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

function openAddTaskPopup() {
  document.getElementById('addTaskPopup').classList.remove('d-none');
  document.getElementById('addTaskPopup').classList.add('slide-in');
  console.log('works!');
}

function closeAddTaskPopup() {
  let addTaskPopup = document.getElementById('addTaskPopup');
  addTaskPopup.classList.remove('slide-in');
  addTaskPopup.classList.add('slide-out');

  setTimeout(function () {
    addTaskPopup.classList.add('d-none');
  }, 500);
  setTimeout(function () {
    addTaskPopup.classList.remove('slide-out');
  }, 900);
}

function openTaskPopup(i) {
  let taskPopup = document.getElementById('aTPopupWrapper');
  taskPopup.classList.remove('d-none');
  taskPopup.classList.add('d-block');

  let img = setPrioImg(i);
  let date = convertDateFormat(tasks[i].taskDueDate);
  taskPopup.innerHTML = '';
  taskPopup.innerHTML = generateTaskPopupHTML(i, img, date);
  setCategoryBackground(tasks[i]['selectedCategory'], `aTPopupCategory${i}`);

  renderAssignedToContacs(i);
  renderSubtasks(i, 'subtaskContainerPopup');
}

function closeTaskPopup() {
  document.getElementById('aTPopupWrapper').classList.remove('d-block');
  document.getElementById('aTPopupWrapper').classList.add('d-none');
}

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

function getContactColor(selectedContactName) {
  let index = contacts.findIndex((contact) => contact.name === selectedContactName);
  if (index !== -1) {
    return contacts[index].color;
  }
}

function renderSubtasks(i, id) {
  let subTaskContainer = document.getElementById(id);
  subTaskContainer.innerHTML = '';

  const task = tasks[i];

  if (task.subtasks?.length > 0) {
    for (let j = 0; j < task.subtasks.length; j++) {
      const subTask = task.subtasks[j];
      subTaskContainer.innerHTML += renderSubtasksInfoHtml(j, subTask);
    }
  }
}

function setPrioImg(i) {
  if (tasks[i]['prio'] == 'low') {
    let img = './assets/img/AddTask/ArrowDownPrioSign.svg';
    return img;
  }
  if (tasks[i]['prio'] == 'medium') {
    let img = './assets/img/AddTask/mediumPrioSignInactive.svg';
    return img;
  }
  if (tasks[i]['prio'] == 'urgent') {
    let img = './assets/img/AddTask/ArrowUpPrioSign.svg';
    return img;
  }
}

function convertDateFormat(date) {
  let parts = date.split('-');
  let newDate = parts[2] + '/' + parts[1] + '/' + parts[0];
  return newDate;
}

function deleteTask(i) {
  tasks.splice(i, 1);
  closeTaskPopup();
  updateHTML();
}

function editTask(i) {
  let popupInfo = document.getElementById('aTPopup');
  let popupEdit = document.getElementById('aTPopupEdit');

  popupEdit.classList.remove('d-none');
  popupInfo.classList.add('d-none');
  renderEditTask(i);

  let title = document.getElementById('taskTitleEdit');
  let description = document.getElementById('taskDescriptionEdit');
  let dueDate = document.getElementById('myDateInputEdit');
  let selectedCategoryElement = document.getElementById('showSelectedCategoryEdit');

  title.value = tasks[i].taskTitle;
  description.value = tasks[i].taskDescription;
  dueDate.value = tasks[i].taskDueDate;
  selectedCategoryElement.textContent = setCategoryTextContent(i);
  setPrioEdit(tasks[i].prio);
}

function setCategoryTextContent(i) {
  if (tasks[i].selectedCategory == '') {
    return 'Select task category';
  } else {
    return tasks[i].selectedCategory;
  }
}

function addSubTaskEdit(idInput, idContainer, i) {
  let subTaskInput = document.getElementById(idInput).value;
  let subTaskError = document.getElementById('subTaskErrorEdit');
  let nr;
  if (subTaskInput == 0) {
    subTaskError.innerHTML = /*HTML*/ `
    Subtask bitte bei Bedarf hinzufügen.`;
  } else {
    subTaskError.innerHTML = /*HTML*/ ``;
    if (tasks[i].subtasks.length > 0) {
      addExistingSubtasks(i);
    }
    nr = subtasks.length;
    subtasks.push({
      subTaskInput: subTaskInput,
      id: nr,
    });
    document.getElementById(idInput).value = '';
    renderGeneratedSubTasksEdit(idContainer);
    resetSubTaskInputField(idInput);
  }
}

function addExistingSubtasks(i) {
  let task = tasks[i];

  for (let j = 0; j < task.subtasks.length; j++) {
    let subtaskInput = task.subtasks[j]['subTaskInput'];
    let index = j;
    subtasks.push({
      subTaskInput: subtaskInput,
      id: index,
    });
  }
}

function renderGeneratedSubTasksEdit(idContainer) {
  let container = document.getElementById(idContainer);
  container.innerHTML = ``;

  for (let i = 0; i < subtasks.length; i++) {
    let id = subtasks[i]['id'];
    let subTaskInput = subtasks[i]['subTaskInput'];
    container.innerHTML += subTasksValueEditHtml(id, subTaskInput);
  }
}

function renderEditTask(i) {
  renderSubTasksInput(i);
  renderSubTasksEditable(i, 'subTaskContainerEdit');
  showTaskFormEdit('assignedToEdit');
}

function renderSubTasksInput(i) {
  let container = document.getElementById('subtasksEdit');
  container.innerHTML += subTaskInputEditHtml(i);
}

function renderSubTasksEditable(i, id1) {
  let container = document.getElementById(id1);
  container.innerHTML = ``;

  const task = tasks[i];

  if (task.subtasks?.length > 0) {
    for (let j = 0; j < task.subtasks.length; j++) {
      let subTask = task.subtasks[j];
      let id = task.subtasks[j]['id'];
      container.innerHTML += subTasksValueEditHtml(id, subTask.subTaskInput);
    }
  }
}

function showTaskFormEdit(id) {
  let assignedTo = document.getElementById(id);
  assignedTo.innerHTML = /*html*/ `
    <div name="assigned" onchange="addAssignedContact()">
      <div id="dropdownEdit" class="dropdownEdit" onclick="openDropDown()">
        <input class="contact-searchbar" onkeyup="filterAddTaskContact()" type="text" id="search" placeholder="Select contacts to assign" />
        <img id="dropdownImgArrow" class="rotate-arrow dropdown-arrow-hover dropdown-arrow-hover" src="../assets/img/AddTask/arrow_drop.svg" alt="">
      </div>
    </div>
    <div id="assignedDropdown" class="assignedDropdownEdit d-none">
      <div id="assignedAddedContacts"></div>
    </div>
  `;
}

function changeButtonsAddTaskEdit(id, i) {
  let inputField = document.getElementById(id);

  inputField.innerHTML = /*html*/ `
    <input id="subTaskInputEdit" type="text" placeholder="Add new subtask" class="PosRel" />
    <div class="subTaskInputButtons">
      <img class="subTaskInputImg" onclick="setValueBack('subTaskInputEdit', 'subtasksEdit')" src="./assets/img/icons/close.svg" alt="">
      <span class="subTaskInputImg-vertical"></span>
      <img class="subTaskInputImg checkImg" onclick="addSubTaskEdit('subTaskInputEdit', 'subTaskContainerEdit', ${i})" src="./assets/img/icons/checkAddTask.svg" alt="">
    </div>
  `;
  document.getElementById('subTaskInput').focus();
}

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
}

function changePriorityEdit(idContainer, idImg, priority) {
  let prioContainer = document.getElementById(idContainer);
  let img = document.getElementById(idImg);

  document.getElementById('urgentContainerEdit').classList.remove('priorityUrgentActive');
  document.getElementById('urgentImgEdit').src = './assets/img/addTask/ArrowUpPrioSign.svg';
  document.getElementById('mediumContainerEdit').classList.remove('priorityMediumActive');
  document.getElementById('mediumImgEdit').src = './assets/img/addTask/mediumPrioSignInactive.svg';
  document.getElementById('lowContainerEdit').classList.remove('priorityLowActive');
  document.getElementById('lowImgEdit').src = './assets/img/addTask/ArrowDownPrioSign.svg';

  prioContainer.classList.add('priority' + priority.charAt(0).toUpperCase() + priority.slice(1) + 'Active');
  img.src = './assets/img/addTask/' + priority + 'PrioActive.svg';
  selectedPrioPopupEdit = priority;
}

async function saveEditedTask(i) {
  let title = document.getElementById('taskTitleEdit');
  let description = document.getElementById('taskDescriptionEdit');
  let dueDate = document.getElementById('myDateInputEdit');

  let selectedCategoryElement = document.getElementById('showSelectedCategoryEdit');
  let selectedCategory = selectedCategoryElement.getAttribute('data-value');

  tasks[i].taskTitle = title.value;
  tasks[i].taskDescription = description.value;
  tasks[i].taskDueDate = dueDate.value;
  tasks[i].selectedCategory = selectedCategory;
  tasks[i].prio = selectedPrioPopupEdit;
  saveAddedSubtasks(i);

  closeTaskPopup();
  updateHTML();
  await setItem('stasks', JSON.stringify(tasks));
}

function saveAddedSubtasks(i) {
  let task = tasks[i];
  for (let j = 0; j < subtasks.length; j++) {
    let subTaskInput = subtasks[j].subTaskInput;
    let nr = subtasks[j].id;
    task.subtasks.push({
      subTaskInput: subTaskInput,
      id: nr,
    });
    console.log('Saved tasks[i].subtasks:', task.subtasks);
  }
}

function setCategoryBackground(category, id) {
  if (category == 'user-story') {
    document.getElementById(id).classList.add('board-task-epic-green');
  }
  if (category === 'other') {
    document.getElementById(id).classList.add('board-task-epic-blue');
  }
}

function startDragging(id) {
  currentDraggedElement = id;
}

function updateHTML() {
  todoAreaUpdate();
  inProgressUdate();
  feedbackAreaUdate();
  doneUpdate();
  renderBoardTasks();
}

async function todoAreaUpdate() {
  let todo = tasks.filter((t) => t['selectedCategory'] == 'toDo');
  console.log('todo.length', todo.length);
  document.getElementById('todo').innerHTML = '';

  for (let index = 0; index < todo.length; index++) {
    console.log('todoAreaUpdate123');

    const element = todo[index];
    await setPrioImg(i);
    document.getElementById('todo').innerHTML += generateTodoHTML(element, img);
    setCategoryBackground(tasks[index]['selectedCategory'], `board-task-epic${i}`);
  }
}

async function inProgressUdate() {
  let inProgress = tasks.filter((t) => t['selectedCategory'] == 'inProgress');
  console.log('inProgress.length', inProgress.length);
  document.getElementById('inProgress').innerHTML = '';

  for (let index = 0; index < inProgress.length; index++) {
    const element = inProgress[index];
    await setPrioImg(i);
    // setCategoryBackground(tasks[index]['selectedCategory'], index);
    console.log("tasks[index]['selectedCategory']", tasks[index]['selectedCategory']);
    document.getElementById('inProgress').innerHTML += generateTodoHTML(element, img);
  }
}

async function feedbackAreaUdate() {
  let awaitFeedback = tasks.filter((t) => t['selectedCategory'] == 'awaitFeedback');
  console.log('awaitFeedback.length', awaitFeedback.length);

  document.getElementById('awaitFeedback').innerHTML = '';

  for (let index = 0; index < awaitFeedback.length; index++) {
    const element = awaitFeedback[index];
    await setPrioImg(i);
    document.getElementById('awaitFeedback').innerHTML += generateTodoHTML(element, img);
  }
}

async function doneUpdate() {
  let done = tasks.filter((t) => t['selectedCategory'] == 'done');
  console.log('done.length', done.length);

  document.getElementById('done').innerHTML = '';

  for (let index = 0; index < done.length; index++) {
    const element = done[index];
    await setPrioImg(i);
    document.getElementById('done').innerHTML += generateTodoHTML(element, img);
  }
}

function allowDrop(ev) {
  ev.preventDefault();
}

async function moveTo(category) {
  tasks[currentDraggedElement]['currentState'] = category;
  await updateHTML();
  checkTaskAreaDisplayEmpty();
}

function highlight(id) {
  document.getElementById(id).classList.add('drag-area-highlight');
}

function removeHighlight(id) {
  document.getElementById(id).classList.remove('drag-area-highlight');
}

function checkTaskAreaDisplayEmpty() {
  let dragAreas = document.getElementsByClassName('drag-area');

  for (let i = 0; i < dragAreas.length; i++) {
    let dragArea = dragAreas[i];

    if (dragArea.children.length < 1) {
      dragArea.innerHTML = /*html*/ `<div class="drag-area-empty">No tasks To do</div>`;
    }
  }
}

function openDropDownCategoryEdit() {
  let assignedDropdownCategory = document.getElementById('assignedDropdownCategoryEdit');
  let dropdownImgArrowCategory = document.getElementById('dropdownImgArrowCategoryEdit');
  // dropdownCategory.classList.toggle('border-category-active');
  assignedDropdownCategory.classList.toggle('d-none');
  dropdownImgArrowCategory.classList.toggle('rotate-arrow');
}

function selectCategoryEdit(category) {
  const userStory = document.getElementById('userStoryEdit');
  const other = document.getElementById('otherEdit');
  const showSelectedCategory = document.getElementById('showSelectedCategoryEdit');
  const assignedDropdownCategory = document.getElementById('assignedDropdownCategoryEdit');
  selectCategoryIfElse(userStory, other, showSelectedCategory, assignedDropdownCategory, category);
  // checkIfFormIsFilledEdit();
}

async function renderBoardTasks() {
  renderToDoTasks();
  renderInProgressTasks();
  renderAwaitFeedbackTasks();
  renderDoneTasks();
  await setItem('tasks', JSON.stringify(tasks));
}

async function renderToDoTasks() {
  let contentBoxToDo = document.getElementById('todo');
  contentBoxToDo.innerHTML = '';
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i]['currentState'] == 'toDo') {
      let img = await setPrioImg(i);
      contentBoxToDo.innerHTML += generateTodoHTML(i, img);
      renderContactsInBoardTask(i);
    }
  }
}

async function renderInProgressTasks() {
  let contentBoxToDo = document.getElementById('inProgress');
  contentBoxToDo.innerHTML = '';
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i]['currentState'] == 'inProgress') {
      let img = await setPrioImg(i);
      contentBoxToDo.innerHTML += generateTodoHTML(i, img);
      renderContactsInBoardTask(i);
    }
  }
}

async function renderAwaitFeedbackTasks() {
  let contentBoxToDo = document.getElementById('awaitFeedback');
  contentBoxToDo.innerHTML = '';
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i]['currentState'] == 'awaitFeedback') {
      let img = await setPrioImg(i);
      contentBoxToDo.innerHTML += await generateTodoHTML(i, img);
      renderContactsInBoardTask(i);
    }
  }
}

async function renderDoneTasks() {
  let contentBoxToDo = document.getElementById('done');
  contentBoxToDo.innerHTML = '';
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i]['currentState'] == 'done') {
      let img = await setPrioImg(i);
      contentBoxToDo.innerHTML += await generateTodoHTML(i, img);
      renderContactsInBoardTask(i);
    }
  }
}

function renderContactsInBoardTask(x) {
  let container = document.getElementById('contactsInBoardTask' + x);
  container.innerHTML = '';
  for (let i = 0; i < tasks[x]['selectedContacts'].length; i++) {
    let contact = getFirstLetters(tasks[x]['selectedContacts'][i]['name']);
    const contactColor = getContactColor(tasks[x]['selectedContacts'][i]['name']);

    container.innerHTML += `
    <div class="board-task-member-profile" style="background-color: ${contactColor} !important">${contact}</div>
    `;
  }
}

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

function clearTasksContainer() {
  document.getElementById('todo').innerHTML = ``;
  document.getElementById('inProgress').innerHTML = ``;
  document.getElementById('awaitFeedback').innerHTML = ``;
  document.getElementById('done').innerHTML = ``;
}

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

function renderSearchedTasksToDo(i) {
  let contentBoxToDo = document.getElementById('todo');
  contentBoxToDo.innerHTML += generateTodoHTML(i);
}

function renderSearchedTasksInProgress(i) {
  let contentBoxInProress = document.getElementById('inProgress');
  contentBoxInProress.innerHTML += generateTodoHTML(i);
}

function renderSearchedTasksAwaitFeedback(i) {
  let contentBoxAwaitFeedback = document.getElementById('awaitFeedback');
  contentBoxAwaitFeedback.innerHTML += generateTodoHTML(i);
}

function renderSearchedTasksDone(i) {
  let contentBoxDone = document.getElementById('done');
  contentBoxDone.innerHTML += generateTodoHTML(i);
}

function doNotClose(event) {
  event.stopPropagation();
}
