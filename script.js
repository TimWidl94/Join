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

  let acronym = getFirstLetters(users[x]['username']);
  let content = document.getElementById('topbar-user');
  content.innerHTML = '';
  content.innerHTML = /*html*/ `
    <p>${acronym}</p>
  `;
}

/**
 * sets the current page active on the sidebar
 */
function selectSidebar() {
  console.log('selectSidebar clicked');
  let currentPage = window.location.pathname;
  let idMappings = {
    '/summary.html': ['id-0'],
    '/board.html': ['id-1'],
    '/Join/task.html': ['id-2'],
    '/Join/contacts.html': ['id-3'],
    '/Join/legal_notice.html': ['id-4'],
    '/Join/privacy_policy.html': ['id-5'],
    '/Join/legal_notice_out.html': ['id-6'],
    '/Join/privacy_policy_out.html': ['id-7'],
  };

  let ids = idMappings[currentPage];
  console.log('ids:', ids);
  console.log('currentPage:', currentPage);

  if (ids) {
    ids.forEach((id) => {
      const sidebarItem = document.getElementById(id);
      sidebarItem.classList.add('active');
      sidebarItem.children[0].classList.add('active');
      console.log('classlist set');
    });
  }
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
