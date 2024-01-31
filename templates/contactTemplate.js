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
                <div class="edit" onclick="editContact(${i}, 'desktop'), openPopup('edit-contact-wrapper', 'edit-contact', 'show-overlay-menu')"
>
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

    <div id="changesMobileWrapper" onclick="closeChangesMenuMobile()">
      <div id="changesMobile" onclick="doNotClose(event)">
        <div class="edit" onclick="editContact(${i}, 'mobile'), openPopup('edit-contact-wrapper-mobile', 'edit-contact-mobile', 'show-overlay-menu-y')"
>
          <img class="edit-img" src="assets/img/icons/edit.svg" alt="Edit" />
          <p class="edit-p">Edit</p>
        </div>
        <div class="delete" onclick="deleteContact(${i})">
          <img class="delete-img" src="assets/img/icons/delete.svg" alt="Delete" />
          <p>Delete</p>
        </div>
      </div>
    </div>
  `;
}

function editContactDesktopHTML(acronym, color, i) {
  return /*html*/ `
        <div class="edit-contact-container">
            <div id="edit-contact" onclick="doNotClose(event)">
            <section class="left-container">
                <img src="assets/img/icons/logo-white.svg" alt="Logo" />
                <div class="left-card-text">
                <h2 class="h2-edit-card">Edit Contact</h2>
                </div>
                <div class="horizontal-line-edit-card"></div>
            </section>

            <section class="right-container">
                <div class="form-close">
                <img
                    src="assets/img/icons/close.svg"
                    alt="Close"
                    onclick="closePopup('edit-contact-wrapper', 'edit-contact', 'show-overlay-menu')"
                />
                </div>

                <div class="wrapper-profile-and-form">
                    <div class="profile" style="background-color: ${color};">
                        <h2 id="capital-letters-edit-mobile">${acronym}</h2>
                     </div>

                    <form class="inputButtonsWrapper" onsubmit="saveEditedContact(${i}, 'desktop'); return false">
                        <div class="inputFieldContainer height-unset">
                            <div class="inputFieldBox pos-rel">
                            <input type="text" class="inputField" placeholder="Name" id="edit-name-desktop" required autocomplete="none" />
                            <img src="assets/img/icons/person.svg" alt="Person" class="inputImgPerson" />
                            </div>
                            <div class="inputFieldBox">
                            <input type="email" class="inputField" placeholder="Email" id="edit-mail-desktop" required autocomplete="none"/>
                            <img src="assets/img/icons/mail.svg" alt="Mail" class="inputImgMail" />
                            </div>
                            <div class="inputFieldBox">
                            <input type="tel" oninput="validatePhoneNumber(this)" class="inputField" placeholder="Phone" id="edit-tel-desktop" required autocomplete="none"/>
                            <img src="assets/img/icons/call.svg" alt="Phone" class="inputImgPhone2" />
                            </div>
                        </div>

                        <div class="btns-down-right">
                            <button id="delete" class="buttonWhite" onclick="deleteContact(${i})">
                            Delete 
                            <button id="save" class="buttonGrey">
                            Save <img src="assets/img/icons/check_white.svg" alt="Check Icon"
                            /></button>
                        </div>
                    </form>
                </div>
            </section>
            </div>
        </div>
      `;
}

function editContactMobileHTML(acronym, color, i) {
  return /*html*/ `
      <div class="edit-contact-container-mobile">
        <div id="edit-contact-mobile" onclick="doNotClose(event)">
          <section class="top-container">
            <div class="form-close-mobile">
              <img
                src="assets/img/icons/close-white.svg"
                alt="Close"
                onclick="closePopup('edit-contact-wrapper-mobile', 'edit-contact-mobile', 'show-overlay-menu-y')"
              />
            </div>
            <div class="top-card-text">
              <h2 class="h2-add-card-mobile">Edit Contact</h2>
            </div>
            <div class="horizontal-line-mobile"></div>
          </section>

          <section class="bottom-container">
              <div class="profile-mobile" style="background-color: ${color};">
              <h2 id="capital-letters-edit">${acronym}</h2>
              </div>

              <form class="inputButtonWrapperMobile" onsubmit="saveEditedContact(${i}, 'mobile'); return false">
                <div class="inputFieldContainerMobile">
                  <div class="inputFieldBoxMobile">
                    <input
                      type="text"
                      minlength="2"
                      maxlength="100"
                      class="inputFieldMobile"
                      placeholder="Name"
                      id="edit-name-mobile"
                      name="add-name"
                      autocomplete="off"
                      title="This is an error message"
                      required
                    />
                    <img src="assets/img/icons/person.svg" alt="Person" class="inputImgPersonMobile" />
                  </div>
                  <div class="inputFieldBoxMobile">
                    <input
                      type="email"
                      maxlength="100"
                      class="inputFieldMobile"
                      placeholder="Email"
                      id="edit-mail-mobile"
                      name="add-mail"
                      autocomplete="none"
                      required
                    />
                    <img src="assets/img/icons/mail.svg" alt="Mail" class="inputImgMailMobile" />
                  </div>
                  <div class="inputFieldBoxMobile">
                    <input
                      type="tel"
                      oninput="validatePhoneNumber(this)"
                      maxlength="100"
                      class="inputFieldMobile"
                      placeholder="Phone"
                      id="edit-tel-mobile"
                      name="add-tel"
                      autocomplete="none"
                      required
                    />
                    <img src="assets/img/icons/call.svg" alt="Phone" class="inputImgPhone2Mobile" />
                  </div>
                </div>

                <div class="edit-contact-btns">
                <button class="buttonWhiteWithImgMobile" onclick="deleteContact(${i})">Delete </button>
                <button class="buttonGreyWithImgMobile addContactBtnMobile">Save<img src="assets/img/icons/check_white.svg" alt="Check Icon"></button>
              </div>

              </form>
          </section>

        </div>
      </div>
  `;
}
