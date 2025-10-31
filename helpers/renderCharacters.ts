export interface Character {
    id: number;
    name: string;
    status: string;
    species: string;
    image: string;
    location: {
        name: string;
    };
}

export function renderCharacters(arr: Character[], htmlElement: HTMLHtmlElement) {
    htmlElement.innerHTML = '';

    arr.forEach(character => {
        const card = document.createElement('div');
        card.classList.add('character-card');

        card.innerHTML = `
        <img src="${character.image}" alt="${character.name}">
        <h3>${character.name}</h3>
        <p>Status: ${character.status}</p>
        <p>Species: ${character.species}</p>
        <p>Location: ${character.location.name}</p>
      `;

        htmlElement.appendChild(card);
    });
}