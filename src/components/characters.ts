import "../pages/style.css";
import { ENDPOINTS, GET_CHARACTERS } from "../api";
import { graphqlFetch } from "../utils";
import { renderCharacters } from "../helpers/renderCharacters";
import { PageInfo, GetCharactersGraphQLResponse } from "../types";

class CharactersApp {
    private loadBtn: HTMLButtonElement;
    private list: HTMLElement;
    private prevBtn: HTMLButtonElement;
    private nextBtn: HTMLButtonElement;
    private pageIndicator: HTMLElement;
    private currentPage = 1;

    constructor() {
        this.loadBtn = document.getElementById("load-characters-graphQL") as HTMLButtonElement;
        this.list = document.getElementById("character-list") as HTMLElement;
        this.prevBtn = document.getElementById("prev-characters-page") as HTMLButtonElement;
        this.nextBtn = document.getElementById("next-characters-page") as HTMLButtonElement;
        this.pageIndicator = document.getElementById("page-indicator") as HTMLElement;

        this.initUI();
        this.bindEvents();
    }

    private initUI(): void {
        this.pageIndicator.textContent = "";
        this.prevBtn.disabled = true;
        this.nextBtn.disabled = true;
    }

    private bindEvents(): void {
        this.loadBtn.addEventListener("click", () => this.fetchCharacters(1));
        this.prevBtn.addEventListener("click", () => this.goToPrevPage());
        this.nextBtn.addEventListener("click", () => this.goToNextPage());
    }

    private async fetchCharacters(page: number): Promise<void> {
        try {
            const data = await graphqlFetch<GetCharactersGraphQLResponse>(
                ENDPOINTS.graphQL,
                GET_CHARACTERS,
                { page }
            );

            this.list.innerHTML = "";
            renderCharacters(data.characters.results, this.list);
            this.currentPage = page;
            this.updatePagination(data.characters.info);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    private updatePagination(info: PageInfo): void {
        this.pageIndicator.textContent = `Page ${this.currentPage} of ${info.pages}`;
        this.prevBtn.disabled = info.prev === null;
        this.nextBtn.disabled = info.next === null;
    }

    private goToPrevPage(): void {
        if (this.currentPage > 1) {
            this.fetchCharacters(this.currentPage - 1);
        }
    }

    private goToNextPage(): void {
        this.fetchCharacters(this.currentPage + 1);
    }
}

// Initialize only when DOM is ready
document.addEventListener("DOMContentLoaded", () => new CharactersApp());