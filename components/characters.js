import {ENDPOINTS} from "../api/endpoints.js"
import {GET_CHARACTERS} from "../api/graphqlQueries.js"
import {graphqlFetch} from "../utils/graphqlFetch.js"
import {restFetch} from "../utils/restFetch.js"

const loadBtnRest = document.getElementById('load-characters-rest');
const loadBtnGraphQL = document.getElementById('load-characters-graphQL');
const characterList = document.getElementById('character-list');

loadBtnRest.addEventListener('click', async () => {
    try {
        const data = await restFetch(ENDPOINTS.rest)

        characterList.innerHTML = '';

        data.results.forEach(character => {
            const card = document.createElement('div');
            card.classList.add('character-card');

            card.innerHTML = `
        <img src="${character.image}" alt="${character.name}">
        <h3>${character.name}</h3>
        <p>Status: ${character.status}</p>
        <p>Species: ${character.species}</p>
        <p>Location: ${character.location.name}</p>
      `;

            characterList.appendChild(card);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
});

loadBtnGraphQL.addEventListener('click', async () => {
    try {
        const data = await graphqlFetch(ENDPOINTS.graphQL, GET_CHARACTERS, 2)

        characterList.innerHTML = '';

        data.characters.results.forEach(character => {
            const card = document.createElement('div');
            card.classList.add('character-card');

            card.innerHTML = `
        <img src="${character.image}" alt="${character.name}">
        <h3>${character.name}</h3>
        <p>Status: ${character.status}</p>
        <p>Species: ${character.species}</p>
        <p>Location: ${character.location.name}</p>
      `;

            characterList.appendChild(card);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
});