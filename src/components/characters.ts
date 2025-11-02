import {ENDPOINTS, GET_CHARACTERS} from '../api';
import {graphqlFetch, restFetch} from '../utils';
import {renderCharacters} from '../helpers/renderCharacters';
import {GetCharactersRestResponse, GetCharactersGraphQLResponse} from "../types";

const loadBtnRest = document.getElementById('load-characters-rest') as HTMLButtonElement;
const loadBtnGraphQL = document.getElementById('load-characters-graphQL') as HTMLButtonElement;
const characterList = document.getElementById('character-list') as HTMLElement;

if (loadBtnRest && loadBtnGraphQL && characterList) {
    loadBtnRest.addEventListener('click', async () => {
        try {
            const data = await restFetch<GetCharactersRestResponse>(ENDPOINTS.rest);

            characterList.innerHTML = '';
            renderCharacters(data.results, characterList);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    });

    loadBtnGraphQL.addEventListener('click', async () => {
        try {
            const data = await graphqlFetch<GetCharactersGraphQLResponse>(
                ENDPOINTS.graphQL,
                GET_CHARACTERS,
                { page: 1 }
            );
            console.log(data);

            characterList.innerHTML = '';
            renderCharacters(data.characters.results, characterList);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    });
}