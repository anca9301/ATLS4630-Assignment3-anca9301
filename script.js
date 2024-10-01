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

const MAX_DISPLAY_LINES = 20;
let currentRandomPoem, searchPoemList, currentSearchPoem;

newRandPoem();

RAND_POEM_BUTTON.addEventListener('click', newRandPoem);
SEARCH_BUTTON.addEventListener('click', searchPoem);
INDEX_INPUT.addEventListener('change', displayPoem);

function clear(div) {
    div.textContent="";
}

async function newRandPoem() {    
    const randLineCount = Math.random() * 21;
    console.log(randLineCount);
    const url = `https://poetrydb.org/linecount,random/${randLineCount};1`;

    const response = await fetch(url);
    const json = await response.json();

    currentRandomPoem = json;
    let lines = currentRandomPoem[0].lines;

    if (lines.length <= MAX_DISPLAY_LINES) {
        displayRandPoem();
    }
    else {
        newRandPoem();
    }
}

function displayRandPoem() {
    clear(RAND_DISPLAY);
    
    const lines = currentRandomPoem[0].lines;
    let displayLines = lines.length;

    const title = document.createElement('h3');
    title.textContent= currentRandomPoem[0].title;
    RAND_DISPLAY.append(title);

    const poet = document.createElement('h4');
    poet.textContent= currentRandomPoem[0].author;
    RAND_DISPLAY.append(poet);
    console.log('test');

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
        const container = document.createElement('div');
        container.className = 'container';

        const index = document.createElement('p');
        const title = document.createElement('p');
        const author = document.createElement('p');
        const linecount = document.createElement('p');
        const poemEntry = json[i];

        index.textContent = `${i + 1}`;
        index.className = 'child';
        container.append(index);

        title.textContent += `${poemEntry.title}`;
        title.className = 'titleChild';
        container.append(title);

        author.textContent += `${poemEntry.author}`;
        author.className = 'authorChild';
        container.append(author);

        linecount.textContent += `${poemEntry.linecount}`;
        linecount.className = 'child';
        container.append(linecount);

        SEARCH_LIST_DISPLAY.append(container);

        const option = document.createElement('option');
        option.value = i;
        option.textContent = i + 1;

        INDEX_INPUT.append(option);
    }
}

function displayPoem() {   
    clear(SEARCH_POEM_DISPLAY);

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