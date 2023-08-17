export const fetchMovies = async (page) => {
    try {
        const response = await fetch(`/.netlify/functions/fetch-movies?page=${page}`);
        const json = await response.json();
        return json;
    } catch(error) {
        console.log(error);
    }
}