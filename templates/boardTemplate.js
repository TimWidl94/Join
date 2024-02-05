function generateTodoHTML(i) {
  return /*html*/ `
    
        <div draggable="true" ondragstart="startDragging(${i})" class="board-task">
            <div class="board-task-epic board-task-epic-green">
                ${tasks[i]["selectedCategory"]}
            </div>
                <div class="board-task-title">${tasks[i]["taskTitle"]}</div>
                <div class="board-task-description">
                ${tasks[i]["taskDescription"]}
                </div>
                <div class="board-task-subtask">
                  <div class="board-task-subtask-progress">
                    <div
                      class="progress-done"
                      id="progress-${i}"
                      style="width: 0%"></div>
                  </div>
                  <div class="sboard-task-subtask-counter">0/${tasks[i]["subtasks"].length}</div>
                </div>
                <div class="board-task-member">
                  <div class="board-task-member" id="contactsInBoardTask${i}">
                  </div>
                  <div class="board-task-member-prio">
                    <img src="./assets/img/AddTask/ArrowUpPrioSign.svg" alt="" />
                </div>
            </div>
        </div>
        `;
}

function subTasksValueHtml(id, i) {
  return /*HTML*/ `
    <li id="${id}" class="subtask-div-list" ondblclick="editSubTask(${id})"><p>${subtasks[i]['subTaskInput']}</p>
      <div class="d-hover">
        <img class="subtask-div-btn" onclick="editSubTask(${id})" src="./assets/img/icons/edit.svg" alt="">
        <span class="subTaskInputImg-vertical-1"></span>
        <img class="subtask-div-btn" onclick="deleteSubTask(${id})" src="./assets/img/icons/delete.svg" alt="">
      </div>
    </li>`;
}

function addTaskHtml() {
  return /*html*/ `
    <section class="container-left">
        <div class="headline-add-task"><h1 class="headline-h1-add-task">Add Task</h1></div>

        <div id="title-add-task">
          <p>Title<span class="span-required">*</span></p>
          <input id="taskTitle" required type="text" class="border-focus" placeholder="Enter a title" />

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
        <p class="text-padding">Due Date<span class="span-required">*</span></p>
        <div id="due-date">
          <input id="myDateInput" required type="date" />
        </div>

        <div class="priority">
          <p>Prio</p>
          <div class="priority-options">
            <div id="urgentContainer" onclick="changePrioToUrgent('urgentContainer', 'urgentImg')">
              <p>Urgent</p>
              <img src="assets/img/AddTask/ArrowUpPrioSign.svg" alt="Prio High" id="urgentImg" />
            </div>
            <div id="mediumContainer"  class="priorityMediumActive" onclick="changePrioToMedium('mediumContainer', 'mediumImg')">
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

  <p class="text-padding">Category<span class="span-required">*</span></p>
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
          <button onclick="addTask()" id="create-task" class="buttonGrey">
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
          <button onclick="addTask()" id="create-task-mobile" class="buttonGrey">
            Create Task <img src="assets/img/AddTask/check_white.svg" alt="Check Icon"
          /></button>  
          </div>      
        </div>
      </section>
    
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
