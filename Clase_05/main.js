const form = document.querySelector("#registerForm")
const output = document.querySelector("#output")
const emailInput = document.querySelector("#email");

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form))

    console.log(data);

    output.textContent = JSON.stringify(data, null, 2);

    form.reset();
})

emailInput.addEventListener('invalid', e => {
    e.target.setCustomValidity('Por favor ingresa un correo vàlido');
})

emailInput.addEventListener('input', e => {
    e.target.setCustomValidity("");
})