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
                  <div class="board-task-member">
                    <div class="board-task-member-profile">${tasks[i]["selectedContacts"][0]["name"]}</div>
                    <div class="board-task-member-profile">DA</div>
                  </div>
                  <div class="board-task-member-prio">
                    <img src="./assets/img/AddTask/ArrowUpPrioSign.svg" alt="" />
                </div>
            </div>
        </div>
        `;
}
