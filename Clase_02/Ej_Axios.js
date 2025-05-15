const axios = require('axios');
const BASE_URL="https://fakestoreapi.com"

/* Definir como llamremos a la API */
function getProduct(id, callback){
    
    axios.get(`${BASE_URL}/products/${id}`)
    .then(ans => callback(null, ans.data)) //caso exitoso
    .catch(error => callback(error, null)); //caso error

}

function forcedErr(id, callback){
    
    axios.get(`${BASE_URL}/product/${id}`)
    .then(ans => callback(null, ans.data)) //caso exitoso
    .catch(error => callback(error, null)); //caso error

}



/* Definimos el callback o la función que maneja la respuesta o el error */
function callback (error, product){ //podría tener otro nombre, no sólo callback
    
    if(error){
        console.error('Error: ', error.message)
    }else{
        console.log(`Producto: ${product.title} - $ ${product.price}`);
    }
}

/* Ejecutamos la llamada a la API */
getProduct(2, callback);
forcedErr(3, callback);



function saveNewProduct(object, callback){

    const body = JSON.stringify(object)

    axios.post(`${BASE_URL}/products`, body)
    .then(ans => callback(null, ans.data))
    .catch(err => callback(err, null));
}

function callbackNewProduct (error, product){ //podría tener otro nombre, no sólo callback
    
    if(error){
        console.error('Error: ', error.message)
    }else{
        console.log(`ID Producto: ${product.id}`);
    }
}

/* Creamos un producto nuevo */
const newProduct = {
    id: 105,
    title: "POCO Phone X5",
    price: 99.99,
    description: "Teléfono de gama media",
    category: "Celulares",
    image: "https://dummy.com",
    //image: "djkdfakskjf"
}

saveNewProduct(newProduct, callbackNewProduct);


function getProductsByCategory(category, callback){
    axios.get(`${BASE_URL}/products`)
    .then(ans => callback(category, null, ans.data))
    .catch(err => callback(category, err, null));
}

function filterProductsByCategory(category, err, products){
    if(err){
        console.error('Error: ', err.message);
    }else{
        const productsCategory = products.filter(product => product.category === category)
        console.warn(productsCategory);
    }
}

getProductsByCategory("jewelery", filterProductsByCategory);