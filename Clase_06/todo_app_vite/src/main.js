/* (MODULO) Este es el punto de entrada del aplicativo, el que concentra todas las funcionalidades */

import { userSchema, todoSchema, loginSchema, validate } from "./schema.js";
import { addTodo, getTodos, addUser, getUsers } from "./state.js";
import {
    renderErrors,
    //renderRegisterOutput,
    renderTodoList,
    setupTodoActions,
    renderUserCard
} from "./dom.js";
import {
    toggleLoginUserCard,
    toggleRegisterFormSuccess,
    toggleBtnLoader
} from "./toggles.js"


/* ---------- 1. Iniciar Sesión ---------- */
const loginForm = document.querySelector("#loginForm");

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();    

    const formData = Object.fromEntries(new FormData(loginForm));
    const {errors} = validate(loginSchema, formData);

    console.log("FORMDATALOGIN:", formData)

    const email = formData.emailLogin;
    const password = formData.passwordLogin;
    
    if (errors) {
        renderErrors(loginForm, errors);
    } else {
        toggleBtnLoader(loginForm);
        const users = await getUsers();
        toggleBtnLoader(loginForm);
        //renderRegisterOutput(registerOutput, data);
        users.forEach(user => {
            if (email === user.email && password === user.password) {
                loginForm.reset();
                toggleLoginUserCard();
                renderUserCard(user);  
            } else renderErrors(loginForm, {}, "Correo o contraseña incorrectos");
        });  
    }
});



/* ---------- 2. Registro ---------- */
const registerForm = document.querySelector("#registerForm");
//const registerOutput = document.querySelector("#registerOutput");

registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(registerForm));
    const { data, errors } = validate(userSchema, formData);

    console.log("FORMDATA:", formData)

    if (errors) {
        renderErrors(registerForm, errors);
    } else {
        await addUser(data);
        renderErrors(registerForm); // limpia
        //renderRegisterOutput(registerOutput, data);
        const userCardSection = document.querySelector("#userCard");
        renderUserCard(data);
        toggleRegisterFormSuccess();
        registerForm.reset();
    }
});



/* ---------- 3. Todo App ---------- */
const todoForm = document.querySelector("#todoForm");
export const todoList = document.querySelector("#todoList");

export async function refreshTodos(ul) {
    const todos = await getTodos()
    //console.log("ToDo List:", todos )
    renderTodoList(ul);
}
refreshTodos(todoList);
setupTodoActions(todoList, refreshTodos);

todoForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(todoForm));
    const { data, errors } = validate(todoSchema, formData);

    if (errors) {
        renderErrors(todoForm, errors);
    } else {
        await addTodo(data);
        renderErrors(todoForm);
        await refreshTodos(todoList);
        todoForm.reset();
    }
});

