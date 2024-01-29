async function init() {
    await loadData();
    await loadUser();
    setUserInitials();
  }