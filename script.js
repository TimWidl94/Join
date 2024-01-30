const STORAGE_TOKEN = 'PMCKRRRV9CH8F1TK8KJ6WP6VVWZRF2VBX7NW4PTS';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';

let user = [];
let users = [];
let contacts = [];

function initScript() {}

function timeOut(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function showMenu() {
  document.getElementById('topbar-dropdown').classList.toggle('show-overlay-menu');
}

function setUserInitials() {
  let x = user;
  if (user > -1) {
    // let name = users[user].name;
    console.log('users:', users);
    console.log('user:', user);
  } else {
    console.log('No user found!');
  }

  let acronym = getFirstLetters(users[x]['username']);
  let content = document.getElementById('topbar-user');
  content.innerHTML = '';
  content.innerHTML = /*html*/ `
    <p>${acronym}</p>
  `;
}

function setColorToActive(id1, id2, id3, id4) {
  let textSidebar = document.getElementById(id1);
  textSidebar.classList.add('active');
  let imageSidebar = document.getElementById(id2);
  imageSidebar.classList.add('filter-white');
  let textBottombar = document.getElementById(id3);
  textBottombar.classList.add('active');
  let imageBottombar = document.getElementById(id4);
  imageBottombar.classList.add('filter-white');
}

function getFirstLetters(str) {
  return str.split(/\s/).reduce((response, word) => (response += word.slice(0, 1)), '');
}
