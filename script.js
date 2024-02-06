const STORAGE_TOKEN = 'VC2LSO0A8LA3YVPRVEQITQU7QAYAYRXT9OOOICAS';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';

let user = [];
let users = [];
let contacts = [];

function initScript() {}

function timeOut(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function showTopbarDropdown() {
  document.getElementById('topbar-dropdown').classList.toggle('d-flex');
  document.getElementById('topbar-dropdown').classList.toggle('show-overlay-menu');
  console.log('showMenuTopbar');
}

function setUserInitials() {
  let x = user;

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
