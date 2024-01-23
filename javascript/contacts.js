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
  //   setBackgroundColor();
}

function loadContacts() {
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
  console.log('openContactInfo i', i);
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
                <div class="edit" onclick="editContact(i)">
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

function deleteContact(i) {
  contacts.splice(i, 1);

  loadContacts();
  document.getElementById('contact-info').innerHTML = '';

  let bannerContactDeleted = document.getElementById('banner-contact-deleted');
  bannerContactDeleted.style = 'display: flex';
  setTimeout(() => (bannerContactDeleted.style = 'display: none'), 2000);
}

function editContact(i) {
  // Hier können Sie den Code für die Bearbeitung des Kontakts implementieren
  console.log('editContact i', contacts[i].name);
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
