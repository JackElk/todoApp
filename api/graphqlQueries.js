export const GET_CHARACTERS = `
  query GetCharacters($page: Int!) {
    characters(page: $page) {
      results {
        id
        name
        status
        species
        image
        location {
          name
        }
      }
    }
  }
`;