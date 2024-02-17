async function initTextSites() {
  await loadData();
  await loadUser();
  await includeHTML();
  await checkIfArrayIsEmpty();
  setUserInitials();
}

async function initLegalNotice() {
  await initTextSites();
  loadLegalNoticeH1Html();
  loadLegalNoticeContent();
  setMenuColorToActive('legalNoticeLink');
}

async function initLegalNoticeOffline() {
  await includeHTML();
  await loadLegalNoticeH1Html();
  await loadLegalNoticeContent();
  initSideBar();
  initTopBar();
  hideArrow();
  setMenuColorToActive('legalNoticeLink');
}

function initHelp() {
  loadHelpH1Html();
  loadHelpContent();
}

async function initPrivacyPolice() {
  await initTextSites();
  loadPrivacyPolicyH1Html();
  loadPrivacyPolicyContent();
  setMenuColorToActive('privacyPolicyLink');
}

async function initPrivacyPolicyOffline() {
  await includeHTML();
  await loadPrivacyPolicyH1Html();
  await loadPrivacyPolicyContent();
  initSideBar();
  initTopBar();
  hideArrow();
  setMenuColorToActive('privacyPolicyLink');
}

function loadLegalNoticeH1Html() {
  let smallContainer = document.getElementById("legalNoticeHeadline");
  smallContainer.innerHTML = legalNoticeH1Html();
}

function loadLegalNoticeContent() {
  let container = document.getElementById("legalNoticeContentHTML");
  container.innerHTML = legalNoticeHtmlMain();
}

function loadHelpH1Html() {
  let smallContainer = document.getElementById("helpHeadline");
  smallContainer.innerHTML = helpH1Html();
}

function loadHelpContent() {
  let container = document.getElementById("helpContentHTML");
  container.innerHTML = helpHtmlMain();
}

function loadPrivacyPolicyH1Html() {
  let smallContainer = document.getElementById("privacyPoliceHeadline");
  smallContainer.innerHTML = privacyPolicyH1Html();
}

function loadPrivacyPolicyContent() {
  let container = document.getElementById("privacyPoliceContentHTML");
  container.innerHTML = privacyPolicyHtmlMain();
}

function checkIfArrayIsEmpty() {
  if (!user.length > 0) {
    document.getElementById("sidebarMenu").classList.add("d-none");
    document.getElementById("arrowContainer").classList.add("d-none");
  }
}

function initSideBar() {
  let container = document.getElementById('sideBarContainer');
 container.innerHTML = sideBarHtml();
}

function initTopBar(){
  let container = document.getElementById('topBarContainer');
  container.innerHTML = topBarHtml();
}


function hideArrow(){
  let arrowContainer = document.getElementById('arrowContainer');
  arrowContainer.classList.add("d-none");
}




