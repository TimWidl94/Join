function generateTodoHTML(i, img) {
  return /*html*/ `
    <div draggable="true" ondragstart="startDragging(${i})" class="wobble-container" 
        onclick="openTaskPopup(${i})" ontouchstart="startDragging(${i})">
      <div class="board-task wobble-element">
        <div class="board-task-epic" id="board-task-epic${i}">
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
          <div class="board-task-member" id="contactsInBoardTask${i}"></div>
          <div class="board-task-member-prio">
            <img src="${img}" alt="" id="taskImg${i}"/>
          </div>
        </div>
      </div>
    </div>
        `;
}

function subTasksValueHtml(id, i) {
  return /*HTML*/ `
    <li id="${id}" class="subtask-div-list" ondbclick="editSubTask(${id})"><p>${subtasks[i]['subTaskInput']}</p>
      <div class="d-hover" >
        <img class="subtask-div-btn" onclick="editSubTask(${id})" src="./assets/img/icons/edit.svg" alt="">
        <span class="subTaskInputImg-vertical-1"></span>
        <img class="subtask-div-btn" onclick="deleteSubTask(${id}, 'subTaskContainer')" src="./assets/img/icons/delete.svg" alt="">
      </div>
    </li>`;
}

function addTaskHtml() {
  return /*html*/ `
  <div class="container-left-right-wrapper">
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

        <div class="assinged-contact-wrapper">
          <div id="assignedAddedContact" class="assinged-contact">
          </div>
        </div>
      </section>

      <div class="vertical-line-add-task"></div>

      <section class="container-right">

        <p>Due Date<span class="span-required">*</span></p>
        <div id="due-date">
          <label for="myDateInputPopup"></label>
          <input id="myDateInputPopup" required type="date" required onkeydown="checkIfFormIsFilled()"/>
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
            <div id="other" class="flex-checkbox" data-value="technical-task" onclick="selectCategory('Technical Task')">Technical Task</div>
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
    </div>
      <div class="btns-down-add-task-popup">
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
  `;
}

function subTaskInputEditHtml(i) {
  return /*html*/ `
  <span class="aTPopupSpan">Subtasks</span>
          <div class="inputFieldBox" id="inputFieldBoxEdit">
            <input id="subTaskInputEdit" type="text" placeholder="Add new subtask" onclick="changeButtonsAddTaskEdit('inputFieldBoxEdit', ${i})" />
            <img onclick="addSubTaskEdit('subTaskInputEdit', 'subTaskContainerEdit', ${i})" class="inputImgPlus" src="assets/img/AddTask/plus.svg" alt="Add Icon" />
          </div>
          <div id="subTaskErrorEdit" class="subtask-div-error"></div>
   
  `;
}

function subTaskInputFieldHtml() {
  return /*html*/ `
  <input id="subTaskInput" type="text" placeholder="Add new subtask" onclick="changeButtonsAddTask('inputFieldBox')" />
  <img onclick="addSubTask('subTaskInput', 'inputFieldBox')" class="inputImgPlus" src="assets/img/AddTask/plus.svg" alt="Add Icon" />
  `;
}

function subTasksValueEditHtml(id, subTaskInput, j) {
  return /*HTML*/ `
    <li id="${id}" class="subtask-div-list" ondbclick="editSubTask(${id})"><p class="subtask-div-list-p">${subTaskInput}</p>
      <div class="d-hover" >
        <img class="subtask-div-btn" onclick="editSubTask(${id})" src="./assets/img/icons/edit.svg" alt="">
        <span class="subTaskInputImg-vertical-1"></span>
        <img class="subtask-div-btn" onclick="deleteSubTaskEdit(${id}, 'subTaskContainerEdit', '${subTaskInput}')" src="./assets/img/icons/delete.svg" alt="">
      </div>
    </li>`;
}

