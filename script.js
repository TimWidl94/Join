const STORAGE_TOKEN = 'PMCKRRRV9CH8F1TK8KJ6WP6VVWZRF2VBX7NW4PTS';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';

let user = [];
let users = [];
let contacts = [];

function timeOut(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
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
