let API_KEY = "https://api.dictionaryapi.dev/api/v2/entries/en/";

let form = document.querySelector(".js-form");
let inputField = document.querySelector("[name=word]");
let results = document.querySelector(".js-results");

function renderResults(results) {
    console.log(results)
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