function generateTaskPopupHTML(i, img, date) {
  return /*html*/ `
    <div class="aTPopupContainer" id="aTPopupContainer"> 
      <div class="aTPopup" id="aTPopup" onclick="doNotClose(event)"> 
        <div class="aTPopupContentWrapper">
          <div class="aTPopupTop">
            <div class="aTPopupCategory" id="aTPopupCategory${i}"><p>${tasks[i].selectedCategory}</p></div>
            <div class="aTPopupClose" onclick="closeTaskPopup()"><img src="assets/img/icons/close.svg" alt="Close" /></div>
          </div>
          
          <div class="aTPopupHeadline">
            <h1 class="aTPopupH1">${tasks[i].taskTitle}</h1>
          </div>
          
          <div class="aTPopupDescription"><p class="aTPopupP">${tasks[i].taskDescription}</p></div>
          
          <div class="aTPopupDueDate">
            <div class="aTPopupDateText"><span class="aTPopupSpan">Due date:</span></div>
            <div class="aTPopupDateValue" id="aTPopupDateValue"><p class="aTPopupP">${date}</p></div>
          </div>
          
          <div class="aTPopupPrio">
            <div class="aTPopupPrioText"><span class="aTPopupSpan">Priority:</span></div>
            <div class="aTPopupPrioValue" id="aTPopupPrioValue">
              <p class="aTPopupP">${tasks[i].prio}</p>
              <img id="aTPopupPrioImg" alt="Prio-Img" src=${img}>
            </div>
          </div>
          
          <div class="aTPopupAssignedTo">
            <span class="aTPopupSpan">Assigned to:</span>
            <div class="assigned-contact-profile-container" id="assigned-contact-profile-container"> </div>         
          </div>
          
          <div class="aTPopupSubtasks" id="aTPopupSubtasks${i}">
            <span class="aTPopupSpan">Subtasks</span>
            <div class="subtaskContainer" id="subtaskContainerPopup">
            </div>
          </div>

          <div class="aTPopupButtonsBottom">
          <div class="aTPopupButtonsBottomMenuContainer"> 
            <div>
              <button class="buttonGrey" onclick="openMenuMoveTo()">Move to Category</button>
            </div>
            <div class="menuMoveToMobile d-none" id="menuMoveToMobile">
              <button class="buttonMenuMoveTaskMobile width100" onclick="moveToMobile(${i}, 'toDo')">To do</button>
              <button class="buttonMenuMoveTaskMobile width100" onclick="moveToMobile(${i}, 'inProgress')">In progress</button>
              <button class="buttonMenuMoveTaskMobile width100" onclick="moveToMobile(${i}, 'awaitFeedback')">Await feedback</button>
              <button class="buttonMenuMoveTaskMobile width100" onclick="moveToMobile(${i}, 'done')">Done</button>
            </div>
          </div> 
          <div class=aTPopupButtonsBottomRightContainer>
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
        </div>
      </div>


      <form class="atPopupEdit d-none" id="aTPopupEdit" onclick="doNotClose(event)" onsubmit="saveEditedTask(${i}); return false"> 
        <div class="aTPopupContentWrapper">
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
            <div id="assignedToEdit" class="assignedToEdit"></div>
            <div class="assignedAddedContactWrapper">
              <div id="assignedAddedContact" class="assigned-contact-edit"></div>
            </div>

            <div id="due-date-edit">
              <p class="aTPopupSpan text-padding">Due Date<span class="span-required">*</span></p>
              <input id="myDateInputEdit" required type="date" />
            </div>

            <div class="priorityEdit">
              <span class="aTPopupSpan">Prio</span>
              <div class="priority-options-edit">
                <div id="urgentContainerEdit" onclick="changePriorityEdit('urgentContainerEdit', 'urgentImgEdit', 'urgent')">
                  <p class="aTPopupP">Urgent</p>
                  <img src="assets/img/AddTask/ArrowUpPrioSign.svg" alt="Prio High" id="urgentImgEdit" />
                </div>
                <div id="mediumContainerEdit" onclick="changePriorityEdit('mediumContainerEdit', 'mediumImgEdit', 'medium')">
                  <p class="aTPopupP">Medium</p>
                  <img src="assets/img/AddTask/mediumPrioSignInactive.svg" alt="Prio Medium" id="mediumImgEdit" />
                </div>
                <div id="lowContainerEdit" onclick="changePriorityEdit('lowContainerEdit', 'lowImgEdit', 'low')">
                  <p class="aTPopupP">Low</p>
                  <img src="assets/img/AddTask/ArrowDownPrioSign.svg" alt="Prio Low" id="lowImgEdit" />
                </div>
              </div>
            </div>


            <div class="categoryEdit">
              <p class="aTPopupSpan, text-padding">Category<span class="span-required">*</span></span>
              <div id="dropdownCategory" class="dropdownEdit" onclick="openDropDownCategoryEdit()">
                <div id="showSelectedCategoryEdit" data-value="">Select task category
                </div>
                <img id="dropdownImgArrowCategoryEdit" class="rotate-arrow dropdown-arrow-hover" src="../assets/img/AddTask/arrow_drop.svg" alt="">
              </div>
              <div id="assignedDropdownCategoryEdit" class="category-dropdown d-none">
                <div id="userStoryEdit" class="flex-checkbox" data-value="user-story" onclick="selectCategoryEdit('user-story')">User Story
                </div>
                <div id="otherEdit" class="flex-checkbox" data-value="technical-task" onclick="selectCategoryEdit('Technical Task')">Technical Task
                </div>
              </div>
            </div>

              <div id="subtasksEdit">
              </div>

              <ul id="subTaskContainerEdit" class="subtask-div ulContainer" >
              </ul> 

          </div>

          <div class="btn-edit-task">
            <button id="create-task" class="buttonGrey">
              Ok <img src="assets/img/AddTask/check_white.svg" alt="Check Icon"
            /></button>
          </div>
        </div>
      </form>
    </div>
  `;
}

function renderAssignedToContacsInfoHtml(contactColor, capitalLetters, selectedContact) {
  return /*html*/ `
  <div class="assigned-contact">
  <div class="assinged-contact-profile" style="background-color: ${contactColor}">${capitalLetters}</div>
          <p class="aTPopupP">${selectedContact.name}</p>
  </div>
`;
}

