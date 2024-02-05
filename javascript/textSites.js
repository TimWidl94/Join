async function initTextSites() {
  await loadData();
  await loadUser();
  await includeHTML();
  await checkIfArrayIsEmpty();
}

function initLegalNotice() {
  loadLegalNoticeH1Html();
  loadLegalNoticeContent();
}

function initHelp() {
  loadHelpH1Html();
  loadHelpContent();
}

function initPrivacyPolice() {
  loadPrivacyPolicyH1Html();
  loadPrivacyPolicyContent();
}

function loadLegalNoticeH1Html() {
  let smallContainer = document.getElementById('legalNoticeHeadline');
  smallContainer.innerHTML = legalNoticeH1Html();
}

function loadLegalNoticeContent() {
  let container = document.getElementById('legalNoticeContentHTML');
  container.innerHTML = legalNoticeHtmlMain();
}

function loadHelpH1Html() {
  let smallContainer = document.getElementById('helpHeadline');
  smallContainer.innerHTML = helpH1Html();
}

function loadHelpContent() {
  let container = document.getElementById('helpContentHTML');
  container.innerHTML = helpHtmlMain();
}

function loadPrivacyPolicyH1Html() {
  let smallContainer = document.getElementById('privacyPoliceHeadline');
  smallContainer.innerHTML = privacyPolicyH1Html();
}

function loadPrivacyPolicyContent() {
  let container = document.getElementById('privacyPoliceContentHTML');
  container.innerHTML = privacyPolicyHtmlMain();
}

function checkIfArrayIsEmpty() {
  if (!user.length > 0) {
    document.getElementById('sidebarMenu').classList.add('d-none');
    document.getElementById('arrowContainer').classList.add('d-none');
  }
}
