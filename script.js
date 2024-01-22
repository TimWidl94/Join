let users = [
    {
      username: "Guest",
      email: "Guest@web.de",
      password: "admin123",
      checkPassword: "admin123",
    },
  ];


async function init(){
    await includeHTML();
    await loadLogIn();
    loadLocalStorageData();
}



