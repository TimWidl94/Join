async function loadData() {
  try {
    users = JSON.parse(await getItem("users"));
    contacts = JSON.parse(await getItem('contacts'));
    tasks = JSON.parse(await getItem('tasks'));
  } catch (e) {
    console.info("could not load users");
  }
}

async function getItem(key) {
  const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
  return await fetch(url)
    .then((res) => res.json())
    .then((res) => res.data.value);
}

async function setItem(key, value) {
  const payload = { key, value, token: STORAGE_TOKEN };
  return await fetch(STORAGE_URL, {
    method: "POST",
    body: JSON.stringify(payload),
  }).then((res) => res.json());
}

function loadUser() {
  let userAsText = localStorage.getItem('user');
  if (userAsText) {
    user = JSON.parse(userAsText);
  }
}