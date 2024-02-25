let letters = [];
let nameToCompare;

/**
 * Initialize the contact management system.
 * Loads data, user, sets initials, sets user to contacts, sets color to contacts, renders contacts, and sets active color to UI elements.
 * @returns {void}
 */
async function init() {
  await loadData();
  await loadUser();
  setUserInitials();
  setUserToContacts();
  setColorToContacts();
  renderContacts();
  setColorToActive('sidebarContacts', 'contacts-img', 'bottomBarContactsMobile', 'contactsImgMobile');
  setNumberOnContacts();
}

/**
 * Set the username in contacts list.
 * If the username exists, append "(you)" to it and add it to the contacts list.
 * @param {string} userName - The username to be added to contacts.
 * @returns {void}
 */
function setUsernameInContacts(userName) {
  let userWithYou = userName + ' (you)';
  let userWithYouExistsIndex = contacts.findIndex((contact) => contact.name === userWithYou);

  if (userWithYouExistsIndex === -1) {
    contacts.push({ name: userWithYou });
  }
}

/**
 * Render the contacts in the UI.
 * Generates HTML elements for each contact and renders them in the UI based on the first letter of their name.
 * @returns {void}
 */
function renderContacts() {
  let content = document.getElementById('basic-info-wrapper');
  content.innerHTML = '';

  for (let i = 0; i < contacts.length; i++) {
    const contact = contacts[i];
    const firstLetter = contact.name.charAt(0);

    if (!letters.includes(firstLetter)) {
      letters.push(firstLetter);
    }
  }
  letters.sort();
  renderLetters();
}

/**
 * Render the letters for contact list navigation.
 * Generates HTML elements for each unique letter in the contact list and renders them for navigation.
 * @returns {void}
 */
function renderLetters() {
  let letterBox = document.getElementById('contact-list-container');
  letterBox.innerHTML = '';

  for (let i = 0; i < letters.length; i++) {
    const letter = letters[i];
    letterBox.innerHTML += generateLettersHTML(letter);

    setContactsToFirstLetters(letter);
  }
}

/**
 * Generates HTML for a contact based on its details.
 * @param {Object} contact - The contact object.
 * @param {string} color - The color associated with the contact.
 * @param {string} acronym - The acronym associated with the contact.
 * @param {number} index - The index of the contact.
 * @returns {string} - The HTML string representing the contact.
 */
function generateContactHTML(contact, color, acronym, index) {
  const username = checkForUserName();
  if (contact['name'] === username) {
    return generateContactsYouHTML(contact, color, acronym, index);
  } else {
    return generateContactsHTML(contact, color, acronym, index);
  }
}

/**
 * Sets contacts under respective first letters and renders them in the UI.
 * @param {string} letter - The first letter of contacts to be grouped under.
 * @returns {void}
 */
function setContactsToFirstLetters(letter) {
  let contactBox = document.getElementById(`contacts-${letter}`);
  contactBox.innerHTML = '';

  for (let i = 0; i < contacts.length; i++) {
    const contact = contacts[i];
    const firstLetter = contact.name.charAt(0);
    const color = contact.color;
    let acronym = getFirstLetters(contact.name);
    if (firstLetter.includes(letter)) {
      sortContactsByAlphabet();
      const contactHTML = generateContactHTML(contact, color, acronym, i);
      contactBox.innerHTML += contactHTML;
    }
  }
  saveContacts();
}

/**
 * Finds the index of a user by contact name.
 * @param {string} contactName - The name of the contact to search for.
 * @returns {number} - The index of the user if found, otherwise -1.
 */
function findUserIndexByContactName(contactName) {
  for (let i = 0; i < users.length; i++) {
    if (users[i]['username'] === contactName) {
      return i;
    }
  }
  return -1;
}

/**
 * Opens the contact information panel.
 * @param {number} i - The index of the contact.
 * @returns {void}
 */
function openContactInfo(i) {
  let contact = contacts[i];
  let acronym = getFirstLetters(contact.name);
  const color = contact.color;
  let content = document.getElementById('contact-info');
  classlistRemove('contact-info', 'show-overlay-menu');
  let username = checkForUserName();
  content.innerHTML = '';
  if (contacts[i]['name'] === username) {
    setTimeout(() => (content.innerHTML += openContactInfoYouHTML(contact, acronym, color, i)), 250);
  } else {
    setTimeout(() => (content.innerHTML += openContactInfoHTML(contact, acronym, color, i)), 250);
  }
  renderChangesMobile(i);
  openContactInfoAnimations();
}

