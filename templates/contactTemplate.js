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
  return /*html*/ `
    <div id="contact-list-basic-info${i}" class="contact-list-basic-info" onclick="openContactInfo(${i}), toggleBackground(${i})">
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
                    <img class="edit-img" src="assets/img/icons/edit.svg" alt="Edit">
                    <p class="edit-p">Edit</p>
                </div>
                <div class="delete" onclick="deleteContact(${i})">
                    <img class="delete-img" src="assets/img/icons/delete.svg" alt="Delete">
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
            <a id="contact-email" href="mailto:${contact.mail}">${contact.mail}</a>
        </div>
        <div class="phone">
            <p>Phone</p>
            <a id="contact-phone" href="tel:${contact.phone}">${contact.phone}</a>
        </div>
    </div>
  `;
}

function editContactHTML(i) {
  return /*html*/ `
        <div class="edit-contact-container">
            <div id="edit-contact" onclick="doNotClose(event)">
            <section class="left-container">
                <img src="assets/img/icons/logo-white.svg" alt="Logo" />
                <div class="left-card-text">
                <h2>Edit Contact</h2>
                </div>
                <div class="horizontal-line"></div>
            </section>

            <section class="right-container">
                <div class="profile">
                <img id="profile-img" src="assets/img/icons/person.svg" alt="Profile Image" />
                </div>

                <form class="inputButtonsWrapper" onsubmit="saveEditedContact(${i}); return false">
                <div class="inputFieldContainer height-unset">
                    <div class="inputFieldBox">
                    <input type="text" class="inputField" placeholder="Name" id="edit-name" required autocomplete="none" />
                    <img src="assets/img/icons/person.svg" alt="Person" class="inputImgPerson" />
                    </div>
                    <div class="inputFieldBox">
                    <input type="email" class="inputField" placeholder="Email" id="edit-mail" required autocomplete="none"/>
                    <img src="assets/img/icons/mail.svg" alt="Mail" class="inputImgMail" />
                    </div>
                    <div class="inputFieldBox">
                    <input type="tel" oninput="validatePhoneNumber(this)" class="inputField" placeholder="Phone" id="edit-tel" required autocomplete="none"/>
                    <img src="assets/img/icons/call.svg" alt="Phone" class="inputImgPhone2" />
                    </div>
                </div>

                <div class="btns-down-right">
                    <button id="delete" class="buttonWhite" onclick="deleteContact(${i})">
                    Delete <img src="assets/img/AddTask/cancel.svg" alt="Clear Icon"
                    /></button>
                    <button id="save" class="buttonGrey">
                    Save <img src="assets/img/icons/close.svg" alt="Check Icon"
                    /></button>
                </div>
                </form>
            </section>
            </div>
        </div>
      `;
}
