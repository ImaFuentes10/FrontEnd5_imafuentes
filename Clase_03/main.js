const BASE_URL_API = "https://pokeapi.co/api/v2";
const formName = document.querySelector('#searchForm');
const output = document.querySelector('#output');

const getPokemonByName = async (name) => {
    const url_consult = `${BASE_URL_API}/pokemon/${name}`;

    const response = await fetch(url_consult);

    if(!response.ok){
        throw new Error('HTTP ' + response.status)
    }

    const data = await response.json()

    console.log(data);

    return data;
}


async function buildPokemonCard({ id, name, sprites, abilities, types}){
    
    const liAbilities = abilities
        .map(a => `<li>${a.ability.name}</li>`)
        .join('');
        

    const typesImages = await getTypes(types);
    console.log(typesImages);
    
    const chips = typesImages
        .map(a => `<img class"type" src="${a}">`)
        .join('');
        //console.log(chips);


    return `
      <div class="card show">
        <img src="${sprites.front_default}" alt="${name}">
        <h2>#${id} - ${name}</h2>
        <ul class="types">${chips}</ul>
        <ul>${liAbilities}</ul>
      </div>`;
}

async function getTypes(types) {
    const typeImagesURLs = [];
    
    for(const type of types){
        const typeData = await getTypeInfo(type)
        
        const gen = typeData.sprites["generation-viii"]

        const url = gen["sword-shield"].name_icon;
        
        typeImagesURLs.push(url)
    }
    
    
    /*types.forEach(async(type) => {
        const typeData = await getTypeInfo(type)
        
        const gen = typeData.sprites["generation-viii"]

        const url = gen["sword-shield"].name_icon;
        
        typeImagesURLs.push(url)
        console.log(typeImagesURLs);
        
    });*/

    console.log(typeImagesURLs);
    
    return typeImagesURLs;
};

async function getTypeInfo(types) {
    const url_consult = `${BASE_URL_API}/type/${types.type.name}`;
    const response = await fetch(url_consult);

    if(!response.ok){
        throw new Error('HTTP ' + response.status)
    }

    const data = await response.json()
        
    return data;
};


formName.addEventListener('submit', async (e) =>{
    e.preventDefault();

    const name = e.target.nombrePokemon;

    if(!name) return;

    showLoader();
    output.innerHTML = '';

    try {
        const pokemonData = await getPokemonByName(name.value);
        //console.log(pokemonData);
        saveHistory(name);
        output.innerHTML = await buildPokemonCard(pokemonData);
    } catch(err) {
        output.innerHTML = `<p id=errorMsg>El pokemon no se encuentra! (${error.message})</p>`;
    } finally {
        hideLoader();
    }
});

/* ### LOADER ### */
const showLoader = () => document.querySelector("#loader").classList.remove('hidden');

const hideLoader = () => document.querySelector("#loader").classList.add('hidden');

/* ### HISTORY ### */

const MAX_HISTORY = 5;

function saveHistory(name){
    let history = JSON.parse(localStorage.getItem('pokeHistory')) || [];
    history = [name, ...history.filter(item => item !== name)]
    if(history.lenght > MAX_HISTORY) 
        history = history.slice(0, MAX_HISTORY);
    localStorage.setItem('pokeHistory', JSON.stringify(history))
    renderHistory();
}