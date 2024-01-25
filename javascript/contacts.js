let contacts = [
  {
    name: 'Tatjana Wolf',
    mail: 'wolf@gmail.com',
    phone: '+49 8888 888 88 8',
  },
  {
    name: 'David Eisenberg',
    mail: 'davidberg@gmail.com',
    phone: '+49 4444 444 44 4',
  },
  {
    name: 'Eva Fischer',
    mail: 'eva@gmail.com',
    phone: '+49 5555 555 55 5',
  },
  {
    name: 'Anton Mayer',
    mail: 'antom@gmail.com',
    phone: '+49 1111 111 11 1',
  },
  {
    name: 'Emmanuel Mauer',
    mail: 'emmanuelma@gmail.com',
    phone: '+49 6666 666 66 6',
  },
  {
    name: 'Marcel Bauer',
    mail: 'bauer@gmail.com',
    phone: '+49 7777 777 77 7',
  },
  {
    name: 'Benedikt Ziegler',
    mail: 'benedikt@gmail.com',
    phone: '+49 3333 333 33 3',
  },
  {
    name: 'Anja Schulz',
    mail: 'schulz@hotmail.com',
    phone: '+49 2222 222 22 2',
  },
];
=======
// let contacts = [
  // {
    // name: 'Anton Mayer',
    // mail: 'antom@gmail.com',
    // phone: '+49 1111 111 11 1',
  // },
  // {
    // name: 'Anja Schulz',
    // mail: 'schulz@hotmail.com',
    // phone: '+49 2222 222 22 2',
  // },
  // {
    // name: 'Benedikt Ziegler',
    // mail: 'benedikt@gmail.com',
    // phone: '+49 3333 333 33 3',
  // },
  // {
    // name: 'David Eisenberg',
    // mail: 'davidberg@gmail.com',
    // phone: '+49 4444 444 44 4',
  // },
  // {
    // name: 'Eva Fischer',
    // mail: 'eva@gmail.com',
    // phone: '+49 5555 555 55 5',
  // },
  // {
    // name: 'Emmanuel Mauer',
    // mail: 'emmanuelma@gmail.com',
    // phone: '+49 6666 666 66 6',
  // },
  // {
    // name: 'Marcel Bauer',
    // mail: 'bauer@gmail.com',
    // phone: '+49 7777 777 77 7',
  // },
  // {
    // name: 'Tatjana Wolf',
    // mail: 'wolf@gmail.com',
    // phone: '+49 8888 888 88 8',
  // },
// ];

let contactColors = ['#FF7A00', '#9327FF', '#6E52FF', '#FC71FF', '#FFBB2B', '#1FD7C1', '#462F8A', '#FF4646'];
let letters = [];

async function init() {
  await loadData();
  loadUser();
  render();
  //   setBackgroundColor();
}

// function loadContacts() {
  // let contactsAsText = localStorage.getItem('contacts');
  // if (contactsAsText) {
    // contacts = JSON.parse(contactsAsText);
  // }
// }

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
}

function showPopupEditContact() {
  document.getElementById('edit-contact-wrapper').classList.remove('d-none');
  document.getElementById('edit-contact-wrapper').classList.add('d-block');
}

function closePopupEditContact() {
  document.getElementById('edit-contact-wrapper').classList.remove('d-block');
  document.getElementById('edit-contact-wrapper').classList.add('d-none');
}

function classlistRemoveAndAdd(id, remove, add) {
  document.getElementById(id).classList.remove(remove);
  document.getElementById(id).classList.add(add);
}

async function addContact() {
  renderAddContactForm();
  let name = document.getElementById('add-name');
  let mail = document.getElementById('add-mail');
  let tel = document.getElementById('add-tel');

  // let nameValue = firstLettersUppercase(name.value);

  contacts.push({ name: firstLettersUppercase(name.value), mail: mail.value, phone: tel.value });

  saveContacts();
  classlistRemoveAndAdd('add-contact-wrapper', 'd-block', 'd-none');

  clearPopup(name, mail, tel);

  let bannerContactAdded = document.getElementById('banner-contact-created');
  await animateBannerContacts(bannerContactAdded);

  init();

  return true;
}

function renderAddContactForm() {}

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
  // let contactsAsText = JSON.stringify(contacts);
  // localStorage.setItem('contacts', contactsAsText);
  await setItem('contacts', JSON.stringify(contacts));
}

function doNotClose(event) {
  event.stopPropagation();
}

function editContact(i) {
  let content = document.getElementById('edit-contact-wrapper');
  content.innerHTML = editContactHTML(i);

  let name = document.getElementById('edit-name');
  let mail = document.getElementById('edit-mail');
  let tel = document.getElementById('edit-tel');

  name.value = contacts[i].name;
  mail.value = contacts[i].mail;
  tel.value = contacts[i].phone;

  showPopupEditContact();
}

function validatePhoneNumber(input) {
  input.value = input.value.replace(/[^\d+\/\s-]/g, '');
}

function saveEditedContact(i) {
  deleteUnusedLetter(i);
  let name = document.getElementById('edit-name');
  let mail = document.getElementById('edit-mail');
  let tel = document.getElementById('edit-tel');
  contacts[i].name = firstLettersUppercase(name.value);
  contacts[i].mail = mail.value;
  contacts[i].phone = tel.value;

  saveContacts();
  closePopupEditContact();
  init();

  return false;
}

async function deleteContact(i) {
  deleteUnusedLetter(i);
  contacts.splice(i, 1);

  await saveContacts();
  document.getElementById('contact-info').innerHTML = '';
  init();

  let bannerContactDeleted = document.getElementById('banner-contact-deleted');
  animateBannerContacts(bannerContactDeleted);
}

function deleteUnusedLetter(i) {
  let index = letters.indexOf(contacts[i].name.charAt(0));
  console.log('contacts[i].name', contacts[i].name.charAt(0));
  console.log('letters:', letters);
  console.log('index:', index);
  letters.splice(index, 1);
  console.log('letters:', letters);
}

async function animateBannerContacts(banner) {
  banner.style = 'display: flex';
  await timeOut(2000);
  banner.style = 'display: none';
}

function toggleBackground(i) {
  contacts.forEach((contact, j) => {
    document.getElementById(`contact-list-basic-info${j}`).classList.remove('bg-primary');
    document.getElementById(`name-list${j}`).classList.remove('color-white');
  });

  document.getElementById(`contact-list-basic-info${i}`).classList.add('bg-primary');
  document.getElementById(`name-list${i}`).classList.add('color-white');
}
