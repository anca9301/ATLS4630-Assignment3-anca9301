// const POETRY_DB_API_URL = 'https://poetrydb.org/title/Ozymandias/lines.json';
// const POETRY_DB_API_URL = 'https://poetrydb.org/random';

const RAND_DISPLAY = document.getElementById('displayRandPoem');
const SEARCH_LIST_DISPLAY = document.getElementById('displaySearchList');
const SEARCH_POEM_DISPLAY = document.getElementById('displaySearchPoem');

const TITLE_INPUT = document.getElementById('searchTitleInput');
const POET_INPUT = document.getElementById('searchPoetInput');

const EXPAND_RAND_POEM_BUTTON = document.getElementById('expandRandomPoem');
const RAND_POEM_BUTTON = document.getElementById("randomizeDisplayButton");
const SEARCH_BUTTON = document.getElementById('searchButton');

const MAX_DISPLAY_LINES = 10;
let currentRandomPoem;

newRandPoem();

// fetch('https://poetrydb.org/')
//     .then(response => response.json())
//     .then(json => console.log(json[0]))

RAND_POEM_BUTTON.addEventListener('click', newRandPoem);
EXPAND_RAND_POEM_BUTTON.addEventListener('click', displayRandPoem);
SEARCH_BUTTON.addEventListener('click', searchPoem)

function clear(div) {
    div.textContent="";
}

async function newRandPoem() {    
    const url = `https://poetrydb.org/random`;
    const response = await fetch(url);
    const json = await response.json();

    currentRandomPoem = json;
    let lines = currentRandomPoem[0].lines;

    if (lines.length <= MAX_DISPLAY_LINES) {
        EXPAND_RAND_POEM_BUTTON.style.display = "none";
        displayRandPoem(true);
    }
    else {
        EXPAND_RAND_POEM_BUTTON.style.display = "block";
        displayRandPoem(false);
    }
}

function displayRandPoem(displayFull) {
    clear(RAND_DISPLAY);

    const lines = currentRandomPoem[0].lines;
    let displayLines = MAX_DISPLAY_LINES;

    console.log(displayFull);

    if (displayFull) { 
        displayLines = lines.length;
        EXPAND_RAND_POEM_BUTTON.style.display = "none";
    }
    
    const title = document.createElement('h2');
    title.textContent= currentRandomPoem[0].title;
    RAND_DISPLAY.append(title);

    const poet = document.createElement('h3');
    poet.textContent= currentRandomPoem[0].author;
    RAND_DISPLAY.append(poet);

    for (let i = 0; i < displayLines; i++) {
        const paragraph = document.createElement('p');
        paragraph.textContent += lines[i];
        RAND_DISPLAY.append(paragraph);
    }
}

async function searchPoem() {    
    const titleInput = TITLE_INPUT.value;
    const poetInput = POET_INPUT.textContent;

    const url = `https://poetrydb.org/`;

    if (titleInput.length > 0 && poetInput.length > 0) {
        url += `title/${titleInput}`;
        console.log(url);
    }

    // const response = await fetch(url);
    // const json = await response.json();

    // currentRandomPoem = json;
    // let lines = currentRandomPoem[0].lines;

    // if (lines.length <= MAX_DISPLAY_LINES) {
    //     EXPAND_RAND_POEM_BUTTON.style.display = "none";
    //     displayRandPoem(true);
    // }
    // else {
    //     EXPAND_RAND_POEM_BUTTON.style.display = "block";
    //     displayRandPoem(false);
    // }
}

function displayRandPoem(displayFull) {
    const MAX_DISPLAY_LINES = 10;
    clear(RAND_DISPLAY);

    const lines = currentRandomPoem[0].lines;
    let displayLines = MAX_DISPLAY_LINES;

    if (displayFull) { 
        displayLines = lines.length;
        EXPAND_RAND_POEM_BUTTON.style.display = "none";
    }
    
    const title = document.createElement('h2');
    title.textContent= currentRandomPoem[0].title;
    RAND_DISPLAY.append(title);

    const poet = document.createElement('h3');
    poet.textContent= currentRandomPoem[0].author;
    RAND_DISPLAY.append(poet);

    for (let i = 0; i < displayLines; i++) {
        const paragraph = document.createElement('p');
        paragraph.textContent += lines[i];
        RAND_DISPLAY.append(paragraph);
    }
}

// function 