async function init() {
  await includeHTML();
  await loadData();
  loadUser();
  setColorToAktive("sidebarSummary");
}
