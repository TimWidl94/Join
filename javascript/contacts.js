let contactColors = ['#FF7A00', '#9327FF', '#6E52FF', '#FC71FF', '#FFBB2B', '#1FD7C1', '#462F8A', '#FF4646'];
let letters = [];
let nameToCompare;

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

function setUsernameInContacts(userName) {
  let userWithYou = userName + ' (you)';
  let userWithYouExistsIndex = contacts.findIndex((contact) => contact.name === userWithYou);

  if (userWithYouExistsIndex === -1) {
    contacts.push({ name: userWithYou });
  }
}

function setColorToContacts() {
  for (let i = 0; i < contacts.length; i++) {
    let colorIndex = i % contactColors.length;
    contacts[i].color = contactColors[colorIndex];
  }
}

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

function renderLetters() {
  let letterBox = document.getElementById('contact-list-container');
  letterBox.innerHTML = '';

  for (let i = 0; i < letters.length; i++) {
    const letter = letters[i];
    letterBox.innerHTML += generateLettersHTML(letter);

    setContactsToFirstLetters(letter);
  }
}

function setContactsToFirstLetters(letter) {
  let contactBox = document.getElementById(`contacts-${letter}`);
  contactBox.innerHTML = '';

  for (let i = 0; i < contacts.length; i++) {
    const contact = contacts[i];
    const firstLetter = contact.name.charAt(0);
    const color = contact.color;
    let acronym = getFirstLetters(contact.name);
    let username = checkForUserName();
    if (firstLetter.includes(letter)) {
      sortContactsByAlphabet();
      if (contacts[i]['name'] === username) {
        contactBox.innerHTML += generateContactsYouHTML(contact, color, acronym, i);
      } else {
        contactBox.innerHTML += generateContactsHTML(contact, color, acronym, i);
      }
    }
  }
  saveContacts();
}

function findUserIndexByContactName(contactName) {
  for (let i = 0; i < users.length; i++) {
    if (users[i]['username'] === contactName) {
      return i;
    }
  }
  return -1;
}

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

function openContactInfoAnimations() {
  classlistRemove('contact-info', 'd-none');
  classlistAdd('contact-info', 'transition');
  setTimeout(() => classlistAdd('contact-info', 'show-overlay-menu'), 300);
  if (window.innerWidth < 800) {
    toggleContactInfoMobile();
  }
}

async function hideTransitionEffect() {
  classlistAdd('wrapper-contact-info', 'd-none');
  classlistRemove('wrapper-contact-info', 'show-overlay-menu');
}

function toggleContactInfoMobile() {
  classlistToggle('wrapper-contact-list', 'd-none');
  classlistToggle('wrapper-contact-info', 'd-flex');
  classlistToggle('addContactMobile', 'd-none');
  classlistToggle('optionsContactMobile', 'd-flex');
  classlistToggle('back-to-contact-list', 'd-flex');
}

function openChangesMenuMobile() {
  classlistAdd('changesMobileWrapper', 'd-flex');
  classlistAdd('changesMobile', 'd-flex');
  classlistAdd('changesMobile', 'show-overlay-menu');
  classlistAdd('optionsContactMobile', 'd-none');
}

function closeChangesMenuMobile() {
  classlistRemove('changesMobile', 'show-overlay-menu');
  classlistRemove('changesMobile', 'd-flex');
  classlistRemove('changesMobileWrapper', 'd-flex');
  classlistRemove('optionsContactMobile', 'd-none');
}

function renderChangesMobile(i) {
  let content = document.getElementById('changesMobileWrapper');
  content.innerHTML = '';
  content.innerHTML = changesMobileHTML(i);
}

async function addContact(target) {
  let index;
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
  setColorToContacts();
  await saveContacts();
  init();
  renderContacts();
  index = findContactIndex(name.value);
  openContactInfo(index);
  clearPopup(name, mail, tel);
  await closeContactPopup(target, 'add');
  setTimeout(() => animateBannerContacts('banner-contact-created', 'banner-contact-created-mobile'), 500);
}

function findContactIndex(name) {
  return contacts.findIndex((obj) => obj.name.toLowerCase() === name.toLowerCase());
}

function openPopup(id1, id2, direction) {
  classlistRemoveAndAdd(id1, 'd-none', 'd-block');
  setTimeout(() => classlistAdd(id2, direction), 50);
}

function closePopup(id1, id2, direction) {
  classlistRemove(id2, direction);
  setTimeout(() => classlistRemoveAndAdd(id1, 'd-block', 'd-none'), 250);
}

function clearPopup(name, mail, tel) {
  name.value = '';
  mail.value = '';
  tel.value = '';
}

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

async function saveEditedContact(i, target) {
  deleteUnusedLetter(i);
  let name = document.getElementById(`edit-name-${target}`);
  let mail = document.getElementById(`edit-mail-${target}`);
  let tel = document.getElementById(`edit-tel-${target}`);
  let newSavedName = firstLettersUppercase(name.value);
  contacts[i].name = firstLettersUppercase(name.value);
  contacts[i].mail = mail.value;
  contacts[i].phone = tel.value;

  checkTasksSelectedContactNames(newSavedName);
  await saveContacts();
  init();
  await closeContactPopup(target, 'edit');
  openContactInfo(i);
}

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

async function closeContactPopup(target, type) {
  if (target == 'desktop') {
    closePopup(`${type}-contact-wrapper`, `${type}-contact`, 'show-overlay-menu');
  } else {
    closePopup(`${type}-contact-wrapper-mobile`, `${type}-contact-mobile`, 'show-overlay-menu-y');
  }
}

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

function deleteUnusedLetter(i) {
  let index = letters.indexOf(contacts[i].name.charAt(0));
  letters.splice(index, 1);
}

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

async function animateBannerContacts(idDesktop, idMobile) {
  let banner;
  let transform;

  if (window.innerWidth > 800) {
    banner = idDesktop;
    transform = 'show-overlay-menu';
  } else {
    banner = idMobile;
    transform = 'show-overlay-menu-y';
  }

  classlistAdd(banner, 'd-flex');
  classlistAdd(banner, transform);
  setTimeout(() => classlistRemove(banner, transform), 3000);
  classlistRemove(banner, transform);
  setTimeout(() => classlistRemove(banner, 'd-flex'), 250);
}

function toggleBackground(i) {
  contacts.forEach((contact, j) => {
    document.getElementById(`contact-list-basic-info${j}`).classList.remove('bg-primary');
    document.getElementById(`name-list${j}`).classList.remove('color-white');
  });

  document.getElementById(`contact-list-basic-info${i}`).classList.add('bg-primary');
  document.getElementById(`name-list${i}`).classList.add('color-white');
}

async function saveContacts() {
  await setItem('contacts', JSON.stringify(contacts));
}

function doNotClose(event) {
  event.stopPropagation();
}

function sortContactsByAlphabet() {
  return contacts.sort((a, b) => a.name.localeCompare(b.name));
}

function getFirstLetters(str) {
  return str.split(/\s/).reduce((response, word) => (response += word.slice(0, 1)), '');
}

function validatePhoneNumber(input) {
  input.value = input.value.replace(/[^\d+\/\s-]/g, '');
}
