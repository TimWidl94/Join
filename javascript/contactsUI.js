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
 * Animates the contact information panel.
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
 */
async function hideTransitionEffect() {
  classlistAdd('wrapper-contact-info', 'd-none');
  classlistRemove('wrapper-contact-info', 'show-overlay-menu');
}

/**
 * Opens the changes menu for mobile view.
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
 */
function openChangesMenuMobile() {
  classlistAdd('changesMobileWrapper', 'd-flex');
  classlistAdd('changesMobile', 'd-flex');
  classlistAdd('changesMobile', 'show-overlay-menu');
  classlistAdd('optionsContactMobile', 'd-none');
}

/**
 * Closes the changes menu for mobile view.
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
 */
function renderChangesMobile(i) {
  let content = document.getElementById('changesMobileWrapper');
  content.innerHTML = '';
  content.innerHTML = changesMobileHTML(i);
}

/**
 * Opens a popup.
 * @param {string} id1 - The ID of the first element.
 * @param {string} id2 - The ID of the second element.
 * @param {string} direction - The direction of the animation.
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
 */
function closePopup(id1, id2, direction) {
  classlistRemove(id2, direction);
  setTimeout(() => classlistRemoveAndAdd(id1, 'd-block', 'd-none'), 250);
}

/**
 * Renders the edit contact interface either for desktop or mobile view based on the window width.
 * @param {string} acronym - The acronym associated with the contact.
 * @param {string} color - The color associated with the contact.
 * @param {number} i - The index of the contact.
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
 * Close the contact popup window.
 * Closes the popup window for editing or adding a contact.
 * @param {string} target - The target of the popup window (desktop or mobile).
 * @param {string} type - The type of operation (add or edit).
 */
async function closeContactPopup(target, type) {
  if (target == 'desktop') {
    closePopup(`${type}-contact-wrapper`, `${type}-contact`, 'show-overlay-menu');
  } else {
    closePopup(`${type}-contact-wrapper-mobile`, `${type}-contact-mobile`, 'show-overlay-menu-y');
  }
}

async function animateBannerContactsAdded(target) {
  if (target == 'banner-contact-created') {
    console.log('animateBannerContactsAdded target:', target);
    animateBannerContactsDesktop(target);
  } else {
    animateBannerContactsMobile(target);
    console.log('animateBannerContactsMobile');
  }
}

function animateBannerContactsDeleted(target) {
  if (target == 'banner-contact-deleted') {
    animateBannerContactsDesktop(target);
    console.log('animateBannerContactsDesktop');
  } else {
    animateBannerContactsMobile(target);
    console.log('animateBannerContactsMobile');
  }
}

/**
 * Animate the banner for contact-related actions in desktop view.
 * @param {string} idDesktop - The ID of the banner for desktop view.
 */
function animateBannerContactsDesktop(idDesktop) {
  let banner = idDesktop;
  console.log('idDesktop:', idDesktop);
  let transform = 'show-overlay-menu';

  // classlistAdd(banner, 'd-flex');
  document.getElementById(banner).classList.add('d-flex');
  classlistAdd(banner, transform);

  // setTimeout(() => classlistAdd(banner, transform), 2000);
  setTimeout(() => classlistRemove(banner, transform), 3000);
  classlistRemove(banner, transform);
  setTimeout(() => classlistRemove(banner, 'd-flex'), 250);
}

/**
 * Animate the banner for contact-related actions in mobile view.
 * @param {string} idMobile - The ID of the banner for mobile view.
 */
async function animateBannerContactsMobile(idMobile) {
  let banner = idMobile;
  console.log('idMobile:', idMobile);

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
 */
function toggleBackground(i) {
  contacts.forEach((contact, j) => {
    document.getElementById(`contact-list-basic-info${j}`).classList.remove('bg-primary');
    document.getElementById(`name-list${j}`).classList.remove('color-white');
  });

  document.getElementById(`contact-list-basic-info${i}`).classList.add('bg-primary');
  document.getElementById(`name-list${i}`).classList.add('color-white');
}
