import { Character } from "./character";

export interface GetCharactersRestResponse {
    results: Character[];
}

export interface GetCharactersGraphQLResponse {
    characters: {
        results: Character[];
    };
}