async function init() {
  await includeHTML();
  await loadData();
  loadUser();
  setUserInitials();
  setColorToAktive('sidebarSummary', 'summary-img', 'bottomBarSummaryMobile', 'summaryImgMobile');
}