function renderSubtasksInfoHtml(j, subTask) {
  return /*html*/ `
  <div class="subtask">
    <input type="checkbox" id="checkboxSubtask-${j}" class="checkboxSavePassword" />
    <label for="checkboxSubtask-${j}" ></label>
    <p class="aTPopupP">${subTask.subTaskInput}</p>
  </div>
`;
}

function subTasksValueHtml(id, i) {
  return /*HTML*/ `
    <li id="${id}" class="subtask-div-list" ondblclick="editSubTask(${id})"><div class="subtask-div-text">${subtasks[i]['subTaskInput']}</div>
      <div class="subtask-div-list-hover-items">
        <img class="subtask-div-btn" onclick="editSubTask(${id})" src="./assets/img/icons/edit.svg" alt=""><span class="subTaskInputImg-vertical-added"></span>
        <img class="subtask-div-btn" onclick="deleteSubTask(${id}, 'subTaskContainer')" src="./assets/img/icons/delete.svg" alt="">
      </div>
    </li>`;
}

function addTaskPopUpHtml() {
  return /*html*/ `
    <form onsubmit="addTask(); return false" class="formAddTask">
    <div class="container-left-right-wrapper">
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

        <div class="assinged-contact-wrapper">
          <div id="assignedAddedContact" class="assinged-contact">
          </div>
        </div>
      </section>

      <div class="vertical-line-add-task"></div>

      <section class="container-right">
        <p>Due Date<span class="span-required">*</span></p>
        <div id="due-date">
          <input id="myDateInputPopup" required type="date" required onkeydown="checkIfFormIsFilled()"/>
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
            <div id="other" class="flex-checkbox" data-value="technical-task" onclick="selectCategory('Technical Task')">Technical Task</div>
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
    </div>
      <div class="btns-down-add-task-popup">
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

function addedTaskToBoardHtml() {
  return /*html*/ `
    <div class="signedUpMassage d-none" id="addedTaskToBoard">
      <p class="p-whiteText">Task Added to board</p>
      <img class="addTasktoBoard" src="assets/img/icons/board_icon_white.svg">
    </div>
  `;
}

function assignedToUserHtml(i, color, currentUser, initials) {
  return /*html*/ `
    <div id="user-${i}" class="flex-checkbox selected-profile" onclick="addAssignedContact(${i}, '${color}')" data-value="${currentUser}">
      <div class="selected-profile"><div class="assinged-contact-profile" style="background-color:${color}">${initials}</div>
      <span class="assigned-name">${currentUser}</span>
    </div>
    <img id="hoverCheckbox" class="hover-checkbox" src="assets/img/icons/checkBoxWhite.svg" alt="">
    <img id="checkBox-${i}" class="flex-checkbox-img"src="assets/img/icons/checkBox.svg" alt="">
  `;
}

function assignedToUserYouHtml(i, color, currentUser, initials) {
  return /*html*/ `
    <div id="user-${i}" class="flex-checkbox selected-profile" onclick="addAssignedContact(${i}, '${color}')" data-value="${currentUser}">
      <div class="selected-profile"><div class="assinged-contact-profile" style="background-color:${color}">${initials}</div>
      <span class="assigned-name">${currentUser} (you)</span>
    </div>
    <img id="hoverCheckbox" class="hover-checkbox" src="assets/img/icons/checkBoxWhite.svg" alt="">
    <img id="checkBox-${i}" class="flex-checkbox-img"src="assets/img/icons/checkBox.svg" alt="">
  `;
}

function renderSelectedContactsEditHtml(i, j, color, initials) {
  return /*html*/ `
    <div class="assinged-contact-overview" style="background-color:${color}" onclick="removeSelectedContact(${i}, ${j})">${initials}</div>
    `;
}

function showTaskFormEditHtml() {
  return /*html*/ `
    <div name="assigned" onchange="addAssignedContact()">
      <div id="dropdownEdit" class="dropdown" onclick="openDropDown('assignedDropdown', 'dropdownImgArrow')">
        <input class="contact-searchbar" onkeyup="filterAddTaskContact()" type="text" id="search" placeholder="Select contacts to assign" />
        <img id="dropdownImgArrow" class="rotate-arrow dropdown-arrow-hover dropdown-arrow-hover" src="../assets/img/AddTask/arrow_drop.svg" alt="">
      </div>
    </div>
    <div id="assignedDropdown" class="d-none">
      <div id="assignedAddedContacts"></div>
    </div>
  `;
}

function changeButtonsAddTaskEditHtml() {
  return /*html*/ `
    <input id="subTaskInputEdit" type="text" placeholder="Add new subtask" class="PosRel" />
    <div class="subTaskInputButtons">
      <img class="subTaskInputImg" onclick="setValueBack('subTaskInputEdit', 'subtasksEdit')" src="./assets/img/icons/close.svg" alt="">
      <span class="subTaskInputImg-vertical"></span>
      <img class="subTaskInputImg checkImg" onclick="addSubTaskEdit('subTaskInputEdit', 'subTaskContainerEdit', ${i})" src="./assets/img/icons/checkAddTask.svg" alt="">
    </div>
  `;
}
