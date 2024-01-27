function changeOptic(id) {
  let menuItems = document.querySelectorAll('menu-category');

  menuItems.forEach(function (item) {
    item.classList.remove('active');
  });

  let clickedItem = document.getElementById(id);
  clickedItem.classList.add('active');
  console.log('Classlist Set to:', id);
}
