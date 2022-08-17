let canvas;
let pokemon = [];
let actualPokemon = null;

function setup() {
    frameRate(60);
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.style('z-index', '-1');
    canvas.style('position', 'fixed');
    canvas.style('top', '0');
    canvas.style('right', '0');
    for (let x = 0; x < 9; x++) {
        findPokemons(x+1);
    }
}

function draw() {
    background(10, 20, 50);
    newCursor();
    if(pokemon.length === 9) {
        pokemon.forEach((element, index) => {
            fill(255);
            rect(60, (75 *index)+10, 220, 70);
            if(element.pImage != null){ //Imagenes pintadas
                image(element.pImage, 60, (75 *index)+10, 80, 80);
            }
            textSize(20);
            fill(0);
            text(element.name, 160, (75*index)+60);
        });
    }
    if(actualPokemon != null){
        fill(255);
        textSize(70);
        textStyle(BOLD);
        text(actualPokemon.name.toUpperCase(), 340, 110);
        rect(340, 120, 150, 10);
        textSize(20);
        textStyle(NORMAL);
        text('Height: ' + actualPokemon.height, 342, 170);
        text('Weight: ' + actualPokemon.weight, 342, 200);
        text('Abilities: ' + actualPokemon.abilities[0].ability.name 
        + ', '+actualPokemon.abilities[1].ability.name, 342, 230);
        text('Base experience: ' + actualPokemon.base_experience, 342, 260);
        image(actualPokemon.pImagePro, 320, 320, 360, 360);
        //console.log(actualPokemon)
    }
}

function mouseClicked(){
    pokemon.forEach((element, index) => {
        if(pmouseX > 60 && pmouseX < 280 &&
            pmouseY > (75 *index)+10 && pmouseY < (75 *index)+80){
                actualPokemon = element;
        }
    });
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function newCursor() {
    noStroke();
    fill(255);
    ellipse(pmouseX, pmouseY, 10, 10);
}

async function findPokemons(id){
    let data = null;
    const pokeULR = `https://pokeapi.co/api/v2/pokemon/${id}/`
    const query = await fetch (pokeULR)
    data = await query.json()
    pokemon.push(data);
    loadImage(data.sprites.front_default, image => {
        pokemon[id-1].pImage = image;
    })
    loadImage('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/'+id+'.png', image => {
        pokemon[id-1].pImagePro = image;
    })
}