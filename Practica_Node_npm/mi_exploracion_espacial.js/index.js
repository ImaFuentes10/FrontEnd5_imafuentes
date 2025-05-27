const planetas = require('./planetas');
const cowsay = require("cowsay");


planetas.forEach(planeta => {
    
    console.log(cowsay.say({
        text : 
            `¡Planeta ${planeta.nombre} descubierto!
            Descripción: ${planeta.descripcion}
            Descubierto en: ${planeta.descubiertoEn}`,
        e : "oO",
        T : "U "
    })) 
});
  
