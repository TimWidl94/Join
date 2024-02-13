function hoverTodo(element) {
  let img = document.getElementById(element);
  img.setAttribute("src", "../assets/img/Summary/pencilWhiteDesktop.svg");
}

function unhoverTodo(element) {
  let img = document.getElementById(element);
  img.setAttribute("src", "../assets/img/Summary/pencilBlackDesktop.svg");
}

function hoverDone(element) {
  let img = document.getElementById(element);
  img.setAttribute("src", "../assets/img/Summary/hookButtonWhiteDesktop.svg");
}

function unhoverDone(element) {
  let img = document.getElementById(element);
  img.setAttribute("src", "../assets/img/Summary/hookButtonBlackDesktop.svg");
}


