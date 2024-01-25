function generateLettersHTML(letter) {
  return `
    <div id="start-letter-container">
      <div class="start-letter">
          <p id="start-letter">${letter}</p>
      </div>
      <div id="contacts-${letter}" class="contacts-by-start-letter"></div>
    </div>
    `;
}

function generateContactsHTML(contact, color, acronym, i) {
  // const color = contactColors[i % contactColors.length];
  return /*html*/ `
    <div id="contact-list-basic-info${i}" class="contact-list-basic-info" onclick="toggleBackground(${i}), openContactInfo(${i})">
              <div class="capital-letters-list" id="capital-letters-list${i}" style="background-color: ${color};"> 
                  <p id="capital-letters-list">${acronym}</p>
                  </div>
              <div id="name-and-mail"> 
              <p id="name-list${i}">${contact.name}</p>
                <p id="email-list">${contact.mail}</p>
            </div>
          </div>
    `;
}

function openContactInfoHTML(contact, acronym, color, i) {
  return /*html*/ `
    <div id="basic-info">
        <div class="capital-letters"  style="background-color: ${color};">
            <h2 id="capital-letters">${acronym}</h2>
        </div>
        <div class="name-and-changes">
            <h2 id="name">${contact.name}</h2>
            <div class="changes">
                <div class="edit" onclick="editContact(${i})">
                    <img src="assets/img/Contacts/edit.svg" alt="" />
                    <p>Edit</p>
                </div>
                <div class="delete" onclick="deleteContact(${i})">
                    <img src="assets/img/Contacts/delete.svg" alt="" />
                    <p>Delete</p>
                </div>
            </div>
        </div>
    </div>

    <div class="contact-info-text">
        <p>Contact Information</p>
    </div>

    <div class="mail-and-phone">
        <div class="mail">
            <p>Email</p>
            <p id="contact-email">${contact.mail}</p>
        </div>
        <div class="phone">
            <p>Phone</p>
            <p id="contact-phone" type="phone">${contact.phone}</p>
        </div>
    </div>
  `;
}

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
