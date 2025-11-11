import { Character } from "./character";

export interface GetCharactersRestResponse {
    results: Character[];
}

export interface GetCharactersGraphQLResponse {
    characters: {
        info: PageInfo;
        results: Character[];
    };
}

export interface PageInfo {
    count: number;
    pages: number;
    next: number | null;
    prev: number | null;
}