function hoverTodo(element) {
  let img = document.getElementById(element);
  img.setAttribute("src", "../assets/img/Summary/pencilWhiteDesktop.svg");
}

function unhoverTodo(element) {
  let img = document.getElementById(element);
  img.setAttribute("src", "../assets/img/Summary/pencilBlackDesktop.svg");
}

function hoverDone(element) {
  let img = document.getElementById(element);
  img.setAttribute("src", "../assets/img/Summary/hookButtonWhiteDesktop.svg");
}

function unhoverDone(element) {
  let img = document.getElementById(element);
  img.setAttribute("src", "../assets/img/Summary/hookButtonBlackDesktop.svg");
}

function summaryHtml(){
  return /*html*/ `
  <div class="summary-padding">
        <div class="row-header flex-start">
          <h2 class="summary-h2">Join 360</h2>
          <span class="summary-vertical-line"></span>
          <h3 class="summary-h3">Key Metrics at a Glance</h3>
          <div class="summary-vertical-line-mobile"></div>
        </div>
      </div>
      <div class="sum-row">
        <div class="sum-col-50">
          <div class="row">
            <div class="sum-col-12 summary-flex">
              <div class="sum-col-6">
                <a href="/board.html">
                  <div class="summary-todo summary-gap-default" onmouseover="hoverTodo('todoImg');" onmouseout="unhoverTodo('todoImg');">
                  <img class="boardImg" src="../assets/img/Summary/pencilBlackDesktop.svg" alt="" id="todoImg"  />
                  <div class="summary-flex-column">
                    <div class="summary-todo-counter">${todoTasks}</div>
                    <div
                      class="summary-todo-counter-text-m summary-todo-counter-text">
                      To-do
                    </div>
                  </div>
                </div>
              </a>
              </div>
              <div class="sum-col-6">
                <a href="/board.html">
                <div class="summary-todo summary-gap-default" onmouseover="hoverDone('doneImg');" onmouseout="unhoverDone('doneImg');">
                  <img class="boardImg" src="../assets/img/Summary/hookButtonBlackDesktop.svg" alt="" id="doneImg"/>
                  <div class="summary-flex-column">
                    <div class="summary-todo-counter">${doneTasks}</div>
                    <div
                      class="summary-todo-counter-text-m summary-todo-counter-text">
                      Done
                    </div>
                  </div>
                </div>
                </a>
              </div>
            </div>
          </div>
          <div class="row">
        <div class="sum-col-12">
          <a href="/board.html">
              <div class="summary-summarySmallContainerMiddle summary-gap-urgent">
                <div class="sum-col-6">
                  <div class="summary-urgent-wrapper">
                    <img class="boardImg" src="./assets/img/Summary/urgent-icon.svg" alt="" />
                    <div class="summary-flex-column">
                      <div class="summary-todo-counter">${urgentTasks}</div>
                      <div
                        class="summary-todo-counter-text-m summary-todo-counter-text">
                        Urgent
                      </div>
                    </div>
                  </div>
                </div>
                <div class="summary-urgent-verical-line"></div>
                <div class="sum-col-6 summary-date-col">
                  <div class="summary-date">October 16, 2022</div>
                  <div class="summary-subtitle">Upcoming Deadline</div>
                </div>
              </div>
            </a>
            </div>        
    
            </div>
            <div class="row">
              <div class="sum-col-12 summary-flex-counter">
                <div class="sum-col-4">
                  <a href="/board.html">
                  <div class="summary-tasksContainerDown summary-gap-default">
                    <div class="summary-flex-column">
                      <div class="summary-tasksContainerDown-counter">${tasksInBoard}</div>
                      <div
                        class="summary-tasksContainerDown-counter-text-m summary-tasksContainerDown-counter-text">
                        Tasks in 
                        <br> Board 
                      </div>
                    </div>
                  </div>
                </a>
                </div>
                <div class="sum-col-4">
                  <a href="/board.html">
                  <div class="summary-tasksContainerDown summary-gap-default">
                    <div class="summary-flex-column">
                      <div class="summary-tasksContainerDown-counter">${progressTasks}</div>
                      <div
                        class="summary-tasksContainerDown-counter-text-m summary-tasksContainerDown-counter-text">
                        Tasks In Progress
                      </div>
                    </div>
                  </div>
                  </a>
                </div>
                <div class="sum-col-4 summarySmallContainerDown">
                  <a href="/board.html">
                  <div class="summary-tasksContainerDown summary-gap-default">
                    <div class="summary-flex-column">
                      <div class="summary-tasksContainerDown-counter">${awaitFeedbackTasks}</div>
                      <div
                        class="summary-tasksContainerDown-counter-text-m summary-tasksContainerDown-counter-text">
                        Awaiting Feedback
                      </div>
                    </div>
                  </div>
                  </a>
                </div>
              </div>
              <div class="sum-col-6 d-none"></div>
            </div>  
          </div>
          <div class="sum-col-50 sum-greetings">
            <div class="greetingsMassageContainer" id="col-6">
    
          </div>
      </div>

       
      </div>
      
    </div>

  
  `
}
