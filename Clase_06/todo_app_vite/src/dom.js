/* Este MODULO es el encargado de renderizar y redibujar todo el contenido, osea todo el DOM */
import { getTodos, toggleDone, removeTodo } from "./state.js"
import { toggleLoginRegisterForm, toggleLoginUserCard, toggleSuccessUserCard } from "./toggles.js";



/* ---------- utilidades ---------- */
export function renderErrors(form, errors = {}, generalError = "") {

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
            .forEach((el) => {
                el.classList.add("is-valid");
                
            })
    }


    if (generalError) {
    
        [...form.elements].forEach((el) => el.classList.remove("is-valid")); //evito verde en elementos del form

        const generalFeedback = form.querySelector("#generalFeedback");   

        if (generalFeedback) {
            generalFeedback.textContent = generalError;
            generalFeedback.classList.add("d-block");
        } 
    }
}

/* Clean input colors when input */
const inputs = document.querySelectorAll('input');

inputs.forEach(input => {
    input.addEventListener("input", () => {
    input.classList.remove("is-invalid", "is-valid");
    });
});


const backBtn = document.querySelector('.back-btn');

backBtn.addEventListener("click", () => {
    toggleLoginRegisterForm();
})

/* success card btn */
const btnSuccess = document.querySelector('.btn-success');

btnSuccess.addEventListener("click", () => {
    toggleSuccessUserCard();
})




/* PRE with register data info */
/* export function renderRegisterOutput(pre, dataObj) {
    pre.textContent = JSON.stringify(dataObj, null, 2);
} */

/* render userCard */

export function renderUserCard (user) {

    //limpio colores input
    inputs.forEach(input => input.classList.remove("is-invalid", "is-valid"));

    const userCardSection = document.querySelector("#userCard");

    userCardSection.replaceChildren();

    const div = document.createElement("div");
    div.className = "card p-4";
    div.id = "divUserCard"
    div.innerHTML=
        `
            <h2 class="mb-3 text-center"><i class="bi bi-person-circle me-2"></i>Usuario</h2>
            <h5 class="mb-3 text-center fw-bold">${user.name}</h5>
            <h5 class="mb-3 text-center fw-normal"><span class="fw-lighter fst-italic fs-6">Username:</span> ${user.username}</h5>
            <button class="btn btn-sm btn-outline-danger" id="logoutBtn">
                Cerrar sesión
            </button>
        `;

    userCardSection.appendChild(div);

    const logoutBtn = div.querySelector('#logoutBtn');

    logoutBtn.addEventListener('click', () => {
        toggleLoginUserCard();
        userCardSection.innerHTML = "";
    }) 
}


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


/* Register Btn click */
const registerBtn = document.querySelector('#registerBtn');

registerBtn.addEventListener("click", () => {
    toggleLoginRegisterForm();
});