function addTaskHtml() {
  return /*html*/ `
    <form onsubmit="addTask('myDateInput', 'toDo'); return false" class="formAddTask">
      <section class="container-left-right-wrapper">
        <section class="container-left">
        
          <div class="headline-add-task"><h1 class="headline-h1-add-task">Add Task</h1></div>

          <div id="title-add-task">
            <p>Title<span class="span-required">*</span></p>
            <input id="taskTitle" required type="text" maxlength="100" class="border-focus" placeholder="Enter a title" onkeydown="checkIfFormIsFilled('myDateInput')"/>
          </div>

          <div id="description">
            <p>Description</p>
            <textarea id="taskDescription" class="border-focus" maxlength="200" placeholder="Enter a description"></textarea>
          </div>

          <p class="text-padding">Assigned to</p>
          <div id="assignedTo">
          </div>

          <div class="assinged-contact-wrapper">
            <div id="assignedAddedContact" class="assinged-contact">
            </div>
          </div>
        </section>

        <div class="vertical-line-add-task"></div>

        <section class="container-right">

          <p>Due Date<span class="span-required">*</span></p>
          <div id="due-date">
            <label for="myDateInput"></label>
            <input id="myDateInput" type="date" required>
          </div>

          <div class="priority">
            <p>Prio</p>
            <div class="priority-options">
              <div id="urgentContainer" onclick="changePrioToUrgent('urgentContainer', 'urgentImg')">
                <p>Urgent</p>
                <img src="assets/img/AddTask/ArrowUpPrioSign.svg" alt="Prio High" id="urgentImg" />
              </div>
              <div id="mediumContainer" onclick="changePrioToMedium('mediumContainer', 'mediumImg')">
                <p>Medium</p>
                <img src="assets/img/AddTask/mediumPrioSignInactive.svg" alt="Prio Medium" id="mediumImg" />
              </div>
              <div id="lowContainer" onclick="changePrioToLow('lowContainer', 'lowImg')">
                <p>Low</p>
                <img src="assets/img/AddTask/ArrowDownPrioSign.svg" alt="Prio Low" id="lowImg" />
              </div>
            </div>
          </div>

          <div class="category">
            <p>Category<span class="span-required">*</span></p>
            <div id="dropdownCategory" class="dropdown" onclick="openDropDownCategory()">
              <div id="showSelectedCategory" data-value="">Select task category</div>
              <img id="dropdownImgArrowCategory" class="rotate-arrow dropdown-arrow-hover" src="../assets/img/AddTask/arrow_drop.svg" alt="">
            </div>
            <div id="assignedDropdownCategory" class="category-dropdown d-none">
              <div id="userStory" class="flex-checkbox" data-value="user-story" onclick="selectCategory('User Story', 'myDateInput')">User Story</div>
              <div id="other" class="flex-checkbox" data-value="technical-task" onclick="selectCategory('Technical Task', 'myDateInput')">Technical Task</div>
            </div>
          </div>

          <div id="subtasks"> </div>
          
          <ul id="subTaskContainer" class="subtask-div ulContainer" > </ul> 
          
          <div class="bottom-add-task-mobile">
            <div class="requirement-mobile">
              <p><span class="span-required">*</span>This field is required</p>
            </div>
            <div class="btns-add-task-mobile-wrapper">
              <button onclick="clearInputValue()" id="clear-mobile" class="buttonWhite" >
                Clear <img src="assets/img/AddTask/cancel.svg" alt="Clear Icon"
              /></button>
              <button id="create-task-mobile" class="buttonGrey">
                Create Task <img src="assets/img/AddTask/check_white.svg" alt="Check Icon"
              /></button>  
            </div>      
          </div>

        </section>
      </section>

        <div class="btns-down-add-task">
          <div class="requirement-desktop-addTask">
            <p class="p-required"><span class="span-required">*</span>This field is required</p>
          </div>
          <div class="btns-down-right-add-task">
            <button onclick="clearInputValue()" id="clear" class="buttonWhite" >
              Clear <img src="assets/img/AddTask/cancel.svg" alt="Clear Icon"
            /></button>
            <button  id="create-task" class="buttonGrey" disabled>
              Create Task <img src="assets/img/AddTask/check_white.svg" alt="Check Icon"
            /></button>
          </div>
        </div> 

    </form>
  `;
}

function subTaskInputHtml() {
  return /*html*/ `
    <p>Subtasks</p>
    <div class="inputFieldBox" id="inputFieldBox">
      <input id="subTaskInput" type="text" placeholder="Add new subtask" onclick="changeButtonsAddTask('inputFieldBox')" />
      <img onclick="addSubTask('subTaskInput', 'subTaskContainer')" class="inputImgPlus" src="assets/img/AddTask/plus.svg" alt="Add Icon" />
    </div>
    <div id="subTaskError" class="subtask-div-error"></div>
  `;
}

function subTaskInputFieldHtml() {
  return /*html*/ `
    <input id="subTaskInput" type="text" placeholder="Add new subtask" onclick="changeButtonsAddTask('inputFieldBox')" />
    <img onclick="addSubTask('subTaskInput', 'inputFieldBox')" class="inputImgPlus" src="assets/img/AddTask/plus.svg" alt="Add Icon" />
  `;
}

function subTasksValueHtml(id, i) {
  return /*html*/ `
    <li id="${id}" class="subtask-div-list" ondblclick="editSubTask(${id})"><div class="subtask-div-text">${subtasks[i]['subTaskInput']}</div>
      <div class="subtask-div-list-hover-items">
        <img class="subtask-div-btn" onclick="editSubTask(${id})" src="./assets/img/icons/edit.svg" alt=""><span class="subTaskInputImg-vertical-added"></span>
        <img class="subtask-div-btn" onclick="deleteSubTask(${id}, 'subTaskContainer')" src="./assets/img/icons/delete.svg" alt="">
      </div>
    </li>`;
}

