const STORAGE_TOKEN = '1A3L76SPA4NC4PAYEHDAQA1YFXXKV47R442Z0HYA';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';

let users = [];



function timeOut(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function openAddTaskPopup() {
  document.getElementById('addTaskPopup').classList.remove('d-none');
  document.getElementById('addTaskPopup').classList.add('slide-in');
}

function closeAddTaskPopup() {
  let addTaskPopup = document.getElementById('addTaskPopup');
  addTaskPopup.classList.remove('slide-in');
  addTaskPopup.classList.add('slide-out');

  setTimeout(function () {
    addTaskPopup.classList.remove('slide-out');
    addTaskPopup.classList.add('d-none');
  }, 900);
}
