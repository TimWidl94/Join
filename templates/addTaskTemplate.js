function subTasksValueHtml(id, i) {
  return /*HTML*/ `
    <li id="${id}" class="subtask-div-list" ondblclick="editSubTask(${id})"><div class="subtask-div-text">${subtasks[i]['subTaskInput']}</div>
      <div class="subtask-div-list-hover-items">
        <img class="subtask-div-btn" onclick="editSubTask(${id})" src="./assets/img/icons/edit.svg" alt=""><span class="subTaskInputImg-vertical-added"></span>
        <img class="subtask-div-btn" onclick="deleteSubTask(${id})" src="./assets/img/icons/delete.svg" alt="">
      </div>
    </li>`;
}

function addTaskHtml() {
  return /*html*/ `
  <form onsubmit="addTask(); return false" class="formAddTask">
    <section class="container-left">
      
        <div class="headline-add-task"><h1 class="headline-h1-add-task">Add Task</h1></div>

        <div id="title-add-task">
          <p>Title<span class="span-required">*</span></p>
          <input id="taskTitle" required type="text" class="border-focus" placeholder="Enter a title" onkeydown="checkIfFormIsFilled()"/>

        </div>

        <div id="description">
          <p>Description</p>
          <textarea id="taskDescription" class="border-focus" placeholder="Enter a description"></textarea>
        </div>

        <p class="text-padding">Assigned to</p>
        <div id="assignedTo">
        </div>
        <div id="assignedAddedContact" class="assinged-contact">

        </div>
        <div class="requirement-desktop">
          <p><span class="span-required">*</span>This field is required</p>
        </div>
      </section>

      <div class="vertical-line-add-task"></div>

      <section class="container-right">
        <p>Due Date<span class="span-required">*</span></p>
        <div id="due-date">
          <input id="myDateInput" required type="date" required onkeydown="checkIfFormIsFilled()"/>
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
  <div id="userStory" class="flex-checkbox" data-value="user-story" onclick="selectCategory('user-story')">User Story</div>
  <div id="other" class="flex-checkbox" data-value="other" onclick="selectCategory('other')">Other</div>
</div>

</div>

</div>

    </div>
    </div>

          </select>
        </div>

        <div id="subtasks">
        </div>
        <ul id="subTaskContainer" class="subtask-div ulContainer" >
        </ul> 
        <div class="btns-down-right-add-task">
          <button onclick="clearInputValue()" id="clear" class="buttonWhite" >
            Clear <img src="assets/img/AddTask/cancel.svg" alt="Clear Icon"
          /></button>
          <button  id="create-task" class="buttonGrey" disabled>
            Create Task <img src="assets/img/AddTask/check_white.svg" alt="Check Icon"
          /></button>
        </div>
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
      </form>
    `;
}

function subTaskInputHtml() {
  return /*html*/ `
  <p>Subtasks</p>
          <div class="inputFieldBox" id="inputFieldBox">
            <input id="subTaskInput" type="text" placeholder="Add new subtask" onclick="changeButtonsAddTask()" />
            <img onclick="addSubTask()" class="inputImgPlus" src="assets/img/AddTask/plus.svg" alt="Add Icon" />
          </div>
          <div id="subTaskError" class="subtask-div-error"></div>
   
  `;
}

function subTaskInputFieldHtml() {
  return `
  <input id="subTaskInput" type="text" placeholder="Add new subtask" onclick="changeButtonsAddTask()" />
  <img onclick="addSubTask()" class="inputImgPlus" src="assets/img/AddTask/plus.svg" alt="Add Icon" />
  `;
}


function addedTaskToBoardHtml(){
  return `
  <div class="signedUpMassage d-none" id="addedTaskToBoard">
  <p class="p-whiteText">Task Added to board</p>
  <img class="addTasktoBoard" src="assets/img/icons/board_icon_white.svg">
  </div>
  `
}