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
  setBackgroundColor();
}

function loadContacts() {
  document.getElementById('basic-info-wrapper').innerHTML = '';

  for (let i = 0; i < contacts.length; i++) {
    const contact = contacts[i];
    let str = contact.name;
    let acronym = str.split(/\s/).reduce((response, word) => (response += word.slice(0, 1)), '');

    document.getElementById('basic-info-wrapper').innerHTML += /*html*/ `
       <div id="contact-list-basic-info">
      <div class="capital-letters-list" id="capital-letters-list${i}"> 
            <p id="capital-letters-list">${acronym}</p>
            </div>
          <div id="name-and-mail"> 
          <p id="name-list">${contact.name}</p>
              <p id="email-list">${contact.mail}</p>
          </div>
          </div>
        `;
  }
}

function setBackgroundColor() {
  let element = document.getElementById(`capital-letters-list${i}`);

  for (let i = 0; i < contacts.length; i++) {
    for (let j = 0; j < contactColors.length; j++) {
      const element = array[j];
    }
  }
}
