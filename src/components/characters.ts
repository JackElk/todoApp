import "../pages/style.css";
import {ENDPOINTS, GET_CHARACTERS} from '../api';
import {graphqlFetch} from '../utils';
import {renderCharacters} from '../helpers/renderCharacters';
import {PageInfo, GetCharactersGraphQLResponse} from "../types";

const loadBtnGraphQL = document.getElementById('load-characters-graphQL')!;
const characterList = document.getElementById('character-list')!;
const prevBtn = document.getElementById('prev-characters-page') as HTMLButtonElement;
const nextBtn = document.getElementById('next-characters-page') as HTMLButtonElement;
const pageIndicator = document.getElementById('page-indicator')!;
let currentPage: number | null = null;

function initPaginationUI() {
    pageIndicator.textContent = '';

    prevBtn.disabled = true;
    nextBtn.disabled = true;
}

async function fetchCharacters(page: number) {
    try {
        const data = await graphqlFetch<GetCharactersGraphQLResponse>(
            ENDPOINTS.graphQL,
            GET_CHARACTERS,
            { page }
        );

        characterList.innerHTML = '';
        renderCharacters(data.characters.results, characterList);
        currentPage = page;
        updatePagination(data.characters.info);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function updatePagination(info: PageInfo) {
    if (currentPage != null) {
        pageIndicator.textContent = `Page ${currentPage} of ${info.pages}`;
    } else {
        pageIndicator.textContent = '';
    }

    prevBtn.disabled = info.prev === null;
    nextBtn.disabled = info.next === null;
}

prevBtn.addEventListener('click', async () => {
    if (currentPage && currentPage > 1) {
        await fetchCharacters(currentPage - 1);
    }
});

nextBtn.addEventListener('click', async () => {
    if (currentPage != null && !nextBtn.disabled) {
        await fetchCharacters(currentPage + 1);
    }
});

initPaginationUI();

if (loadBtnGraphQL && characterList) {
    loadBtnGraphQL.addEventListener('click', () => {
        // start loading page 1 (indicator will update after success)
        fetchCharacters(1);
    });
}