const API_KEY = `api_key=05787597d5a1512fb0db8b1b20910509`;

const BASE_URL = "https://api.themoviedb.org/3/";
const FILMS = "movie";
const SERIES = "tv";
const POPULARITE = "top_rated";
const RECENT = "release_date";
const AVENIR = "upcoming";
const LANGUAGE = "language=fr-FR";
const PAGES = "page=1";


const BASE_IMG = "https://image.tmdb.org/t/p/w500";
let ID_FILM_SERIE = "";
let IMG_LINK = BASE_IMG + ID_FILM_SERIE;

const popularMoviesRequest  = `${BASE_URL}${FILMS}/${POPULARITE}?${API_KEY}&${LANGUAGE}&${PAGES}`;
const recentMoviesRequest   = `${BASE_URL}${FILMS}/${RECENT}?${API_KEY}&${LANGUAGE}&${PAGES}`;
const upComingMoviesRequest = `${BASE_URL}${FILMS}/${AVENIR}?${API_KEY}&${LANGUAGE}&${PAGES}`;
const popularSeriesRequest  = `${BASE_URL}${SERIES}/${POPULARITE}?${API_KEY}&${LANGUAGE}&${PAGES}`;
const recentSeriesRequest   = `${BASE_URL}${SERIES}/${RECENT}?${API_KEY}&${LANGUAGE}&${PAGES}`;
const upComingSeriesRequest = `${BASE_URL}${SERIES}/${AVENIR}?${API_KEY}&${LANGUAGE}&${PAGES}`;

const body = document.querySelector("body");

const media = document.createElement("div");
media.classList.add("Media");

async function fetchMovies() {
    try {

        const popularSection = document.createElement("p");
        popularSection.innerText = "Les films populaires"

        const response = await fetch(`${popularMoviesRequest}`);
        const data = await response.json();
        
        if (!response.ok){
            throw new Error('Erreur lors de la récupération des films populaires');
        }

        data.results.forEach(movie => {
            media.append(createMediaElement(movie));
          });
        body.append(popularSection, media)

    } catch (error) {
        console.error('Une erreur s\'est produite : ', error.message);
    }
}

const createMediaElement = (movie) => {

    const card = document.createElement("div");
    card.classList.add("Card");

    const cover = document.createElement("img");
    cover.src = `${BASE_IMG}${movie.poster_path}`;
    cover.style.width = "200px";

    const titre = document.createElement("h3");
    titre.innerText = movie.title;
    titre.style.color = "#FFFFFF";

    const note = document.createElement("h4");
    note.classList.add("Note")
    note.innerText = movie.vote_average.toFixed(1);
    note.style.color = "#FFFFFF";

    card.append(cover, titre, note);
    return card;
}

body.append(fetchMovies());