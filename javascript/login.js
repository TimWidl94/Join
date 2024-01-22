async function loadLogIn(){
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
  username = document.getElementById("name").value;
  email = document.getElementById("emailSignUp").value;
  password = document.getElementById("passwordSignUp").value;
  checkPassword = document.getElementById("checkPasswordSignUp").value;

  let user = {
    username: username,
    email: email,
    password: password,
    checkPassword: checkPassword,
  };
  await users.push(user);
  await saveLocalStorageData(users);
  window.location.href = "./summary.html";
}

function saveLocalStorageData(users) {
  let usersAsString = JSON.stringify(users);
  localStorage.setItem("users", usersAsString);
}

function loadLocalStorageData() {
  let usersAsString = localStorage.getItem("users");
  if (usersAsString) {
    users = JSON.parse(usersAsString);
  }
}

function einloggen() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  if (searchForEmail(email, password)) {
    window.location.href = "./summary.html"
  } 
}

function searchForEmail(email, password) {
  for (let i = 0; i < users.length; i++) {
    if (
      users[i]["email"].includes(email) &&
      users[i]["password"].includes(password)
    ) {
      return true;
    } else {
      return false;
    }
  }
}

