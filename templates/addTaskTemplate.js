function subTaskHtml(id, i){
    return /*HTML*/ `
    <li id="${id}" class="subtask-div-list">${subtasks[i]["subTaskInput"]}
      <div>
        <img class="subtask-div-btn" onclick="editSubTask(${id})" src="./assets/img/icons/edit.svg" alt="">
        <img class="subtask-div-btn" onclick="deleteSubTask(${id})" src="./assets/img/icons/delete.svg" alt="">
      </div>
    </li>`;
}

function addTaskHtml(){
    return /*html*/ `
    <section class="container-left">
        <div class="headline-add-task"><h1 class="headline-h1-add-task">Add Task</h1></div>

        <div id="title">
          <p>Title<span>*</span></p>
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
        <div id="requirement">
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
          <p>Category<span>*</span></p>
          <div id="category-options" class="options-syle">
Select task category
          </div>
          <div data-value=user-story">User Story</div>
            <div data-value="other">Other</div>
            <div class="dropdown dropdown-category" onclick="openDropDownCategory()">
                                Select contacts to assign <img id="dropdownImgArrowCategory" class="" src="../assets/img/AddTask/arrow_drop.svg" alt="">
                              </div>
    </div>


          </select>
        </div>

        <div id="subtasks">
          <p>Subtasks</p>
          <div class="inputFieldBox">
            <input id="subTaskInput" type="text" placeholder="Add new subtask" />
            <img onclick="addSubTask()" class="inputImgPlus" src="assets/img/AddTask/plus.svg" alt="Add Icon" />
          </div>
          <div id="subTaskError" class="subtask-div-error"></div>
          <ul id="subTaskContainer" class="subtask-div" >
          </ul>
        </div>

        <div class="btns-down-right-add-task">
          <button onclick="clearInputValue()" id="clear" class="buttonWhite" >
            Clear <img src="assets/img/AddTask/cancel.svg" alt="Clear Icon"
          /></button>
          <button onclick="addTask()" id="create-task" class="buttonGrey">
            Create Task <img src="assets/img/AddTask/check_white.svg" alt="Check Icon"
          /></button>
        </div>
      </section>
    
    `

}