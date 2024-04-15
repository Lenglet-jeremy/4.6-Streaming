const API_KEY = `api_key=05787597d5a1512fb0db8b1b20910509`;

const BASE_URL = "https://api.themoviedb.org/3/";
const FILMS = "movie";
const SERIES = "tv";
const POPULARITE = "top_rated";
const RECENT = "release_date.desc";
const AVENIR = "upcoming";
const LANGUAGE = "language=fr-FR";
const PAGES = "page=2";


const BASE_IMG = "https://image.tmdb.org/t/p/w500";
let ID_FILM_SERIE = "";
let IMG_LINK = BASE_IMG + ID_FILM_SERIE;

const popularMoviesRequest  = `${BASE_URL}${FILMS}/${POPULARITE}?${API_KEY}&${LANGUAGE}`;
const recentMoviesRequest   = `${BASE_URL}discover/${FILMS}?${RECENT}&${API_KEY}&${LANGUAGE}`;
const upComingMoviesRequest = `${BASE_URL}${FILMS}/${AVENIR}?${API_KEY}&${LANGUAGE}`;
const popularSeriesRequest  = `${BASE_URL}${SERIES}/${POPULARITE}?${API_KEY}&${LANGUAGE}`;
const recentSeriesRequest   = `${BASE_URL}discover/${SERIES}?${RECENT}&${API_KEY}&${LANGUAGE}`;
const upCominSeriesRequest = `${BASE_URL}discover/${SERIES}?first_air_date.gte&${API_KEY}&${LANGUAGE}&${PAGES}`;

const body = document.querySelector("body");

const menuIcon = document.querySelector('.Menu');
const navBarRight = document.querySelector('.NavBarRight');

menuIcon.addEventListener('click', () => {
    navBarRight.classList.toggle('visible');
});

// window.addEventListener('resize', () => {
//     if (window.innerWidth > 800 && navBarRight.classList.contains('visible')) {
//         navBarRight.classList.remove('visible');
//     }
// });


const createpopularElement = (movie) => {

    const card = document.createElement("div");
    card.classList.add("Card");

    const cover = document.createElement("img");
    cover.src = `${BASE_IMG}${movie.poster_path}`;
    cover.style.width = "200px";

    const titre = document.createElement("h2");
    if (movie.name)
        titre.innerText = movie.name;
    else
        titre.innerText = movie.title;
    titre.style.color = "#FFFFFF";

    const note = document.createElement("h3");
    note.classList.add("Note")
    note.innerText = movie.vote_average.toFixed(1);
    note.style.color = "#FFFFFF";

    const votants = document.createElement("h4");
    votants.classList.add("Votant");
    votants.innerText = movie.vote_count

    if(movie.release_date){
        const releaseDate = document.createElement("h5");
        releaseDate.classList.add("releaseDate");
        releaseDate.innerText = movie.release_date
    
        card.append(cover, titre, note, votants, releaseDate);
    } else 
        card.append(cover, titre, note, votants);
    return card;
}

async function fetchMovies(URL) {
    const Section = document.createElement("div");
    Section.classList.add("Section");
    try {

        const response = await fetch(`${URL}`);
        const data = await response.json();
        
        if (!response.ok){
            throw new Error('Erreur lors de la récupération des films/series');
        }

        data.results.forEach(movie => {
            Section.append(createpopularElement(movie));
            console.log(movie);
          });

    } catch (error) {
        console.error('Une erreur s\'est produite : ', error.message);
    }
    return Section;
}

async function displayPopularMovies(parag, URL) {
    const sectionParag = document.createElement("p");
    sectionParag.classList.add("Parag");
    sectionParag.innerText = parag;

    const popularSection = await fetchMovies(URL);
    
    body.append(sectionParag, popularSection);
}

async function displayAll() {
    await displayPopularMovies("Les films populaires", popularMoviesRequest);
    await displayPopularMovies("Les films récents", recentMoviesRequest);
    await displayPopularMovies("Les films à venir", upComingMoviesRequest);
    await displayPopularMovies("Les séries populaires", popularSeriesRequest);
    await displayPopularMovies("Les séries récentes", recentSeriesRequest);
    await displayPopularMovies("Les séries à venir", upCominSeriesRequest);
}

displayAll();
