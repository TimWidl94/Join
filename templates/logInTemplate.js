function logInHtml(){
  return `
  <form action="" id="loginScreenBody" class="loginScreenBody" onsubmit="loadUser();return false" name="logIn">
    <div class="h1Box dp-flex fd-colum">
      <h1>Log in</h1>
      <img src="./assets/img/icons/blueUnderline.svg" alt="" class="blueUnderline"/>
     </div>
    <div class="dp-flex fd-colum">
      <div class="inputFieldContainer">
        <div class="inputFieldBox">
          <input type="email" class="inputField" placeholder="Email" id="email" minlength="5" required />
          <img src="./assets/img/icons/mail.svg" alt="" class="inputImgMail"/>
        </div>
        <div>
          <input type="password" class="inputField" placeholder="Password" autocomplete="on" id="password" minlength="1" required />
          <img src="./assets/img/icons/lock.svg" alt="" class="inputImgLock" id="passwordIcon" onclick="toggleShowPassword()">
        </div>
      </div>
      <div class="checkboxBox">
        <div class="gap8 dp-flex remembermeWidth">
          <input type="checkbox" id="checkboxSavePassword" name="checkboxSavePassword" class="checkboxSavePassword"/>
          <label for="checkboxSavePassword"></label>
          <p class="rememberMeFont">Remember me</p>
        </div>
      </div>
    </div>
    <div class="ButtonBox dp-flex">
      <button class="buttonGrey buttonLogin" id="logInBtn">
        Log in
      </button>
      <button class="buttonWhite buttonLogin" onclick="logInGuest()">
        Guest Log in
      </button>
    </div>
    </form>
  `;
}

function signupHtml(){
    return `
    <form action="" id="signUpBody" class="signUpBody" onsubmit="signUp(); return false">
      <img src="./assets/img/icons/blueArrowLeft.svg" class="arrowLeftIcon" onclick="loadLogIn()"></img>    
        <div class="h1Box dp-flex fd-colum">
            <h1>Sign up</h1>
            <img src="./assets/img/icons/blueUnderline.svg" alt="" class="blueUnderline" />
        </div>
        <div class="dp-flex fd-colum">
            <div class="inputFieldContainerSignUp">
                <div class="inputFieldBox">
                    <input type="text" class="inputField" placeholder="Name" id="userName" autocomplete="on" required/>
                    <img src="./assets/img/icons/person.svg" alt="" class="inputImgMail" />
                </div>
                <div class="inputFieldBox">
                    <input type="email" class="inputField" placeholder="Email" id="emailSignUp" autocomplete="on" required/>
                    <img src="./assets/img/icons/mail.svg" alt="" class="inputImgMail" />
                </div>
                <div class="inputFieldBox">
                    <input type="password" class="inputField" placeholder="Password" id="passwordSignUp" autocomplete="on" required/>
                    <img src="./assets/img/icons/lock.svg" alt="" class="inputImgLock1" />
                </div>
                <div class="inputFieldBox">
                    <input type="password" class="inputField" placeholder="Confirm Password" id="checkPasswordSignUp" autocomplete="on" required/>
                    <img src="./assets/img/icons/lock.svg" alt="" class="inputImgLock1" />
                </div>
            </div>
            <div class="checkboxPrivacyPolicy dp-flex">
                <input type="checkbox" id="checkboxSavePassword" name="checkboxSavePassword" class="checkboxSavePassword" required/>
                <label for="checkboxSavePassword"></label>
                <p class="acceptPrivacyGrey">i accept the 
                    <a href="./privacyPolice.html" class="privacyPolicyLink">Privacy policy</a>
                </p>
            </div>
        </div>
        <div class="ButtonBox dp-flex">
            <button class="buttonGrey buttonLogin">Sign up</button>
        </div>
    </form>`;
}

