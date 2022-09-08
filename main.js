let API_KEY = "https://api.dictionaryapi.dev/api/v2/entries/en/";

let form = document.querySelector(".js-form");
let inputField = document.querySelector("[name=word]");
let results = document.querySelector(".js-results");


function renderDefinitions(definitions) {
    let html = "";
    let example = "";
    for (let definition of definitions) {
        if (typeof definition.example === "string") {
            example = `(e.g. ${definition.example})`
        }
        html += `<li>${definition.definition} ${example}</li>`
    }
    return html;
}

function renderMeanings(meanings) {
    let html = "";
    for (let meaning of meanings) {
        html += `
            <p>${meaning.partOfSpeech}</p>
            <ol>${renderDefinitions(meaning.definitions)}</ol>
        `
    }
    return html;
}

function renderDatas(datas) {
    let html = `<h2>${datas.word} ${datas.phonetic}</h2>`;
    html += renderMeanings(datas.meanings);
    return html;
}

function renderResults(datas) {
    let html = "";
    if (Array.isArray(datas) && datas.length > 0) {
        html = renderDatas(datas[0])
    } else {
        html = `<div class="error">The requested word does not exits.</div>`
    }
    return results.innerHTML = html;
}

function getResults(event) {
    event.preventDefault();
    let word = inputField.value.trim();
    inputField.value = "";
    fetch(API_KEY + word)
        .then(res => res.json())
        .then(renderResults)
        .catch(error => console.log(error))
}

form.addEventListener("submit", getResults)
