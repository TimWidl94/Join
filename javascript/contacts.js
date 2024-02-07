let contactColors = ['#FF7A00', '#9327FF', '#6E52FF', '#FC71FF', '#FFBB2B', '#1FD7C1', '#462F8A', '#FF4646'];
let letters = [];

async function init() {
  await loadData();
  await loadUser();
  setUserInitials();
  setUserToContacts();
  setColorToContacts();
  render();
  setColorToActive('sidebarContacts', 'contacts-img', 'bottomBarContactsMobile', 'contactsImgMobile');
}

async function setUserToContacts() {
  let name = users[user].username;
  let mail = users[user].email;
  let userWithYou = name + ' (you)';
  let userExistsIndex = contacts.findIndex((contact) => contact.name === name);
  let userWithYouExistsIndex = contacts.findIndex((contact) => contact.name === userWithYou);

  if (userExistsIndex === -1) {
    // Füge den Benutzerkontakt hinzu, falls noch nicht vorhanden
    contacts.push({ name: firstLettersUppercase(name), mail: mail, phone: '', color: '' });
    userExistsIndex = contacts.length - 1; // Index des neuen Benutzerkontakts

    if (userWithYouExistsIndex === -1) {
      // Füge den Kontakt mit " (you)" hinzu, falls noch nicht vorhanden
      contacts.push({ name: userWithYou, mail: mail, phone: '', color: '' });
    }
  }
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

function render() {
  let content = document.getElementById('basic-info-wrapper');
  content.innerHTML = '';

  for (let i = 0; i < contacts.length; i++) {
    const contact = contacts[i];
    const firstLetter = contact.name.charAt(0);

    if (!letters.includes(firstLetter)) {
      letters.push(firstLetter);
    }
  }
  sortLetters();
  renderLetters();
}

function sortLetters() {
  letters.sort();
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

    if (firstLetter.includes(letter)) {
      sortContactsByAlphabet();
      contactBox.innerHTML += generateContactsHTML(contact, color, acronym, i);
    }
  }
}

function sortContactsByAlphabet() {
  return contacts.sort((a, b) => a.name.localeCompare(b.name));
}

function getFirstLetters(str) {
  return str.split(/\s/).reduce((response, word) => (response += word.slice(0, 1)), '');
}

function openContactInfo(i) {
  let contact = contacts[i];
  let acronym = getFirstLetters(contact.name);
  const color = contact.color;
  let content = document.getElementById('contact-info');
  classlistRemove('contact-info', 'show-overlay-menu');

  content.innerHTML = '';
  setTimeout(() => (content.innerHTML += openContactInfoHTML(contact, acronym, color, i)), 250);
  renderChangesMobile(i);

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
  console.log('changesMobile');
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

function classlistToggle(id, toggle) {
  document.getElementById(id).classList.toggle(toggle);
}

function classlistAdd(id, add) {
  document.getElementById(id).classList.add(add);
}

function classlistRemove(id, remove) {
  document.getElementById(id).classList.remove(remove);
}

function classlistRemoveAndAdd(id, remove, add) {
  document.getElementById(id).classList.remove(remove);
  document.getElementById(id).classList.add(add);
}

async function addContact(target) {
  let name = document.getElementById(`add-name-${target}`);
  let mail = document.getElementById(`add-mail-${target}`);
  let tel = document.getElementById(`add-tel-${target}`);

  contacts.push({ name: firstLettersUppercase(name.value), mail: mail.value, phone: tel.value, color: '' });

  await saveContacts();
  let index = findContactIndex(name.value);

  init();
  setColorToContacts();
  openContactInfo(index);
  render();

  clearPopup(name, mail, tel);
  await closeContactPopup(target, 'add');

  setTimeout(() => {
    animateBannerContacts('banner-contact-created', 'banner-contact-created-mobile');
  }, 500);
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

function firstLettersUppercase(str) {
  let splitStr = '';
  splitStr = str.toLowerCase().split(' ');
  for (let i = 0; i < splitStr.length; i++) {
    splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  return splitStr.join(' ');
}

function clearPopup(name, mail, tel) {
  name.value = '';
  mail.value = '';
  tel.value = '';
}

// noch benötigt?
async function saveContacts() {
  await setItem('contacts', JSON.stringify(contacts));
}

function doNotClose(event) {
  event.stopPropagation();
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
}

function renderEditContactDesktopOrMobile(acronym, color, i) {
  if (window.innerWidth > 800) {
    let contentDesktop = document.getElementById('edit-contact-wrapper');
    contentDesktop.innerHTML = editContactDesktopHTML(acronym, color, i);
  } else {
    let contentMobile = document.getElementById('edit-contact-wrapper-mobile');
    contentMobile.innerHTML = editContactMobileHTML(acronym, color, i);
  }
}

function validatePhoneNumber(input) {
  input.value = input.value.replace(/[^\d+\/\s-]/g, '');
}

async function saveEditedContact(i, target) {
  deleteUnusedLetter(i);
  let name = document.getElementById(`edit-name-${target}`);
  let mail = document.getElementById(`edit-mail-${target}`);
  let tel = document.getElementById(`edit-tel-${target}`);
  contacts[i].name = firstLettersUppercase(name.value);
  contacts[i].mail = mail.value;
  contacts[i].phone = tel.value;

  await saveContacts();
  init();

  await closeContactPopup(target, 'edit');
  openContactInfo(i);
  init();
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

  console.log('window.innerWidth:', window.innerWidth);
  console.log('banner:', banner);
  console.log('transform:', transform);

  classlistAdd(banner, 'd-flex');
  classlistAdd(banner, transform);
  await timeOut(1500);
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
function validateNameInput() {
  let name = document.getElementById('add-name-desktop').value;
  let errorMessage = document.getElementById('error-name');
  if (name.length >= 2 && name.length <= 50) {
    errorMessage.innerHTML = 'Name length is okay!';
  }
}

// noch aktualisieren?
function validateNameInput2() {
  let name = document.getElementById('add-name');
  name.addEventListener('input', function (e) {
    name.setCustomValidity(''); //remove message when new text is input
  });
  name.addEventListener('invalid', function (e) {
    name.setCustomValidity('Please enter your full name'); //custom validation message for invalid text
  });
}
