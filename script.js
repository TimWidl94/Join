const STORAGE_TOKEN = '1A3L76SPA4NC4PAYEHDAQA1YFXXKV47R442Z0HYA';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';

let users = [
    // {
      // username: "Guest",
      // email: "Guest@web.de",
      // password: "admin123",
      // checkPassword: "admin123",
    // },
  ];


async function init(){
    await includeHTML();
    await loadUsers();
    await loadLogIn();
}



