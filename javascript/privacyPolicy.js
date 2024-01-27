async function init() {
  
  await loadData();
  await loadUser();
  await loadPrivacyPolicyh1();
  await includeHTML();
  await checkIfArrayIsEmpty();
  loadPrivacyPolicyContent();
}

function checkIfArrayIsEmpty() {
  if (!user.length > 0) {
    document.getElementById("sidebarMenu").classList.add("d-none");
    document.getElementById("arrowContainer").classList.add("d-none");
  }
}

function loadPrivacyPolicyh1() {
  let smallContainer = document.getElementById("headline-container");
  smallContainer.innerHTML = privacyPolicyH1Html();
}

function loadPrivacyPolicyContent() {
    let container = document.getElementById("contentHTML");
    container.innerHTML = privacyPolicyHtmlMain();
  }