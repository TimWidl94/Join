function subTasksValueHtml(id, i) {
  return /*HTML*/ `
    <li id="${id}" class="subtask-div-list" ondblclick="editSubTask(${id})">${subtasks[i]['subTaskInput']}
      <div>
        <img class="subtask-div-btn" onclick="editSubTask(${id})" src="./assets/img/icons/edit.svg" alt="">
        <img class="subtask-div-btn" onclick="deleteSubTask(${id})" src="./assets/img/icons/delete.svg" alt="">
      </div>
    </li>`;
}

function addTaskHtml() {
  return /*html*/ `
    <section class="container-left">
        <div class="headline-add-task"><h1 class="headline-h1-add-task">Add Task</h1></div>

        <div id="title-add-task">
          <p>Title<span>*</span></p>
          <input id="taskTitle" required type="text" class="border-focus" placeholder="Enter a title" />
        </div>

        <div id="description">
          <p>Description</p>
          <textarea id="taskDescription" class="border-focus" placeholder="Enter a description"></textarea>
        </div>

        <p>Assigned to</p>
        <div id="assignedTo">
        </div>
        <div id="assignedAddedContact" class="assinged-contact">

        </div>
        <div id="requirement-desktop">
          <p><span>*</span>This field is required</p>
        </div>
      </section>

      <div class="vertical-line-add-task"></div>

      <section class="container-right">
        <p>Due Date<span>*</span></p>
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
  <p>Category<span>*</span></p>
  <div id="dropdownCategory" class="dropdown" onclick="openDropDownCategory()">
    Select task category 
    <img id="dropdownImgArrowCategory" class="rotate-arrow" src="../assets/img/AddTask/arrow_drop.svg" alt="">
  </div>
  <div id="assignedDropdownCategory" class="category-dropdown d-none">
    <div class="flex-checkbox" data-value="user-story" onclick="selectCategory('user-story')">User Story</div>
    <div class="flex-checkbox" data-value="other" onclick="selectCategory('other')">Other</div>
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
        <div id="requirement-mobile">
          <p><span>*</span>This field is required</p>
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
