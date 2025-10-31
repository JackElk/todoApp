import {ENDPOINTS} from "../api/endpoints.ts"
import {GET_CHARACTERS} from "../api/graphqlQueries.ts"
import {graphqlFetch} from "../utils/graphqlFetch.js"
import {restFetch} from "../utils/restFetch.js"
import {renderCharacters} from '../helpers/renderCharacters.ts'

const loadBtnRest = document.getElementById('load-characters-rest');
const loadBtnGraphQL = document.getElementById('load-characters-graphQL');
const characterList = document.getElementById('character-list');

loadBtnRest.addEventListener('click', async () => {
    try {
        const data = await restFetch(ENDPOINTS.rest)

        characterList.innerHTML = '';

        renderCharacters(data.results, characterList);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
});

loadBtnGraphQL.addEventListener('click', async () => {
    try {
        const data = await graphqlFetch(ENDPOINTS.graphQL, GET_CHARACTERS, 2)
        console.log(data);

        characterList.innerHTML = '';

        renderCharacters(data.characters.results, characterList);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
});