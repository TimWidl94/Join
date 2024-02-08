let currentDraggedElement;

async function initBoard() {
  await loadData();
  await loadUser();
  await updateHTML();
  await includeHTML();
  setUserInitials();
  setColorToActive('sidebarBoard', 'board-img', 'bottomBarBoardMobile', 'boardImgMobile');
  await renderAddTask();
  await renderSubTask();
  await showTaskForm()

}

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

  taskPopup.innerHTML = '';
  taskPopup.innerHTML = generateTaskPopupHTML(i);

  renderAssignedToContacs(i);
  renderSubtasks(i, 'subtaskContainerPopup');
  selectPrioImage(i);
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
      assingedToContainer.innerHTML += /*html*/ `
        <div class="assigned-contact">
        <div class="assinged-contact-profile" style="background-color: ${contactColor}">${capitalLetters}</div>
                <p class="aTPopupP">${selectedContact.name}</p>
        </div>
      `;
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
      subTaskContainer.innerHTML += /*html*/ `
        <div class="subtask">
          <input type="checkbox" id="checkboxSubtask-${j}" class="checkboxSavePassword" />
          <label for="checkboxSubtask-${j}" ></label>
          <p class="aTPopupP">${subTask.subTaskInput}</p>
        </div>
      `;
    }
  }
}

function renderAssignedToDropdownEdit() {
  let assignedTo = document.getElementById('assignedTo');
  assignedTo.innerHTML = /*html*/ `
    <div name="assigned" onchange="addAssignedContact()">
      <div id="dropdown" class="dropdown" onclick="openDropDown()">
        <input class="contact-searchbar" onkeyup="filterAddTaskContact()" type="text" id="search" placeholder="Select contacts to assign" />
        <img id="dropdownImgArrow" class="rotate-arrow dropdown-arrow-hover dropdown-arrow-hover" src="../assets/img/AddTask/arrow_drop.svg" alt="">
      </div>
    </div>
    <div id="assignedDropdown" class="d-none">
      <div id="assignedAddedContacts"></div>
    </div>
  `;

  renderAssignedToContacsEdit() {};
}

function renderAssignedToContacsEdit() {

  for (let i = 0; i < contacts.length; i++) {
    let currentUser = contacts[i]['name'];
    let initials = getInitials(currentUser);
    let color = contacts[i]['color'];
    let assignedDropdown = document.getElementById('assignedDropdown');
    assignedDropdown.innerHTML += /*html*/ `
      <div id="user-${i}" class="flex-checkbox selected-profile" onclick="addAssignedContact(${i}, '${color}')" data-value="${currentUser}">
        <div class="selected-profile"><div class="assinged-contact-profile" style="background-color:${color}">${initials}</div>
        <span class="assigned-name">${currentUser}</span></div>
        <img id="hoverCheckbox" class="hover-checkbox" src="assets/img/icons/checkBoxWhite.svg" alt="">
        <img id="checkBox-${i}" class="flex-checkbox-img"src="assets/img/icons/checkBox.svg" alt="">
      `;
  }
}

function selectPrioImage(i) {
  let prio = tasks[i].prio;
  let prioImage = document.getElementById('aTPopupPrioImg');
  if (prio == 'low') {
    prioImage.src = 'assets/img/AddTask/ArrowDownPrioSign.svg';
  } else if (prio == 'medium') {
    prioImage.src = 'assets/img/AddTask/mediumPrioSignInactive.svg';
  } else {
    prioImage.src = 'assets/img/addTask/ArrowUpPrioSign.svg';
  }
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
  renderSubTasksInput();
  renderSubTasksEditable(i, 'subTaskContainerEdit');

  let title = document.getElementById('taskTitleEdit');
  let description = document.getElementById('taskDescriptionEdit');
  let dueDate = document.getElementById('myDateInputEdit');
  let prio = tasks[i].prio;

  title.value = tasks[i].taskTitle;
  description.value = tasks[i].taskDescription;
  dueDate.value = tasks[i].taskDueDate;
  // prio = select;

  console.log('tasks[i].taskTitle;', tasks[i].taskTitle);
}

async function saveEditedTask(i) {
  let title = document.getElementById('taskTitleEdit');
  let description = document.getElementById('taskDescriptionEdit');
  let dueDate = document.getElementById('myDateInputEdit');

  tasks[i].taskTitle = title.value;
  tasks[i].taskDescription = description.value;
  tasks[i].taskDueDate = dueDate.value;

  await setItem('tasks', JSON.stringify(tasks));
  closeTaskPopup();
  renderBoardTasks();
}

function renderSubTasksInput() {
  let container = document.getElementById('subtasksEdit');
  container.innerHTML += subTaskInputHtml();
}

function renderSubTasksEditable(i, id1) {
  let container = document.getElementById(id1);
  container.innerHTML = ``;

  const task = tasks[i];

  if (task.subtasks?.length > 0) {
    for (let j = 0; j < task.subtasks.length; j++) {
      let subTask = task.subtasks[j];
      let id = task.subtasks[j]['id'];
      container.innerHTML += subTasksValueEditHtml(id, subTask);
    }
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
  checkTaskAreaDisplayEmpty();
  renderBoardTasks();
}

async function todoAreaUpdate() {
  let todo = tasks.filter((t) => t['selectedCategory'] == 'toDo');

  document.getElementById('todo').innerHTML = '';

  for (let index = 0; index < todo.length; index++) {
    const element = todo[index];
    await setPrioImg(i);
    document.getElementById('todo').innerHTML += generateTodoHTML(element, img);
  }
}

async function inProgressUdate() {
  let inProgress = tasks.filter((t) => t['selectedCategory'] == 'inProgress');

  document.getElementById('inProgress').innerHTML = '';

  for (let index = 0; index < inProgress.length; index++) {
    const element = inProgress[index];
    await setPrioImg(i);
    document.getElementById('inProgress').innerHTML += generateTodoHTML(element, img);
  }
}

async function feedbackAreaUdate() {
  let awaitFeedback = tasks.filter((t) => t['selectedCategory'] == 'awaitFeedback');

  document.getElementById('awaitFeedback').innerHTML = '';

  for (let index = 0; index < awaitFeedback.length; index++) {
    const element = awaitFeedback[index];
    await setPrioImg(i);
    document.getElementById('awaitFeedback').innerHTML += generateTodoHTML(element, img);
  }
}

async function doneUpdate() {
  let done = tasks.filter((t) => t['selectedCategory'] == 'done');

  document.getElementById('done').innerHTML = '';

  for (let index = 0; index < done.length; index++) {
    const element = done[index];
    await setPrioImg(i);
    document.getElementById('done').innerHTML += generateTodoHTML(element, img);
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

function allowDrop(ev) {
  ev.preventDefault();
}

function moveTo(category) {
  tasks[currentDraggedElement]['currentState'] = category;
  updateHTML();
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

    if (dragArea.children.length === 0) {
      dragArea.innerHTML = /*html*/ `<div class="drag-area-empty">No tasks To do</div>`;
    }
  }
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
    let contact = tasks[x]['selectedContacts'][i]['name'];
    const contactColor = getContactColor(contact);
    console.log(contactColor);

    container.innerHTML += `
    <div class="board-task-member-profile" style="background-color: ${contactColor}">${contact}</div>
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
