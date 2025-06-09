/* modulo para paginación con cambio de las tarjetas */

export function toggleLoginRegisterForm () {
    
    const loginCard = document.querySelectorAll('.loginCard');
    const registerForm = document.querySelectorAll('.registerContainer');

    loginCard.forEach(element => element.classList.toggle("hide"));
    registerForm.forEach(element => element.classList.toggle("hide"));
}

export function toggleLoginUserCard () {
    
    const loginCard = document.querySelectorAll('.loginCard');
    const userCard = document.querySelectorAll('.userCard');
    
    loginCard.forEach(element => element.classList.toggle("hide"));
    userCard.forEach(element => element.classList.toggle("hide"));
    toggleTodoForm();

    // Limpia el error general del login
    const loginForm = document.querySelector("#loginForm");
    if (loginForm) {
        const generalFeedback = loginForm.querySelector("#generalFeedback");
        if (generalFeedback) {
            generalFeedback.textContent = "";
            generalFeedback.classList.remove("d-block");
        }
    }
}

export function toggleRegisterFormUserCard () {
    const registerForm = document.querySelectorAll('.registerContainer');
    const userCard = document.querySelectorAll('.userCard');

    registerForm.forEach(element => element.classList.toggle("hide"));
    userCard.forEach(element => element.classList.toggle("hide"));
    toggleTodoForm();
}

export function toggleTodoForm () {
    const todoFormCard = document.querySelector("#todoFormCard");

    //src.forEach(element => element.classList.toggle("hide"));
    todoFormCard.classList.toggle("hide");
}
