const STORAGE_TOKEN = '1A3L76SPA4NC4PAYEHDAQA1YFXXKV47R442Z0HYA';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';

let users = [];

async function init() {
  await includeHTML();
  await loadUsers();
  await loadLogIn();
  await loadLocalStorageData();
}

function timeOut(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
