async function init() {
  await includeHTML();
  await loadData();
  await loadUser();
  setUserInitials();
  setColorToActive('sidebarSummary', 'summary-img', 'bottomBarSummaryMobile', 'summaryImgMobile');
  insertGreeting();
}

function insertGreeting() {
  let greet = document.getElementById('col-6');
  let greetingText = greeting();
  console.log('users:', users[user].username);
  let userName = users[user].username;
  greet.innerHTML = '';
  greet.innerHTML = /*html*/ `
    <div class="summary-welcome">${greetingText}</div>
    <div class="summary-welcome-name">${userName}</div>
  `;
}

function greeting() {
  let currentTime = new Date();
  let hour = currentTime.getHours();
  let greetingText;

  if (hour >= 5 && hour < 12) {
    greetingText = 'Good morning,';
  } else if (hour >= 12 && hour < 18) {
    greetingText = 'Good afternoon,';
  } else {
    greetingText = 'Good evening,';
  }

  return greetingText;
}
