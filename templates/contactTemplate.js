function editContactHTML(i) {
  return /*html*/ `
        <div class="edit-contact-container">
            <div id="edit-contact" onclick="doNotClose(event)">
            <section class="left-container">
                <img src="assets/img/Contacts/logo-white.svg" alt="Logo" />
                <div class="left-card-text">
                <h2>Edit Contact</h2>
                </div>
                <div class="horizontal-line"></div>
            </section>

            <section class="right-container">
                <div class="profile">
                <img id="profile-img" src="assets/img/Contacts/person.svg" alt="Profile Image" />
                </div>

                <form class="inputButtonsWrapper" onsubmit="return saveEditedContact(${i});">
                <div class="inputFieldContainer height-unset">
                    <div class="inputFieldBox">
                    <input type="text" class="inputField" placeholder="Name" id="edit-name" required autocomplete="none" />
                    <img src="assets/img/Contacts/person_grey.svg" alt="Person" class="inputImgPerson" />
                    </div>
                    <div class="inputFieldBox">
                    <input type="email" class="inputField" placeholder="Email" id="edit-mail" required autocomplete="none"/>
                    <img src="assets/img/Contacts/mail.svg" alt="Mail" class="inputImgMail" />
                    </div>
                    <div class="inputFieldBox">
                    <input type="tel" oninput="validatePhoneNumber(this)" class="inputField" placeholder="Phone" id="edit-tel" required autocomplete="none"/>
                    <img src="assets/img/Contacts/call.svg" alt="Phone" class="inputImgPhone2" />
                    </div>
                </div>

                <div class="btns-down-right">
                    <button id="delete" class="buttonWhite" onclick="deleteContact()">
                    Delete <img src="assets/img/AddTask/cancel.svg" alt="Clear Icon"
                    /></button>
                    <button id="save" class="buttonGrey">
                    Save <img src="assets/img/AddTask/check_white.svg" alt="Check Icon"
                    /></button>
                </div>
                </form>
            </section>
            </div>
        </div>
      
      `;
}
