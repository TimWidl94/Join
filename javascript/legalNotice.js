async function init() {
  await loadData();
  await loadUser();
  await loadLegalNoticeH1Html();
  await includeHTML();
  await checkIfArrayIsEmpty();
  loadLegalNoticeContent();
}

function checkIfArrayIsEmpty() {
  if (!user.length > 0) {
    document.getElementById('sidebarMenu').classList.add('d-none');
    document.getElementById('arrowContainer').classList.add('d-none');
  }
}

function loadLegalNoticeH1Html() {
  let smallContainer = document.getElementById('headline-container');
  smallContainer.innerHTML = legalNoticeH1Html();
}

function loadLegalNoticeContent() {
  let container = document.getElementById('contentHTML');
  container.innerHTML = legalNoticeHtmlMain();
}
