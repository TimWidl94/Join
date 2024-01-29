let contactColors = ['#FF7A00', '#9327FF', '#6E52FF', '#FC71FF', '#FFBB2B', '#1FD7C1', '#462F8A', '#FF4646'];
let letters = [];

async function init() {
  await loadData();
  loadUser();
  render();
  setColorToAktive("sidebarContacts");
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

  contacts.push({ name: firstLettersUppercase(name.value), mail: mail.value, phone: tel.value });

  saveContacts();
  classlistRemoveAndAdd('add-contact-wrapper', 'd-block', 'd-none');

  clearPopup(name, mail, tel);

  let bannerContactAdded = document.getElementById('banner-contact-created');
  await animateBannerContacts(bannerContactAdded);

  console.log('Test12345');
  init();
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
  await setItem('contacts', JSON.stringify(contacts));
}

function doNotClose(event) {
  event.stopPropagation();
}

function editContact(i) {
  let acronym = getFirstLetters(contacts[i].name);
  const color = setBackgroundColor(i);
  let content = document.getElementById('edit-contact-wrapper');
  content.innerHTML = editContactHTML(acronym, color, i);

  let name = document.getElementById('edit-name');
  let mail = document.getElementById('edit-mail');
  let tel = document.getElementById('edit-tel');

  name.value = contacts[i].name;
  mail.value = contacts[i].mail;
  tel.value = contacts[i].phone;

  classlistRemoveAndAdd('edit-contact-wrapper', 'd-none', 'd-block');
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
  classlistRemoveAndAdd('edit-contact-wrapper', 'd-block', 'd-none');
  init();
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

function validateNameInput() {
  let name = document.getElementById('add-name');
  name.addEventListener('input', function (e) {
    name.setCustomValidity(''); //remove message when new text is input
  });
  name.addEventListener('invalid', function (e) {
    name.setCustomValidity('Please enter your full name'); //custom validation message for invalid text
  });
}
