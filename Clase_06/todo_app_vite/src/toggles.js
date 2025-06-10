/* modulo para paginación con cambio de las tarjetas */
import { renderTodoList } from './dom'
import { todoList } from './main'

/* LogIn to Register Form */
export function toggleLoginRegisterForm () {
    
    const loginCard = document.querySelectorAll('.loginCard');
    const registerForm = document.querySelectorAll('.registerContainer');

    loginCard.forEach(element => element.classList.toggle("hide"));
    registerForm.forEach(element => element.classList.toggle("hide"));
}


/* LogIn to User Card */
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


/* Register Form to Success Card */
export function toggleRegisterFormSuccess () {
    const registerForm = document.querySelectorAll('.registerContainer');
    const success = document.querySelector('#regSuccess');

    registerForm.forEach(element => element.classList.toggle("hide"));
    success.classList.toggle("hide");
}


/* Success Card to user Card */
export function toggleSuccessUserCard () {
    const success = document.querySelector('#regSuccess');
    const userCard = document.querySelectorAll('.userCard');

    success.classList.toggle("hide");
    userCard.forEach(element => element.classList.toggle("hide"));
    toggleTodoForm();
}


/* Show and Hide ToDo Form */
export function toggleTodoForm () {   
    const todoFormCard = document.querySelector("#todoFormCard");

    todoFormCard.classList.toggle("hide");
    todoList.innerHTML = "";
    renderTodoList(todoList)
}


/* Login button Loader */
export function toggleBtnLoader (form) {
    const btnLoader = form.querySelectorAll(".btn-loader");
    
    btnLoader.forEach(el => el.classList.toggle("hide"));
}