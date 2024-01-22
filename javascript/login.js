users = [];

function loadSignUpHtml() {
  let container = document.getElementById("formBody");
  changeCssFromInput(container);
  document.getElementById("headerRightBox").classList.add("d-none");

  container.innerHTML = `
    <form action="" id="signUpBody" class="signUpBody" onsubmit="return false">
        <div class="h1Box dp-flex fd-colum">
            <h1>Sign up</h1>
            <img src="./assets/img/LogIn/blueUnderline.svg" alt="" class="blueUnderline" />
        </div>
        <div class="dp-flex fd-colum">
            <div class="inputFieldContainerSignUp">
                <div class="inputFieldBox">
                    <input type="text" class="inputField" placeholder="Name" id="name" />
                    <img src="./assets/img/LogIn/person.svg" alt="" class="inputImgMail" />
                </div>
                <div class="inputFieldBox">
                    <input type="email" class="inputField" placeholder="Email" id="email" />
                    <img src="./assets/img/LogIn/mail.svg" alt="" class="inputImgMail" />
                </div>
                <div class="inputFieldBox">
                    <input type="password" class="inputField" placeholder="Password" id="password"/>
                    <img src="./assets/img/LogIn/lock.svg" alt="" class="inputImgLock1" />
                </div>
                <div class="inputFieldBox">
                    <input type="password" class="inputField" placeholder="Confirm Password" id="checkPassword"/>
                    <img src="./assets/img/LogIn/lock.svg" alt="" class="inputImgLock1" />
                </div>
            </div>
            <div class="checkboxPrivacyPolicy dp-flex">
                <input type="checkbox" id="checkboxSavePassword" name="checkboxSavePassword" class="checkboxSavePassword"/>
                <p class="acceptPrivacyGrey">i accept the 
                    <a href="./privacyPolice.html" class="privacyPolicyLink">Privacy policy</a>
                </p>
            </div>
        </div>
        <div class="ButtonBox dp-flex">
            <button class="buttonGrey buttonLogin" onclick="signUp()">Sign up</button>
        </div>
    </form>
    
    
    `;
}

function changeCssFromInput(container) {
}


function signUp(){
    username = document.getElementById('name').value;
    email = document.getElementById('email').value;
    password = document.getElementById('password').value;
    checkPassword = document.getElementById('checkPassword').value;

    let user = {
        'username': username,
        'email': email,
        'password': password,
        'checkPassword': checkPassword,
    }

    users.push(user)
    saveLocalStorageData(user);
}

function saveLocalStorageData(user){
let userAsString = JSON.stringify(user);
localStorage.setItem('user', userAsString);

}

function loadLocalStorageData(){
let userAsString = localStorage.getItem('user');
users = JSON.parse(userAsString);
}