/**
 * Animates the contact information panel.
 * @returns {void}
 */
function openContactInfoAnimations() {
  classlistRemove('contact-info', 'd-none');
  classlistAdd('contact-info', 'transition');
  setTimeout(() => classlistAdd('contact-info', 'show-overlay-menu'), 300);
  if (window.innerWidth < 800) {
    toggleContactInfoMobile();
  }
}

/**
 * Hides the transition effect.
 * @returns {void}
 */
async function hideTransitionEffect() {
  classlistAdd('wrapper-contact-info', 'd-none');
  classlistRemove('wrapper-contact-info', 'show-overlay-menu');
}

/**
 * Opens the changes menu for mobile view.
 * @returns {void}
 */
function toggleContactInfoMobile() {
  classlistToggle('wrapper-contact-list', 'd-none');
  classlistToggle('wrapper-contact-info', 'd-flex');
  classlistToggle('addContactMobile', 'd-none');
  classlistToggle('optionsContactMobile', 'd-flex');
  classlistToggle('back-to-contact-list', 'd-flex');
}

/**
 * Opens the changes menu for mobile view.
 * @returns {void}
 */
function openChangesMenuMobile() {
  classlistAdd('changesMobileWrapper', 'd-flex');
  classlistAdd('changesMobile', 'd-flex');
  classlistAdd('changesMobile', 'show-overlay-menu');
  classlistAdd('optionsContactMobile', 'd-none');
}

/**
 * Closes the changes menu for mobile view.
 * @returns {void}
 */
function closeChangesMenuMobile() {
  classlistRemove('changesMobile', 'show-overlay-menu');
  classlistRemove('changesMobile', 'd-flex');
  classlistRemove('changesMobileWrapper', 'd-flex');
  classlistRemove('optionsContactMobile', 'd-none');
}

/**
 * Renders changes in the contact list for mobile view.
 * @param {number} i - The index of the contact.
 * @returns {void}
 */
function renderChangesMobile(i) {
  let content = document.getElementById('changesMobileWrapper');
  content.innerHTML = '';
  content.innerHTML = changesMobileHTML(i);
}

/**
 * Processes the addition of a contact.
 * @param {string} target - The target of the contact addition.
 * @param {HTMLInputElement} name - The input element for the contact name.
 * @param {HTMLInputElement} mail - The input element for the contact email.
 * @param {HTMLInputElement} tel - The input element for the contact phone number.
 * @returns {void}
 */
async function processContactAddition(target, name, mail, tel) {
  setColorToContacts();
  await saveContacts();
  init();
  renderContacts();
  let index = findContactIndex(name.value);
  openContactInfo(index);
  clearPopup(name, mail, tel);
  await closeContactPopup(target, 'add');
  setTimeout(() => animateBannerContacts('banner-contact-created', 'banner-contact-created-mobile'), 500);
}

/**
 * Adds a new contact.
 * @param {string} target - The target of the contact addition.
 * @returns {void}
 */
async function addContact(target) {
  let name = document.getElementById(`add-name-${target}`);
  let mail = document.getElementById(`add-mail-${target}`);
  let tel = document.getElementById(`add-tel-${target}`);

  contacts.push({
    name: firstLettersUppercase(name.value),
    mail: mail.value,
    phone: tel.value,
    color: '',
    isChoosen: false,
  });

  await processContactAddition(target, name, mail, tel);
}

/**
 * Finds the index of a contact by name.
 * @param {string} name - The name of the contact.
 * @returns {number} - The index of the contact.
 */
function findContactIndex(name) {
  return contacts.findIndex((obj) => obj.name.toLowerCase() === name.toLowerCase());
}

/**
 * Opens a popup.
 * @param {string} id1 - The ID of the first element.
 * @param {string} id2 - The ID of the second element.
 * @param {string} direction - The direction of the animation.
 * @returns {void}
 */
function openPopup(id1, id2, direction) {
  classlistRemoveAndAdd(id1, 'd-none', 'd-block');
  setTimeout(() => classlistAdd(id2, direction), 50);
}

/**
 * Closes a popup.
 * @param {string} id1 - The ID of the first element.
 * @param {string} id2 - The ID of the second element.
 * @param {string} direction - The direction of the animation.
 * @returns {void}
 */
