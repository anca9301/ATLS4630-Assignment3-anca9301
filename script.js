// const POETRY_DB_API_URL = 'https://poetrydb.org/title/Ozymandias/lines.json';
const POETRY_DB_API_URL = 'https://poetrydb.org/random';

fetch(POETRY_DB_API_URL)
    .then(response => response.json())
    .then(json => console.log(json[0]))

const addButton = document.getElementById("add");
addButton.addEventListener('click', addPoem);

async function addPoem() {
    // const count = 3;
    const url = `https://poetrydb.org/random`;
    const response = await fetch(POETRY_DB_API_URL);
    const json = await response.json();
    // const data_name = json.data();

    const paragraph = document.createElement('p');
    for (const line of json[0].lines) {
        // console.log(meowfact);
        paragraph.innerText += `${line}\n`;
        // document.body.innerHTML += `<p>${meowfact}<p>`;
    }
    document.body.append(paragraph);


}