// const POETRY_DB_API_URL = 'https://poetrydb.org/title/Ozymandias/lines.json';
// const POETRY_DB_API_URL = 'https://poetrydb.org/random';

const RAND_DISPLAY = document.getElementById('displayRandPoem');
const SEARCH_LIST_DISPLAY = document.getElementById('displaySearchList');
const SEARCH_POEM_DISPLAY = document.getElementById('displaySearchPoem');

const SEARCH_INDEX_DISPLAY = document.getElementById('searchIndex');
const SEARCH_TITLE_DISPLAY = document.getElementById('searchTitle');
const SEARCH_AUTHOR_DISPLAY = document.getElementById('searchAuthor');
const SEARCH_LINE_COUNT_DISPLAY = document.getElementById('searchLineCount');

const TITLE_INPUT = document.getElementById('searchTitleInput');
const POET_INPUT = document.getElementById('searchPoetInput');
const INDEX_INPUT = document.getElementById('indexInput');

const EXPAND_RAND_POEM_BUTTON = document.getElementById('expandRandomPoem');
const RAND_POEM_BUTTON = document.getElementById("randomizeDisplayButton");
const SEARCH_BUTTON = document.getElementById('searchButton');

const MAX_DISPLAY_LINES = 10;
let currentRandomPoem, searchPoemList, currentSearchPoem;

newRandPoem();

// fetch('https://poetrydb.org/')
//     .then(response => response.json())
//     .then(json => console.log(json[0]))

RAND_POEM_BUTTON.addEventListener('click', newRandPoem);
EXPAND_RAND_POEM_BUTTON.addEventListener('click', displayRandPoem);
SEARCH_BUTTON.addEventListener('click', searchPoem);
INDEX_INPUT.addEventListener('change', displayPoem);

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
    
    const title = document.createElement('h3');
    title.textContent= currentRandomPoem[0].title;
    RAND_DISPLAY.append(title);

    const poet = document.createElement('h4');
    poet.textContent= currentRandomPoem[0].author;
    RAND_DISPLAY.append(poet);

    for (let i = 0; i < displayLines; i++) {
        const paragraph = document.createElement('p');
        paragraph.textContent += lines[i];
        RAND_DISPLAY.append(paragraph);
    }
}

async function searchPoem() {    
    const DISPLAY_NUM = 20;
    const titleInput = TITLE_INPUT.value;
    const poetInput = POET_INPUT.value;

    let url = `https://poetrydb.org/`;

    if (titleInput.length > 0 && poetInput.length > 0) {
        url = `${url}title,author,poemcount/${titleInput};${poetInput};${DISPLAY_NUM}/title,author,linecount,lines`;
    }
    else if (titleInput.length > 0) {
        url = `${url}title,poemcount/${titleInput};${DISPLAY_NUM}/title,author,linecount,lines`;
    }
    else if (poetInput.length > 0) {
        url = `${url}author,poemcount/${poetInput};${DISPLAY_NUM}/title,author,linecount,lines`;
    }
    else { return; }

    const response = await fetch(url);
    const json = await response.json();

    searchPoemList = json;

    console.log(json);

    for (let i = 0; i < json.length; i++) {
        const index = document.createElement('p');
        const title = document.createElement('p');
        const author = document.createElement('p');
        const linecount = document.createElement('p');
        const poemEntry = json[i];

        index.textContent = `${i + 1}`;
        SEARCH_INDEX_DISPLAY.append(index);

        title.textContent += `${poemEntry.title}`;
        SEARCH_TITLE_DISPLAY.append(title);

        author.textContent += `${poemEntry.author}`;
        SEARCH_AUTHOR_DISPLAY.append(author);

        linecount.textContent += `${poemEntry.linecount}`;
        SEARCH_LINE_COUNT_DISPLAY.append(linecount);

        const option = document.createElement('option');
        option.value = i;
        option.textContent = i + 1;

        INDEX_INPUT.append(option);
    }
}

function displayPoem() {   
    const index = INDEX_INPUT.value;
    const poemEntry = searchPoemList[index]; 
    const title = document.createElement('h3');
    title.textContent= poemEntry.title;
    SEARCH_POEM_DISPLAY.append(title);

    const poet = document.createElement('h4');
    poet.textContent= poemEntry.author;
    SEARCH_POEM_DISPLAY.append(poet);

    for (let i = 0; i < poemEntry.linecount; i++) {
        const paragraph = document.createElement('p');
        paragraph.textContent += poemEntry.lines[i];
        SEARCH_POEM_DISPLAY.append(paragraph);
    }
}