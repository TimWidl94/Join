let contacts = [
  {
    name: 'Anton Mayer',
    mail: 'antom@gmail.com',
    phone: '+49 1111 111 11 1',
  },
  {
    name: 'Anja Schulz',
    mail: 'schulz@hotmail.com',
    phone: '+49 2222 222 22 2',
  },
  {
    name: 'Benedikt Ziegler',
    mail: 'benedikt@gmail.com',
    phone: '+49 3333 333 33 3',
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
    name: 'Tatjana Wolf',
    mail: 'wolf@gmail.com',
    phone: '+49 8888 888 88 8',
  },
];

let contactColors = ['#FF7A00', '#9327FF', '#6E52FF', '#FC71FF', '#FFBB2B', '#1FD7C1', '#462F8A', '#FF4646'];

function init() {
  loadContacts();
  renderContacts();
  //   setBackgroundColor();
  console.log('init');
}

function loadContacts() {
  let contactsAsText = localStorage.getItem('contacts');
  if (contactsAsText) {
    contacts = JSON.parse(contactsAsText);
  }
}

function renderContacts() {
  document.getElementById('basic-info-wrapper').innerHTML = '';

  for (let i = 0; i < contacts.length; i++) {
    const contact = contacts[i];
    let acronym = getFirstLetters(contact.name);

    document.getElementById('basic-info-wrapper').innerHTML += /*html*/ `
        <div id="contact-list-basic-info${i}" class="contact-list-basic-info" onclick="toggleBackground(${i}), openContactInfo(${i})">
            <div class="capital-letters-list" id="capital-letters-list${i}"> 
                <p id="capital-letters-list">${acronym}</p>
                </div>
            <div id="name-and-mail"> 
            <p id="name-list${i}">${contact.name}</p>
              <p id="email-list">${contact.mail}</p>
          </div>
        </div>
        `;
  }
}

function getFirstLetters(str) {
  return str.split(/\s/).reduce((response, word) => (response += word.slice(0, 1)), '');
}

function openContactInfo(i) {
  let contact = contacts[i];
  let acronym = getFirstLetters(contact.name);
  document.getElementById('contact-info').innerHTML = '';
  document.getElementById('contact-info').innerHTML += /*html*/ `
    <div id="basic-info">
        <div class="capital-letters">
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

function showPopupAddContact() {
  document.getElementById('add-contact-wrapper').classList.remove('d-none');
  document.getElementById('add-contact-wrapper').classList.add('d-block');
}

function closePopupAddContact() {
  document.getElementById('add-contact-wrapper').classList.remove('d-block');
  document.getElementById('add-contact-wrapper').classList.add('d-none');
}

function showPopupEditContact() {
  document.getElementById('edit-contact-wrapper').classList.remove('d-none');
  document.getElementById('edit-contact-wrapper').classList.add('d-block');
}

function closePopupEditContact() {
  document.getElementById('edit-contact-wrapper').classList.remove('d-block');
  document.getElementById('edit-contact-wrapper').classList.add('d-none');
}

function addContact() {
  let name = document.getElementById('add-name');
  let mail = document.getElementById('add-mail');
  let tel = document.getElementById('add-tel');

  contacts.push({ name: name.value, mail: mail.value, phone: tel.value });

  saveContacts();
  closePopupAddContact();
  init();
  clearPopup(name, mail, tel);

  let bannerContactCreated = document.getElementById('banner-contact-created');
  animateBannerContacts(bannerContactCreated);

  setTimeout(() => 2000);
  return false;
}

function clearPopup(name, mail, tel) {
  name.value = '';
  mail.value = '';
  tel.value = '';
}

function saveContacts() {
  console.log('saveContacts 123:', contacts);
  let contactsAsText = JSON.stringify(contacts);
  localStorage.setItem('contacts', contactsAsText);
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
  let name = document.getElementById('edit-name');
  let mail = document.getElementById('edit-mail');
  let tel = document.getElementById('edit-tel');
  contacts[i].name = name.value;
  contacts[i].mail = mail.value;
  contacts[i].phone = tel.value;

  saveContacts();
  closePopupEditContact();
  init();

  return false;
}

function deleteContact(i) {
  contacts.splice(i, 1);

  saveContacts();
  init();
  document.getElementById('contact-info').innerHTML = '';

  let bannerContactDeleted = document.getElementById('banner-contact-deleted');
  animateBannerContacts(bannerContactDeleted);
}

function animateBannerContacts(banner) {
  banner.style = 'display: flex';
  setTimeout(() => (banner.style = 'display: none'), 2000);
}

function toggleBackground(i) {
  //   let removeBackground = document.getElementById('contact-list-basic-info');
  //   removeBackground.forEach((element) => {
  //     element.classList.remove('bg-primary');
  //     console.log('removeBackground:', removeBackground);
  //   });
  document.getElementById(`contact-list-basic-info${i}`).classList.toggle('bg-primary');
  document.getElementById(`name-list${i}`).classList.toggle('color-white');
}

// function setBackgroundColor() {
//   let element = document.getElementById(`capital-letters-list${i}`);

//   for (let i = 0; i < contacts.length; i++) {
//     for (let j = 0; j < contactColors.length; j++) {
//       const element = array[j];
//     }
//   }
// }
