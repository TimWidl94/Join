/**
 * Initializes variables for task counts
 */
let todoTasks = 0;
let doneTasks = 0;
let progressTasks = 0;
let awaitFeedbackTasks = 0;
let tasksInBoard = 0;
let urgentTasks = 0;

/**
 * Initializes the application.
 * Loads HTML content, login form, and local storage data.
 * @async
 */
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

/**
 * Renders the summary container.
 */
function renderSummaryContainer() {
  let container = document.getElementById('containerSummary');
  container.innerHTML = summaryHtml();
}

/**
 * Displays greetings for mobile users.
 */
function mobileGreetings() {
  let greetMobile = document.getElementById("greetingMobile");
  let greetingText = greeting();
  let userName = users[user].username;
  greetMobile.innerHTML = greetMobileTemplate(greetingText, userName);
  hideGreetMobile(greetMobile);
}

/**
 * Hides the mobile greeting after a delay.
 * @param {HTMLElement} greetMobile - The HTML element for the mobile greeting.
 */
function hideGreetMobile(greetMobile) {
  setTimeout(function () {
    greetMobile.classList.add("fade-out-mobile");
    setTimeout(function () {
      greetMobile.classList.add("d-none");
    }, 1000);
  }, 1000);
}

/**
 * Inserts greeting message.
 */
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

/**
 * Determines appropriate greeting based on time of day.
 * @returns {string} - Greeting text.
 */
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

/**
 * Calculates the number of tasks in different states.
 */
function calculateTasks() {
  for (let i = 0; i < tasks.length; i++) {
    let tasksCategory = tasks[i]["currentState"];
    if (tasksCategory === "toDo") { todoTasks++; }
    if (tasksCategory === "done") { doneTasks++; }
    if (tasksCategory === "awaitFeedback") { awaitFeedbackTasks++; }
    if (tasksCategory === "inProgress") { progressTasks++; }
    tasksInBoard++;
  }
}

/**
 * Counts the number of urgent tasks.
 */
function calculateUrgenTasks() {
  for (let i = 0; i < tasks.length; i++) {
    let tasksPrio = tasks[i]["prio"];
    if (tasksPrio === 'urgent') {
      urgentTasks++;
    }
  }
}
