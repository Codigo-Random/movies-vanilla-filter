const BASEURL = "https://api.themoviedb.org/3"
const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';
const token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NDU5MjE5Y2M3MmY5Y2ZlNGJhMWU2MTdhNmI1NWU1NiIsIm5iZiI6MTYwNzA3ODg3Ny43Mjg5OTk5LCJzdWIiOiI1ZmNhMTNkZDQxYWFjNDAwNDE3MjRmZGIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.H9i-Ff0eXauuSKXiLO54uMTdPiXRbROfzhj8qat1_P8"
let language = "es-ES"

let page = 0

const list = document.getElementById("list")

function getMovies(restart = false) {
    if(!restart) {
        page += 1;
    } else {
        page = 1;
        list.innerHTML = "";
    }

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    };
    
    fetch(`${BASEURL}/discover/movie?include_adult=false&include_video=false&language=${language}&page=${page}&sort_by=popularity.desc`, options)
        .then(res => res.json())
        .then(res => {
            const { results, page, total_pages, total_results } = res;

            results.forEach(movie => {
                const { title, overview, poster_path } = movie;
    
                list.innerHTML += `
                 <div class="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-xl hover:scale-105">
                    <div class="relative pb-[150%]">
                        <img src="${imageBaseUrl}${poster_path}" alt="${title}" class="absolute top-0 left-0 w-full h-full object-cover">
                    </div>
                    <h1 class="text-xl font-bold text-gray-800 mb-2 px-4 py-2">${title}</h1>
                    <p class="text-gray-700 text-sm mb-3 px-4 py-4">${overview}</p>
                </div>
                `
    
            });
        })
        .catch(err => console.error(err));
}

getMovies();

// Escuchar cambios en el select de idiomas
document.getElementById('language').addEventListener('change', function(event) {
    const selectedLanguage = event.target.value;
    console.log('Idioma seleccionado:', selectedLanguage);
    // Aquí puedes agregar la lógica que quieras ejecutar cuando cambie el idioma
    language = selectedLanguage;
    getMovies(true);
});