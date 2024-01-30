async function init() {
  await includeHTML();
  await loadData();
  loadUser();
  setUserInitials();
  setColorToActive('sidebarSummary', 'summary-img', 'bottomBarSummaryMobile', 'summaryImgMobile');
}
