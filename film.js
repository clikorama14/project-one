const filmDetails = document.querySelector("#filmDetails");
const character = document.querySelector("#characters");
const planet = document.querySelector("#planets");

const sp = new URLSearchParams(window.location.search);
const id = sp.get('id');

const fetchFilmDetails = async () => {

    try {
        let url = `https://swapi2.azurewebsites.net/api/films/${id}`;
        const film = await fetch(url)
            .then(res => res.json())

        filmDetails.innerHTML = `<p>${film.title}</p>`;

    } catch (error) {
        filmDetails.innerHTML = '<p>Failed to find film.</p>';
    }
};

const fetchFilmChar = async () => {

    try {

        let url2 = `https://swapi2.azurewebsites.net/api/films/${id}/characters`;
        const characters = await fetch(url2)
            .then(res => res.json())
        //console.log(characters);
        
        let character_header = `<h1>Characters:</h1>`;
        characters.forEach(char => {
            character_header += `<p>${char.name}</p>`;
        });

        character.innerHTML = character_header;
        renderCharacters(characters);
        
    } catch (error) {
        console.error(error)
        character.innerHTML = '<p>Failed to find characters.</p>';
    }
};

const fetchFilmPlanet = async () => {

    try {

        let url3 = `https://swapi2.azurewebsites.net/api/films/${id}/planets`;
        const planets = await fetch(url3)
            .then(res => res.json())
        //console.log(characters);
        
        let planet_header = `<h1>Planets:</h1>`;
        planets.forEach(p => {
            planet_header += `<p>${p.name}</p>`;
        });

        planet.innerHTML = planet_header;
        renderPlanets(planets);
        
    } catch (error) {
        console.error(error)
        planet.innerHTML = '<p>Failed to find characters.</p>';
    }
};

const renderCharacters = characters => {
    const divs = characters.map(character => {
      const el = document.createElement('div');
      el.addEventListener('click', () => goToPage(character.id));
      el.textContent = character.name;
      return el;
    })
    character.replaceChildren(...divs)
  }

  const renderPlanets = characters => {
    const divs = characters.map(character => {
      const el = document.createElement('div');
      el.addEventListener('click', () => goToPlanet(character.id));
      el.textContent = character.name;
      return el;
    })
    planet.replaceChildren(...divs)
  }

const goToPage = id => window.location = `/character.html?id=${id}`
const goToPlanet = id => window.location = `/planet.html?id=${id}`

fetchFilmDetails();
fetchFilmChar();
fetchFilmPlanet();