async function init(){
await loadData();
await loadUser();
}

/*Popup function */

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

  /*Add Task */
  function addTask() {
    let taskTitle = document.getElementById("taskTitle").value;
    let taskDescription = document.getElementById("taskDescription").value;
    
    let assignedTo = document.getElementById("assigned");
  
    // Clear existing options before adding new ones
    assignedTo.innerHTML = `<option value="">Select contacts to assign</option>`;
    
    for (let i = 0; i < users[i].length; i++) {
      let user = [i].username;
      assignedTo.innerHTML += `<option value="${user}">${user}</option>`;
    }
  }
  