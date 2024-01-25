function generateTodoHTML(element, i) {
  return /*html*/ `
    
        <div draggable="true" ondragstart="startDragging(${element['id']})" class="board-task">
            <div class="board-task-epic board-task-epic-green">
                User Story
            </div>
                <div class="board-task-title">Contact Form & Imprint</div>
                <div class="board-task-description">
                  Create a contact form and imprint page...
                </div>
                <div class="board-task-subtask">
                  <div class="board-task-subtask-progress">
                    <div
                      class="progress-done"
                      id="progress-${i}"
                      style="width: 0%"></div>
                  </div>
                  <div class="sboard-task-subtask-counter">0/3 Subtasks</div>
                </div>
                <div class="board-task-member">
                  <div class="board-task-member">
                    <div class="board-task-member-profile">DA</div>
                    <div class="board-task-member-profile">DA</div>
                  </div>
                  <div class="board-task-member-prio">
                    <img src="./assets/img/AddTask/ArrowUpPrioSign.svg" alt="" />
                </div>
            </div>
        </div>
        `;
}