function closePopup(id1, id2, direction) {
  classlistRemove(id2, direction);
  setTimeout(() => classlistRemoveAndAdd(id1, 'd-block', 'd-none'), 250);
}

/**
 * Clears the input fields of a popup.
 * @param {HTMLInputElement} name - The input element for the contact name.
 * @param {HTMLInputElement} mail - The input element for the contact email.
 * @param {HTMLInputElement} tel - The input element for the contact phone number.
 * @returns {void}
 */
function clearPopup(name, mail, tel) {
  name.value = '';
  mail.value = '';
  tel.value = '';
}

/**
 * Edits a contact.
 * @param {number} i - The index of the contact.
 * @param {string} target - The target of the edit operation.
 * @returns {void}
 */
function editContact(i, target) {
  let acronym = getFirstLetters(contacts[i].name);
  const color = contacts[i].color;
  renderEditContactDesktopOrMobile(acronym, color, i);

  let name1 = document.getElementById(`edit-name-${target}`);
  let mail = document.getElementById(`edit-mail-${target}`);
  let tel = document.getElementById(`edit-tel-${target}`);

  name1.value = contacts[i].name;
  mail.value = contacts[i].mail;
  tel.value = contacts[i].phone;

  nameToCompare = contacts[i].name;
}

/**
 * Renders the edit contact interface either for desktop or mobile view based on the window width.
 * @param {string} acronym - The acronym associated with the contact.
 * @param {string} color - The color associated with the contact.
 * @param {number} i - The index of the contact.
 * @returns {void}
 */
function renderEditContactDesktopOrMobile(acronym, color, i) {
  if (window.innerWidth > 800) {
    let contentDesktop = document.getElementById('edit-contact-wrapper');
    contentDesktop.innerHTML = editContactDesktopHTML(acronym, color, i);
  } else {
    let contentMobile = document.getElementById('edit-contact-wrapper-mobile');
    contentMobile.innerHTML = editContactMobileHTML(acronym, color, i);
  }
}

/**
 * Save the edited contact after making changes.
 * Updates the contact information in the contacts array and saves it.
 * @param {number} i - The index of the contact being edited.
 * @param {string} target - The target of the edit operation (desktop or mobile).
 * @returns {void}
 */
async function saveEditedContact(i, target) {
  let name = document.getElementById(`edit-name-${target}`);
  let mail = document.getElementById(`edit-mail-${target}`);
  let tel = document.getElementById(`edit-tel-${target}`);
  let newSavedName = firstLettersUppercase(name.value);

  contacts[i].name = firstLettersUppercase(name.value);
  contacts[i].mail = mail.value;
  contacts[i].phone = tel.value;

  await finalizeEditedContactSave(newSavedName, i, target);
}

/**
 * Finalizes the saving of the edited contact by performing additional actions.
 * @param {string} newSavedName - The new name of the edited contact.
 * @param {number} i - The index of the edited contact.
 * @param {string} target - The target of the edit operation (desktop or mobile).
 * @returns {void}
 */
async function finalizeEditedContactSave(newSavedName, i, target) {
  await checkTasksSelectedContactNames(newSavedName);

  await saveContacts();
  init();
  await closeContactPopup(target, 'edit');
  openContactInfo(i);
}

/**
 * Check and update the selected contact names in tasks after editing a contact name.
 * @param {string} newSavedName - The new name of the contact after editing.
 * @returns {void}
 */
async function checkTasksSelectedContactNames(newSavedName) {
  for (let i = 0; i < tasks.length; i++) {
    let task = tasks[i];

    for (let j = 0; j < task.selectedContacts.length; j++) {
      let selectedContact = task.selectedContacts[j];

      if (selectedContact.name == nameToCompare) {
        selectedContact.name = newSavedName;
        await setItem('tasks', JSON.stringify(tasks));
      }
    }
  }
}

/**
 * Close the contact popup window.
 * Closes the popup window for editing or adding a contact.
 * @param {string} target - The target of the popup window (desktop or mobile).
 * @param {string} type - The type of operation (add or edit).
 * @returns {void}
 */
async function closeContactPopup(target, type) {
  if (target == 'desktop') {
    closePopup(`${type}-contact-wrapper`, `${type}-contact`, 'show-overlay-menu');
  } else {
    closePopup(`${type}-contact-wrapper-mobile`, `${type}-contact-mobile`, 'show-overlay-menu-y');
  }
}

