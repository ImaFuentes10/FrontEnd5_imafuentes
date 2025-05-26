let todos = JSON.parse(localStorage.getItem('todos')) ?? [];

document.querySelector("#todoForm").addEventListener('submit', (e) => {
    e.preventDefault()

    const form = e.target;

    const task = form.task.value.trim();

    if (task) addTodo(task);

    form.reset();
});

function renderList() {
    const ul = document.querySelector("#todoList");

    ul.innerHTML = "";

    todos.forEach((todo, index) => {
        const li = document.createElement('li');

        li.className = 'list-group-item d-flex justify-content-between align-items-center'

        li.innerHTML = `
        <span>${todo}</span>
        <button class='btn btn-sm btn-outline-danger' data-index="${index}" data-custom1="hola mundo :)"></button>
        `

        ul.appendChild(li)
    });
}

function addTodo(text) {
    todos.push(text)

    localStorage.setItem('todos', JSON.stringify(todos));

    renderList()
}



renderList()