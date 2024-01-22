function signupHtml(){
    return `
    <form action="" id="signUpBody" class="signUpBody" onsubmit="return false; return false">
        <div class="h1Box dp-flex fd-colum">
            <h1>Sign up</h1>
            <img src="./assets/img/LogIn/blueUnderline.svg" alt="" class="blueUnderline" />
        </div>
        <div class="dp-flex fd-colum">
            <div class="inputFieldContainerSignUp">
                <div class="inputFieldBox">
                    <input type="text" class="inputField" placeholder="Name" id="name" autocomplete="on"/>
                    <img src="./assets/img/LogIn/person.svg" alt="" class="inputImgMail" />
                </div>
                <div class="inputFieldBox">
                    <input type="email" class="inputField" placeholder="Email" id="emailSignUp" autocomplete="on"/>
                    <img src="./assets/img/LogIn/mail.svg" alt="" class="inputImgMail" />
                </div>
                <div class="inputFieldBox">
                    <input type="password" class="inputField" placeholder="Password" id="passwordSignUp" autocomplete="on"/>
                    <img src="./assets/img/LogIn/lock.svg" alt="" class="inputImgLock1" />
                </div>
                <div class="inputFieldBox">
                    <input type="password" class="inputField" placeholder="Confirm Password" id="checkPasswordSignUp" autocomplete="on"/>
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
    </form>`;
}

function logInHtml(){
    return `
    <form action="" id="loginScreenBody" class="loginScreenBody" onsubmit="einloggen();return false" name="logIn">
    <div class="h1Box dp-flex fd-colum">
      <h1>Log in</h1>
      <img src="./assets/img/LogIn/blueUnderline.svg" alt="" class="blueUnderline"/>
    </div>
    <div class="dp-flex fd-colum">
      <div class="inputFieldContainer">
        <div class="inputFieldBox">
          <input type="email" class="inputField" placeholder="Email" id="email" minlength="5" required />
          <img src="./assets/img/LogIn/mail.svg" alt="" class="inputImgMail"/>
        </div>
        <div>
          <input type="password" class="inputField" placeholder="Password" autocomplete="on" id="password" minlength="1" required />
          <img src="./assets/img/LogIn/lock.svg" alt="" class="inputImgLock">
        </div>
      </div>
      <div class="checkboxBox">
        <div class="gap8 dp-flex">
          <input type="checkbox" id="checkboxSavePassword" name="checkboxSavePassword" class="checkboxSavePassword"/>
          <p class="rememberMeWidth">Remember me</p>
        </div>
      </div>
    </div>
    <div class="ButtonBox dp-flex">
      <button class="buttonGrey buttonLogin">
        Log in
      </button>
      <button class="buttonWhite buttonLogin" onclick="logInGuest()">
        Guest Log in
      </button>
    </div>
    </form>
    `;
}