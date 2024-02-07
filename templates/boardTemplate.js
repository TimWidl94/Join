function generateTodoHTML(i, img) {
  return /*html*/ `
    
        <div draggable="true" ondragstart="startDragging(${i})" class="board-task" onclick="openTaskPopup(${i})">
            <div class="board-task-epic board-task-epic-green">
                ${tasks[i]['selectedCategory']}
            </div>
                <div class="board-task-title">${tasks[i]['taskTitle']}</div>
                <div class="board-task-description">
                ${tasks[i]['taskDescription']}
                </div>
                <div class="board-task-subtask">
                  <div class="board-task-subtask-progress">
                    <div
                      class="progress-done"
                      id="progress-${i}"
                      style="width: 0%"></div>
                  </div>
                  <div class="sboard-task-subtask-counter">0/${tasks[i]['subtasks'].length}</div>
                </div>
                <div class="board-task-member">
                  <div class="board-task-member" id="contactsInBoardTask${i}">
                  </div>
                  <div class="board-task-member-prio">
                    <img src="${img}" alt="" id="taskImg${i}"/>
                </div>
            </div>
        </div>
        `;
}

function subTasksValueHtml(id, i) {
  console.log('Test123');
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
      <div class="headline-add-task"><h1 class="headline-h1-add-task">Add Task</h1>
      </div>

      <div id="title-add-task">
        <p>Title<span class="span-required">*</span></p>
        <input id="taskTitle" required type="text" class="border-focus" placeholder="Enter a title" />
      </div>

      <div id="description">
        <p>Description</p>
        <textarea id="taskDescription" class="border-focus" placeholder="Enter a description"></textarea>
      </div>

      <p class="text-padding">Assigned to</p>
      <div id="assignedTo"></div>
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
            <div id="showSelectedCategory" data-value="">Select task category
            </div>
            <img id="dropdownImgArrowCategory" class="rotate-arrow dropdown-arrow-hover" src="../assets/img/AddTask/arrow_drop.svg" alt="">
          </div>
          <div id="assignedDropdownCategory" class="category-dropdown d-none">
            <div id="userStory" class="flex-checkbox" data-value="user-story" onclick="selectCategory('user-story')">User Story
            </div>
            <div id="other" class="flex-checkbox" data-value="other" onclick="selectCategory('other')">Other
            </div>
          </div>
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
  <span class="aTPopupSpan">Subtasks</span>
          <div class="inputFieldBox" id="inputFieldBox">
            <input id="subTaskInput" type="text" placeholder="Add new subtask" onclick="changeButtonsAddTask()" />
            <img onclick="addSubTask()" class="inputImgPlus" src="assets/img/AddTask/plus.svg" alt="Add Icon" />
          </div>
          <div id="subTaskError" class="subtask-div-error"></div>
   
  `;
}

function subTaskInputFieldHtml() {
  return /*html*/ `
  <input id="subTaskInput" type="text" placeholder="Add new subtask" onclick="changeButtonsAddTask()" />
  <img onclick="addSubTask()" class="inputImgPlus" src="assets/img/AddTask/plus.svg" alt="Add Icon" />
  `;
}

function generateTaskPopupHTML(i) {
  return /*html*/ `
    <div class="aTPopupContainer" id="aTPopupContainer"> 
      <div class="aTPopup" id="aTPopup" onclick="doNotClose(event)"> 
        <div class="aTPopupTop">
          <div class="aTPopupCategory"><p>${tasks[i].selectedCategory}</p></div>
          <div class="aTPopupClose" onclick="closeTaskPopup()"><img src="assets/img/icons/close.svg" alt="Close" /></div>
        </div>
        
        <div class="aTPopupHeadline">
          <h1 class="aTPopupH1">${tasks[i].taskTitle}</h1>
        </div>
        
        <div class="aTPopupDescription"><p class="aTPopupP">${tasks[i].taskDescription}</p></div>
        
        <div class="aTPopupDueDate">
          <div class="aTPopupDateText"><span class="aTPopupSpan">Due date:</span></div>
          <div class="aTPopupDateValue" id="aTPopupDateValue"><p class="aTPopupP">${tasks[i].taskDueDate}</p></div>
        </div>
        
        <div class="aTPopupPrio">
          <div class="aTPopupPrioText"><span class="aTPopupSpan">Priority:</span></div>
          <div class="aTPopupPrioValue" id="aTPopupPrioValue">
            <p class="aTPopupP">${tasks[i].prio}</p>
            <img id="aTPopupPrioImg" alt="Prio-Img">
          </div>
        </div>
        
        <div class="aTPopupAssignedTo">
          <span class="aTPopupSpan">Assigned to:</span>
          <div class="assigned-contact-profile-container" id="assigned-contact-profile-container"> </div>         
        </div>
        
        <div class="aTPopupSubtasks">
          <span class="aTPopupSpan">Subtasks</span>
          <div class="subtaskContainer" id="subtaskContainerPopup">
          </div>
        </div>

        <div class="aTPopupButtonsBottom">
          <div class="aTPopupDelete" onclick="deleteTask(${i})">
            <img class="delete-img" src="assets/img/icons/delete.svg" alt="Delete" />
            <p class="aTPopupP">Delete</p>
          </div>
          <div class="aTPopupVerticalLine"></div>
          <div class="aTPopupEdit" onclick="editTask(${i})">
            <img class="edit-img" src="assets/img/icons/edit.svg" alt="Edit" />
            <p class="aTPopupP">Edit</p>
          </div>
        </div>
      </div>


      <div class="atPopupEdit d-none" id="aTPopupEdit" onclick="doNotClose(event)"> 
       
      <div class="aTPopupTopEdit">
          <div class="aTPopupCloseEdit" onclick="closeTaskPopup()"><img src="assets/img/icons/close.svg" alt="Close" /></div>
        </div>

        <div class="atPopupEditWrapper">
          <div id="title-add-task-edit">
            <span class="aTPopupSpan">Title<span class="span-required">*</span></span>
            <input id="taskTitleEdit" required type="text" class="border-focus" placeholder="Enter a title" />
          </div>

          <div id="description-edit">
            <span class="aTPopupSpan">Description</span>
            <textarea id="taskDescriptionEdit" class="border-focus" placeholder="Enter a description"></textarea>
          </div>

          <span class="aTPopupSpan">Assigned to</span>
          <div id="assignedTo"></div>
          <div id="assignedAddedContact" class="assinged-contact">
          </div>
        

          <div id="due-date-edit">
            <p class="aTPopupSpan text-padding">Due Date<span class="span-required">*</span></p>
            <input id="myDateInputEdit" required type="date" />
          </div>

          <div class="priorityEdit">
            <span class="aTPopupSpan">Prio</span>
            <div class="priority-options-edit">
              <div id="urgentContainer" onclick="changePrioToUrgent('urgentContainer', 'urgentImg')">
                <p class="aTPopupP">Urgent</p>
                <img src="assets/img/AddTask/ArrowUpPrioSign.svg" alt="Prio High" id="urgentImg" />
              </div>
              <div id="mediumContainer"  class="priorityMediumActive" onclick="changePrioToMedium('mediumContainer', 'mediumImg')">
                <p class="aTPopupP">Medium</p>
                <img src="assets/img/AddTask/mediumPrioSignInactive.svg" alt="Prio Medium" id="mediumImg" />
              </div>
              <div id="lowContainer" onclick="changePrioToLow('lowContainer', 'lowImg')">
                <p class="aTPopupP">Low</p>
                <img src="assets/img/AddTask/ArrowDownPrioSign.svg" alt="Prio Low" id="lowImg" />
              </div>
            </div>
          </div>

          <div class="categoryEdit">
            <p class="aTPopupSpan, text-padding">Category<span class="span-required">*</span></span>
            <div id="dropdownCategory" class="dropdownEdit" onclick="openDropDownCategory()">
              <div id="showSelectedCategory" data-value="">Select task category
              </div>
              <img id="dropdownImgArrowCategory" class="rotate-arrow dropdown-arrow-hover" src="../assets/img/AddTask/arrow_drop.svg" alt="">
            </div>
            <div id="assignedDropdownCategory" class="category-dropdown d-none">
              <div id="userStory" class="flex-checkbox" data-value="user-story" onclick="selectCategory('user-story')">User Story
              </div>
              <div id="other" class="flex-checkbox" data-value="other" onclick="selectCategory('other')">Other
              </div>
            </div>
          </div>

            <div id="subtasksEdit">
            </div>

            <ul id="subTaskContainerEdit" class="subtask-div ulContainer" >
            </ul> 

        </div>

        <div class="btn-edit-task">
          <button onclick="addTask()" id="create-task" class="buttonGrey">
            Ok <img src="assets/img/AddTask/check_white.svg" alt="Check Icon"
          /></button>
        </div>
      </div>
    </div>
  `;
}
