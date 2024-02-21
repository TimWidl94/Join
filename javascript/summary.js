// Initialization
async function init() {
  await includeHTML();
  await loadData();
  await loadUser();
  mobileGreetings();
  setUserInitials();
  setColorToActive(
    "sidebarSummary",
    "summary-img",
    "bottomBarSummaryMobile",
    "summaryImgMobile"
  );
  calculateTasks();
  calculateUrgenTasks();
  renderSummaryContainer();
  insertGreeting();
}

// Render the summary container
function renderSummaryContainer(){
  let container = document.getElementById('containerSummary');
  container.innerHTML = summaryHtml();
}

// Display mobile greetings
function mobileGreetings() {
  let greetMobile = document.getElementById("greetingMobile");
  let greetingText = greeting();
  let userName = users[user].username;

  greetMobile.innerHTML = `
    <div class="colMobile">
      <div class="colMobile-flex">
        <div class="summary-welcome-mobile">${greetingText}</div>
        <div class="summary-welcome-name-mobile">${userName}</div>
      </div>
    </div>`;

  setTimeout(function () {
    greetMobile.classList.add("fade-out-mobile");
    setTimeout(function () {
      greetMobile.classList.add("d-none");
    }, 1000);
  }, 1000);
}

// Insert greeting
function insertGreeting() {
  let greet = document.getElementById("col-6");
  let greetingText = greeting();
  let userName = users[user].username;
  greet.innerHTML = "";
  greet.innerHTML = /*html*/ `
    <div class="summary-welcome">${greetingText}</div>
    <div class="summary-welcome-name">${userName}</div>
  `;
}

// Choose greeting text based on time of day
function greeting() {
  let currentTime = new Date();
  let hour = currentTime.getHours();
  let greetingText;

  if (hour >= 5 && hour < 12) {
    greetingText = "Good morning,";
  } else if (hour >= 12 && hour < 18) {
    greetingText = "Good afternoon,";
  } else {
    greetingText = "Good evening,";
  }

  return greetingText;
}

// Count the number of tasks in different states
function calculateTasks() {
  for (let i = 0; i < tasks.length; i++) {
    let tasksCategory = tasks[i]["currentState"];
    if (tasksCategory === "toDo") {todoTasks++;}
    if (tasksCategory === "done") {doneTasks++;}
    if (tasksCategory === "awaitFeedback") {awaitFeedbackTasks++;}
    if (tasksCategory === "inProgress") {progressTasks++;}
    tasksInBoard++;
  }
}

// Count the number of urgent tasks
function calculateUrgenTasks(){
  for (let i = 0; i < tasks.length; i++) {
    let tasksPrio = tasks[i]["prio"];
    if(tasksPrio === 'urgent'){
      urgentTasks++;
    }
  }
}