function editSubTaskHtml(textContent, id) {
  return /*html*/ `
    <div class="test-2">
      <input id="editSubTaskInput" type="text" placeholder=${textContent} value=${textContent} />
      <div class="editSubTaskButtonBox">
        <img src="assets/img/icons/delete.svg" alt="Clear Icon" class="inputImgTrash" onclick="deleteSubTask(${id}, 'subTaskContainer')"/>
        <span class="subTaskInputImg-vertical-edit"></span>
        <img src="./assets/img/icons/checkAddTask.svg" alt="check" class="inputImgTrash" onclick="addEditSubTask(${id})"/>
      </div>
    </div>
  `;
}

function addedTaskToBoardHtml() {
  return /*html*/ `
    <div class="signedUpMassage d-none" id="addedTaskToBoard">
      <p class="p-whiteText">Task Added to board</p>
      <img class="addTasktoBoard" src="assets/img/icons/board_icon_white.svg">
    </div>
  `;
}

function showTaskFormHtml() {
  return /*html*/ `
    <div name="assigned" onchange="addAssignedContact()">
      <div id="dropdown" class="dropdown" onclick="openDropDown('assignedDropdown', 'dropdownImgArrow')">
        <input class="contact-searchbar" onkeyup="filterAddTaskContact()" type="text" id="search" placeholder="Select contacts to assign" />
        <img id="dropdownImgArrow" class="rotate-arrow dropdown-arrow-hover dropdown-arrow-hover" src="../assets/img/AddTask/arrow_drop.svg" alt="">
      </div>
    </div>
    <div id="assignedDropdown" class="d-none">
      <div id="assignedAddedContacts"></div>
    </div>
  `;
}

function assignedToUserHtml(i, color, currentUser, initials, isChoosen) {
  return /*html*/ `
    <div id="user-${i}" class="flex-checkbox selected-profile selected_${isChoosen}" onclick="addAssignedContact('${i}', '${color}')" data-value="${currentUser}">
      <div class="selected-profile">
        <div class="assinged-contact-profile" style="background-color:${color}">${initials}</div>
        <span class="assigned-name">${currentUser}</span>
      </div>
      <img id="hoverCheckbox" class="hover-checkbox" src="assets/img/icons/checkBoxWhite.svg" alt="">
      <img id="checkBox-${i}" class="flex-checkbox-img" src="assets/img/icons/checkBox.svg" alt="">
    </div>
  `;
}

function assignedToUserHtmlFILTERED(i, color, currentUser, initials, isChoosen) {
  return /*html*/ `
    <div id="user-${i}" class="flex-checkbox selected-profile selected_${isChoosen}" onclick="setIsChoosenValue(${i}), addAssignedContactFiltered('${i}', '${color}')" data-value="${currentUser}">
      <div class="selected-profile">
        <div class="assinged-contact-profile" style="background-color:${color}">${initials}</div>
        <span class="assigned-name">${currentUser}</span>
      </div>
      <img id="hoverCheckbox" class="hover-checkbox" src="assets/img/icons/checkBoxWhite.svg" alt="">
      <img id="checkBox-${i}" class="flex-checkbox-img" src="assets/img/icons/checkBox.svg" alt="">
    </div>
  `;
}

function assignedToUserYouHtml(i, color, currentUser, initials, isChoosen) {
  return /*html*/ `
    <div id="user-${i}" class="flex-checkbox selected-profile selected_${isChoosen}" onclick="addAssignedContact(${i}, '${color}')" data-value="${currentUser}">
      <div class="selected-profile"><div class="assinged-contact-profile" style="background-color:${color}">${initials}</div>
      <span class="assigned-name">${currentUser} (you)</span>
    </div>
    <img id="hoverCheckbox" class="hover-checkbox" src="assets/img/icons/checkBoxWhite.svg" alt="">
    <img id="checkBox-${i}" class="flex-checkbox-img"src="assets/img/icons/checkBox.svg" alt="">
  `;
}

function subtasksAfterDeletionHtml(i, nr, idContainer) {
  return /*html*/ `
    <div id="${nr}" class="subtask-div-list">${subtasks[i]['subTaskInput']}
      <div><img class="subtask-div-btn" onclick="editSubTask(${nr})" src="./assets/img/icons/edit.svg" alt="">
        <img class="subtask-div-btn" onclick="deleteSubTask(${nr}, '${idContainer}')" src="./assets/img/icons/delete.svg" alt="">
      </div>
    </div>
  `;
}

function renderSelectedContactsHtml(i, j, initials, color) {
  return /*html*/ `
    <div class="assinged-contact-overview" style="background-color:${color}" onclick="removeSelectedContact(${i}, ${j})">${initials}</div>
  `;
}

function changeButtonsAddTaskHtml() {
  return /*html*/ `
    <input id="subTaskInput" type="text" placeholder="Add new subtask" onclick="" class="PosRel" />
    <div class="subTaskInputButtons">
      <img class="subTaskInputImg" onclick="setValueBack('subTaskInput')" src="./assets/img/icons/close.svg" alt="">
      <span class="subTaskInputImg-vertical"></span>
      <img class="subTaskInputImg checkImg" onclick="addSubTask('subTaskInput', 'subTaskContainer')" src="./assets/img/icons/checkAddTask.svg" alt="">
    </div>
  `;
}
