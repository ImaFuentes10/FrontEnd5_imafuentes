/* Este MODULO es el encargado de renderizar y redibujar todo el contenido, osea todo el DOM */
import { getTodos, toggleDone, removeTodo } from "./state.js"



/* ---------- utilidades ---------- */
export function renderErrors(form, errors = {}) {

    // limpia estados previos
    [...form.elements].forEach((el) => {
        if (!el.name) return;
        el.classList.remove("is-invalid", "is-valid");
        const feedback = el.closest(".input-group")?.querySelector(".invalid-feedback") ?? el.nextElementSibling;
        if (feedback) {
            feedback.textContent = "";
            feedback.classList.remove("d-block");
        }
    });
    //

    // muestra nuevos
    Object.entries(errors).forEach(([name, msgs]) => {
        const input = form.elements[name];
        if (!input) return;
        input.classList.add("is-invalid");
        input.nextElementSibling.textContent = msgs[0];
        input.nextElementSibling.classList.add("d-block");
    });

    // green cuando todo ok
    if (!Object.keys(errors).length) {
        [...form.elements]
            .filter((el) => el.name)
            .forEach((el) => el.classList.add("is-valid"));
    }
}

/* export function renderRegisterOutput(pre, dataObj) {
    pre.textContent = JSON.stringify(dataObj, null, 2);
} */


/* renderTodoList function */
/* creates each todo card with buttons. If todo done, then adds 'done' class */
export async function renderTodoList(ul) {
    ul.replaceChildren(); // limpia

    const todos = await getTodos()
   
    todos.forEach((todo) => {
        
        const li = document.createElement("li");
        li.className =
            "list-group-item d-flex justify-content-between align-items-center";
        if (todo.done) li.classList.add("done");

        li.innerHTML = `
      <span>${todo.task} <small class="badge bg-info ms-2">${todo.dueDate}</small></span>
      <div>
        <button class="btn btn-sm btn-outline-success me-2" data-action="toggle" data-id="${todo.id}">
            <i class="bi bi-check"></i>
        </button>
        <button class="btn btn-sm btn-outline-danger" data-action="delete" data-id="${todo.id}">
            <i class="bi bi-trash"></i>
        </button>
      </div>
    `;

        ul.appendChild(li);
    });
    return
}


/* ---------- evento delegación para lista ---------- */
/* this function is always active, when ul has a click it activates the corresponding funciton depending on the button, then callback refreshTodo*/
export function setupTodoActions(ul, onChange) {
    ul.addEventListener("click", async (e) => {

        const btn = e.target.closest("button");

        if (!btn) return;

        const { action, id } = btn.dataset;
        if (action === "toggle") await toggleDone(id);
        if (action === "delete") await removeTodo(id);

        await onChange(ul);
    });
}

const registerBtn = document.querySelector('#registerBtn');

registerBtn.addEventListener("click", () => {
    toggleRegisterForm();
});


export function toggleRegisterForm () {
    const registerForm = document.querySelectorAll('.registerContainer');
    const loginCard = document.querySelectorAll('.loginCard');

    registerForm.forEach(element => element.classList.toggle("hide"));

    loginCard.forEach(element => element.classList.toggle("hide"));
}

export function toggleUserCardLogin () {
    const userCard = document.querySelectorAll('.userCard');
    const loginCard = document.querySelectorAll('.loginCard');

    userCard.forEach(element => element.classList.toggle("hide"));

    loginCard.forEach(element => element.classList.toggle("hide"));
}

export function toggleUserCardRegister () {
    const registerForm = document.querySelectorAll('.registerContainer');
    const userCard = document.querySelectorAll('.userCard');

    registerForm.forEach(element => element.classList.toggle("hide"));

    userCard.forEach(element => element.classList.toggle("hide"));
}