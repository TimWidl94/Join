let todos = [{
  'id': 0,
  'title': 'Putzen',
  'category': 'open'
}, {
  'id': 1,
  'title': 'Kochen',
  'category': 'open'
}, {
  'id': 2,
  'title': 'Einkaufen',
  'category': 'closed'
}];
let currentDraggedElement;

function init(){
    loadData();
    loadUser();
    updateHTML();
}

function openAddTaskPopup() {
    document.getElementById('addTaskPopup').classList.remove('d-none');
    document.getElementById('addTaskPopup').classList.add('slide-in');
  }
  
   function closeAddTaskPopup() {
      let addTaskPopup = document.getElementById("addTaskPopup");
      addTaskPopup.classList.remove("slide-in");
      addTaskPopup.classList.add("slide-out");
      
      setTimeout(function () {
    
          addTaskPopup.classList.add("d-none");
        }, 500);
        setTimeout(function () {
          addTaskPopup.classList.remove("slide-out");
        }, 900);
}

function startDragging(id) {
  currentDraggedElement = id;
}

function updateHTML() {
  let open = todos.filter(t => t['category'] == 'open');

  document.getElementById('open').innerHTML = '';

  for (let index = 0; index < open.length; index++) {
      const element = open[index];
      document.getElementById('open').innerHTML += generateTodoHTML(element);
  }

  let closed = todos.filter(t => t['category'] == 'closed');

  document.getElementById('closed').innerHTML = '';

  for (let index = 0; index < closed.length; index++) {
      const element = closed[index];
      document.getElementById('closed').innerHTML += generateTodoHTML(element);
  }
}

function allowDrop(ev) {
  ev.preventDefault();
}

function moveTo(category) {
  todos[currentDraggedElement]['category'] = category;
  updateHTML();
}

function highlight(id) {
  document.getElementById(id).classList.add('drag-area-highlight');
}

function removeHighlight(id) {
  document.getElementById(id).classList.remove('drag-area-highlight');
}