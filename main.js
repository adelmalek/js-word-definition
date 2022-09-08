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

function renderSynonyms(synonyms) {
    return synonyms.map(text => `<a href="#" data-text="${text}">${text}</a>`).join(", ");
}

function renderMeanings(meanings) {
    let html = "";
    for (let meaning of meanings) {
        let synonyms = "";
        if (Array.isArray(meaning.synonyms) && meaning.synonyms.length > 0) {
            synonyms = `<p> Synonyms: ${renderSynonyms(meaning.synonyms)}</p>`
        }
        html += `
            <p>${meaning.partOfSpeech}</p>
            <ol>${renderDefinitions(meaning.definitions)}</ol>
            ${synonyms}
        `
    }
    return html;
}

function renderAudio(phonetics) {
    if (phonetics.audio !== "") {
        return `
            <audio controls>
                <source src="${phonetics.audio}" type="audio/ogg">
                <source src="${phonetics.audio}" type="audio/mpeg">
            </audio>
        `
    } else {
        return "";
    }
}

function renderDatas(datas) {
    let phonetic = "";
    if (typeof datas.phonetic === "string") {
        phonetic = datas.phonetic;
    }
    let html = `<h2>${datas.word} ${phonetic}</h2> ${renderAudio(datas.phonetics[0])}`;
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

function fetchWord(word) {
    fetch(API_KEY + word)
        .then(res => res.json())
        .then(renderResults)
        .catch(error => console.log(error))
}

function getResults(event) {
    event.preventDefault();
    let word = inputField.value.trim();
    inputField.value = "";
    fetchWord(word);
}

form.addEventListener("submit", getResults)

function navigationWord(event) {
    event.preventDefault();
    let word = event.target.dataset.text;
    fetchWord(word);
}

results.addEventListener("click", navigationWord)