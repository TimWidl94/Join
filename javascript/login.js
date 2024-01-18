function signUp(){
    let container = document.getElementById('loginScreenBody');
    changeCssFromInput(container);
    container.innerHTML = ``;

    container.innerHTML = `
    
    
    
    `
}

function changeCssFromInput(container){
    container.style.width = "422px";
    container.style.height = "534px";
}