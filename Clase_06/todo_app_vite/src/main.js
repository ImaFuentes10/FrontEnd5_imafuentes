/* (MODULO) Este es el punto de entrada del aplicativo, el que concentra todas las funcionalidades */

import { userSchema, todoSchema, validate } from "./schema.js";
import { addTodo, getTodos } from "./state.js";
import {
    renderErrors,
    renderRegisterOutput,
    renderTodoList,
    setupTodoActions,
} from "./dom.js";

/* ---------- 1. Registro ---------- */
const registerForm = document.querySelector("#registerForm");
const registerOutput = document.querySelector("#registerOutput");

registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(registerForm));
    const { data, errors } = validate(userSchema, formData);

    console.log("FORMDATA:", formData)

    if (errors) {
        renderErrors(registerForm, errors);
    } else {
        renderErrors(registerForm); // limpia
        renderRegisterOutput(registerOutput, data);
        registerForm.reset();
    }
});

/* ---------- 2. Todo App ---------- */
const todoForm = document.querySelector("#todoForm");
export const todoList = document.querySelector("#todoList");

export async function refreshTodos(ul) {
    const todos = await getTodos()
    console.log("ToDo List:", todos )
    renderTodoList(ul);
    console.log("prueba")
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
        todoForm.reset();
        await refreshTodos(todoList);
    }
});

