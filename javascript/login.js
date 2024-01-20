function signUp() {
  let container = document.getElementById("formBody");
  changeCssFromInput(container);
  document.getElementById("headerRightBox").classList.add("d-none");

  container.innerHTML = `
    <form action="" id="signUpBody" class="signUpBody">
        <div class="h1Box dp-flex fd-colum">
            <h1>Sign up</h1>
            <img src="./assets/img/LogIn/Vector.png" alt="" />
        </div>
        <div class="dp-flex fd-colum">
            <div class="inputFieldContainerSignUp">
                <div class="inputFieldBox">
                    <input type="text" class="inputField" placeholder="Name" />
                    <img src="./assets/img/LogIn/person.svg" alt="" class="inputImgMail" />
                </div>
                <div class="inputFieldBox">
                    <input type="text" class="inputField" placeholder="Email"/>
                    <img src="./assets/img/LogIn/mail.svg" alt="" class="inputImgMail" />
                </div>
                <div class="inputFieldBox">
                    <input type="text" class="inputField" placeholder="Password"/>
                    <img src="./assets/img/LogIn/lock.svg" alt="" class="inputImgLock1" />
                </div>
                <div class="inputFieldBox">
                    <input type="text" class="inputField" placeholder="Confirm Password"/>
                    <img src="./assets/img/LogIn/lock.svg" alt="" class="inputImgLock2" />
                </div>
            </div>
            <div class="checkboxPrivacyPolicy dp-flex">
                <input type="checkbox" id="checkboxSavePassword" name="checkboxSavePassword" class="checkboxSavePassword"/>
                <p>i accept the 
                    <a href="./privacyPolice.html">Privacy policy</a>
                </p>
            </div>
        </div>
        <div class="ButtonBox dp-flex">
            <button class="buttonGrey buttonLogin" onclick="logIn()">Sign up</button>
        </div>
    </form>
    
    
    `;
}

function changeCssFromInput(container) {
}
