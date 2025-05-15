function sumar(a, b, callback){
    const result = a + b;
    callback(result)
}

function restar(a){
    const b = 2;
    const result = a -b;
    return console.log(result);
}

sumar(5, 10, restar)

const jsonEx =`{
    "nombre":"Jesus",
    "edad":34,
    "estudia": false
}`

console.log("(JSON) Nombre:", jsonEx.nombre);

const objEx = JSON.parse(jsonEx)

console.log("Nombre:", objEx.nombre);
