async function init(){
await loadData();
}

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
  