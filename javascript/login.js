async function loadLogIn() {
  let container = document.getElementById("formBody");
  container.innerHTML = await logInHtml();
}

function loadSignUpHtml() {
  let container = document.getElementById("formBody");
  changeCssFromInput(container);
  document.getElementById("headerRightBox").classList.add("d-none");

  container.innerHTML = signupHtml();
}

function changeCssFromInput(container) {}

async function signUp() {
  users.push({
    username: userName.value,
    email: emailSignUp.value,
    password: passwordSignUp.value,
    checkPassword: checkPasswordSignUp.value,
  });
  await setItem('users', JSON.stringify(users));
  window.location.href = "./summary.html";
}

async function loadUser() {
  logInBtn.disabled = true;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  await setItem("users", JSON.stringify(users));
  resetForm();
  if (searchForEmail(email, password)) {
    console.log("erfolg");
    window.location.href = "./summary.html";
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
  logInBtn.disabled = false;
}

function logInGuest() {
  let email = "Guest@web.de";
  let password = "admin123";
  if (searchForEmail(email, password)) {
    window.location.href = "./summary.html";
  }
}

async function setItem(key, value) {
  const payload = { key, value, token: STORAGE_TOKEN };
  return fetch(STORAGE_URL, {
    method: "POST",
    body: JSON.stringify(payload),
  }).then((res) => res.json());
}

async function getItem(key) {
  const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
  return fetch(url)
    .then((res) => res.json())
    .then((res) => res.data.value);
}

async function loadUsers() {
  try {
    users = JSON.parse(await getItem("users"));
  } catch(e) {
    console.info("could not load users");
  }
}
