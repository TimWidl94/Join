async function init() {
  await includeHTML();
  await loadData();
  await loadLogIn();
  await loadLocalStorageData();
}

async function loadLogIn() {
  let container = document.getElementById("formBody");
  let headerRight = document.getElementById("headerRightBox");
  container.innerHTML = await logInHtml();
  if (headerRight.classList.contains("d-none")) {
  }
  headerRight.classList.remove("d-none");
}

function loadSignUpHtml() {
  let container = document.getElementById("formBody");
  document.getElementById("headerRightBox").classList.add("d-none");
  container.innerHTML = signupHtml();
}

async function signUp() {
  if (checkIfPrivatPolicyIsChecked()) {
    users.push({
      username: userName.value,
      email: emailSignUp.value,
      password: passwordSignUp.value,
      checkPassword: checkPasswordSignUp.value,
    });
    await setItem("users", JSON.stringify(users));
    loadLogIn();
    showAnimation("signedUpMassage");
  } else {
    showAnimation("acceptPrivacyPolicy");
  }
}

async function loadUser() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  await setItem("users", JSON.stringify(users));
  if (searchForEmail(email, password)) {
    await rememberMe();
    let user = await setUser(email);
    window.location.href = "./summary.html";
  }
}

function setUser(email) {
  for (let i = 0; i < users.length; i++) {
    if (users[i].email === email) {
      user = [];
      user.push(i);
      let userAsText = JSON.stringify(user);
      localStorage.setItem('user', userAsText);
    }
  }
}

function searchForEmail(email, password) {
  for (let i = 0; i < users.length; i++) {
    if (
      users[i]["email"].includes(email) &&
      users[i]["password"].includes(password)
    ) {
      return true;
    }
  }
}

function resetForm() {
  email.value = "";
  password.value = "";
}

function logInGuest() {
  let email = "Guest@web.de";
  let password = "admin123";
  if (searchForEmail(email, password)) {
    window.location.href = "./summary.html";
  }
}

function rememberMe() {
  let checkbox = document.getElementById("checkboxSavePassword");
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  if (checkbox.checked) {
    console.log(email, password);
    localStorage.setItem("useremail", email);
    localStorage.setItem("userpassword", password);
    localStorage.setItem("rememberMe", "on");
  } else {
    localStorage.removeItem("useremail");
    localStorage.removeItem("userpassword");
    localStorage.removeItem("rememberMe");
    resetForm();
  }
}

function loadLocalStorageData() {
  let userEmail = localStorage.getItem("useremail");
  let userPassword = localStorage.getItem("userpassword");
  if (userEmail && userPassword) {
    let emailInput = document.getElementById("email");
    let passwordInput = document.getElementById("password");
    let checkbox = document.getElementById("checkboxSavePassword");
    emailInput.value = userEmail;
    passwordInput.value = userPassword;
    checkbox.checked = true;
  }
}

function toggleShowPassword(passwordId, passwordIconId) {
  let passwordField = document.getElementById(passwordId);
  let passwordIcon = document.getElementById(passwordIconId);
  if (passwordField.type === "password") {
    passwordField.type = "text";
    passwordIcon.src = "./assets/img/icons/visibilityOff.svg";
  } else {
    passwordField.type = "password";
    passwordIcon.src = "./assets/img/icons/lock.svg";
    passwordIcon.classList.add("inputImgLock");
  }
}

function checkIfPrivatPolicyIsChecked() {
  let checkButton = document.getElementById("checkboxPrivatPolicy");
  if (checkButton.checked) {
    return true;
  }
}

function showAnimation(id) {
  let button = document.getElementById(id);
  button.classList.remove("d-none");
  setTimeout(() => moveToCenter(button), 200);
  setTimeout(() => addDNone(button), 2000);
}

function moveToCenter(button) {
  button.classList.add("moveToCenter");
}

function addDNone(button) {
  button.classList.add("d-none");
}

function animateLogo() {
  setTimeout(function() {
    document.getElementById('logo').classList.add('d-none'),
    document.getElementById('logo-bg-animation').classList.add('d-none')
  }, 1000);
}