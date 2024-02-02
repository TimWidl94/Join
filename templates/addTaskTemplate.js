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
          <p>Title<span class="span-required">*</span></p>
          <input id="taskTitle" required type="text" placeholder="Enter a title" />
        </div>

        <div id="description">
          <p>Description</p>
          <textarea id="taskDescription" placeholder="Enter a description"></textarea>
        </div>

        <p>Assigned to</p>
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
          <input id="myDateInput" required type="date" />
        </div>

        <div class="priority">
          <p>Prio</p>
          <div class="priority-options">
            <div>
              <p>Urgent</p>
              <img src="assets/img/AddTask/ArrowUpPrioSign.svg" alt="Prio High" />
            </div>
            <div class="selected medium">
              <p>Medium</p>
              <img src="assets/img/AddTask/MediumPrioSign.svg" alt="Prio Medium" />
            </div>
            <div>
              <p>Low</p>
              <img src="assets/img/AddTask/ArrowDownPrioSign.svg" alt="Prio Low" />
            </div>
          </div>
        </div>

        <div class="category">
          <p>Category<span class="span-required">*</span></p>
          <select id="category-options" class="options-syle">
            <option>Select task category</option>
            <option value="user-story">User Story</option>
            <option value="other">Other</option>

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