/**
 * Delete a contact from the contacts array.
 * Deletes the contact at the specified index from the contacts array and saves the changes.
 * @param {number} i - The index of the contact to delete.
 * @returns {void}
 */
async function deleteContact(i) {
  deleteUnusedLetter(i);
  deleteSelectedContact(i);
  contacts.splice(i, 1);

  if (window.innerWidth < 800) {
    closeChangesMenuMobile();
    toggleContactInfoMobile();
  }

  await saveContacts();
  document.getElementById('contact-info').innerHTML = '';
  init();
  animateBannerContacts('banner-contact-deleted', 'banner-contact-deleted-mobile');
}

/**
 * Delete the unused letter from the letters array.
 * Removes the first letter of the contact name from the letters array if it is no longer used.
 * @param {number} i - The index of the contact being deleted.
 * @returns {void}
 */
function deleteUnusedLetter(i) {
  let index = letters.indexOf(contacts[i].name.charAt(0));
  letters.splice(index, 1);
}

/**
 * Delete the selected contact from tasks when a contact is deleted.
 * Removes the deleted contact from the selected contacts in tasks array.
 * @param {number} x - The index of the contact being deleted.
 * @returns {void}
 */
async function deleteSelectedContact(x) {
  for (let i = 0; i < tasks.length; i++) {
    let task = tasks[i];

    for (let j = 0; j < task.selectedContacts.length; j++) {
      let contact = task.selectedContacts[j];

      if (contact.name === contacts[x].name) {
        console.log('task.selectedContacts before:', task.selectedContacts);
        task.selectedContacts.splice(j, 1);
        j--;
        console.log('task.selectedContacts after:', task.selectedContacts);
      }
    }
  }
  await setItem('tasks', JSON.stringify(tasks));
}

/**
 * Animate the banner for contact-related actions in desktop view.
 * @param {string} idDesktop - The ID of the banner for desktop view.
 * @returns {void}
 */
async function animateBannerContactsDesktop(idDesktop) {
  let banner = idDesktop;
  let transform = 'show-overlay-menu';

  classlistAdd(banner, 'd-flex');
  classlistAdd(banner, transform);
  setTimeout(() => classlistRemove(banner, transform), 3000);
  classlistRemove(banner, transform);
  setTimeout(() => classlistRemove(banner, 'd-flex'), 250);
}

/**
 * Animate the banner for contact-related actions in mobile view.
 * @param {string} idMobile - The ID of the banner for mobile view.
 * @returns {void}
 */
async function animateBannerContactsMobile(idMobile) {
  let banner = idMobile;
  let transform = 'show-overlay-menu-y';

  classlistAdd(banner, 'd-flex');
  classlistAdd(banner, transform);
  setTimeout(() => classlistRemove(banner, transform), 3000);
  classlistRemove(banner, transform);
  setTimeout(() => classlistRemove(banner, 'd-flex'), 250);
}

/**
 * Toggle the background color of a contact list item.
 * Changes the background color of the selected contact list item.
 * @param {number} i - The index of the contact list item.
 * @returns {void}
 */
function toggleBackground(i) {
  contacts.forEach((contact, j) => {
    document.getElementById(`contact-list-basic-info${j}`).classList.remove('bg-primary');
    document.getElementById(`name-list${j}`).classList.remove('color-white');
  });

  document.getElementById(`contact-list-basic-info${i}`).classList.add('bg-primary');
  document.getElementById(`name-list${i}`).classList.add('color-white');
}

/**
 * Prevent the default action of closing the event.
 * Stops the propagation of the event to prevent closing.
 * @param {Event} event - The event object.
 * @returns {void}
 */
function doNotClose(event) {
  event.stopPropagation();
}

/**
 * Get the first letters of each word in a string.
 * Splits the string by spaces and returns the first letter of each word.
 * @param {string} str - The input string.
 * @returns {string} The first letters of each word.
 */
function getFirstLetters(str) {
  return str.split(/\s/).reduce((response, word) => (response += word.slice(0, 1)), '');
}

/**
 * Validate a phone number input.
 * Replaces invalid characters in the input value with valid ones.
 * @param {HTMLInputElement} input - The input element containing the phone number.
 * @returns {void}
 */
function validatePhoneNumber(input) {
  input.value = input.value.replace(/[^\d+\/\s-]/g, '');
}
