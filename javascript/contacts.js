let contactColors = ['#FF7A00', '#9327FF', '#6E52FF', '#FC71FF', '#FFBB2B', '#1FD7C1', '#462F8A', '#FF4646'];
let letters = [];

async function init() {
  await loadData();
  await loadUser();
  // setUserInitials();
  render();
  setColorToActive('sidebarContacts', 'contacts-img', 'bottomBarContactsMobile', 'contactsImgMobile');
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
    const color = setBackgroundColor(i);
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

function setBackgroundColor(i) {
  return contactColors[i % contactColors.length];
}

function getFirstLetters(str) {
  return str.split(/\s/).reduce((response, word) => (response += word.slice(0, 1)), '');
}

function openContactInfo(i) {
  let contact = contacts[i];
  let acronym = getFirstLetters(contact.name);
  const color = setBackgroundColor(i);
  let content = document.getElementById('contact-info');
  content.innerHTML = '';
  content.innerHTML += openContactInfoHTML(contact, acronym, color, i);
  classlistAdd('wrapper-contact-info', 'show-overlay-menu');
  if (window.innerWidth < 800) {
    toggleContactInfoMobile();
  }
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
  classlistAdd('changesMobile', 'show-overlay-menu');
}

function closeChangesMenuMobile() {
  classlistRemove('changesMobile', 'show-overlay-menu');
  classlistRemove('changesMobileWrapper', 'd-flex');
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

  contacts.push({ name: firstLettersUppercase(name.value), mail: mail.value, phone: tel.value });

  await saveContacts();

  closePopup('add-contact-wrapper', 'add-contact-wrapper-mobile');
  let index = findContactIndex(name.value);
  openContactInfo(index);
  clearPopup(name, mail, tel);

  await animateBannerContacts('banner-contact-created', 'banner-contact-created-mobile');
  await init();
}

function findContactIndex(name) {
  return contacts.findIndex((obj) => obj.name.toLowerCase() === name.toLowerCase());
}

function closePopup(id1, id2) {
  classlistRemoveAndAdd(id1, 'd-block', 'd-none');
  classlistRemoveAndAdd(id2, 'd-block', 'd-none');
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

async function saveContacts() {
  await setItem('contacts', JSON.stringify(contacts));
}

function doNotClose(event) {
  event.stopPropagation();
}

function editContact(i, target) {
  let acronym = getFirstLetters(contacts[i].name);
  const color = setBackgroundColor(i);
  renderEditContactDesktopOrMobile(acronym, color, i);
  console.log('target:', target);

  let name1 = document.getElementById(`edit-name-${target}`);
  let mail = document.getElementById(`edit-mail-${target}`);
  let tel = document.getElementById(`edit-tel-${target}`);

  name1.value = contacts[i].name;
  mail.value = contacts[i].mail;
  tel.value = contacts[i].phone;
  if (target == 'desktop') {
    classlistRemoveAndAdd('edit-contact-wrapper', 'd-none', 'd-block');
  } else {
    classlistRemoveAndAdd('edit-contact-wrapper-mobile', 'd-none', 'd-block');
  }
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

  console.log('target:', target);

  // if (target == 'desktop') {
  //   classlistRemoveAndAdd('edit-contact-wrapper', 'd-block', 'd-none');
  // } else {
  //   classlistRemoveAndAdd('edit-contact-wrapper-mobile', 'd-block', 'd-none');
  // }
  await saveContacts();
  init();
  openContactInfo(i);
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
  if (window.innerWidth > 800) {
    banner = document.getElementById(idDesktop);
  } else {
    banner = document.getElementById(idMobile);
  }

  console.log('banner:', banner);

  classlistAdd('banner', 'show-overlay-menu-y');
  // await timeOut(2000);
  // classlistRemove('banner', 'show-overlay-menu-y');
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
  let name = document.getElementById('add-name');
  name.addEventListener('input', function (e) {
    name.setCustomValidity(''); //remove message when new text is input
  });
  name.addEventListener('invalid', function (e) {
    name.setCustomValidity('Please enter your full name'); //custom validation message for invalid text
  });
}
