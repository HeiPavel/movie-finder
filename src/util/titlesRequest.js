export const fetchMovieTitles = async (query, language) => {
    try {
        const response = await fetch (`.netlify/functions/fetch-titles?query=${query}&language=${language}`);
        const jsonResponse = await response.json();
        return jsonResponse;
    } catch(error) {
        console.log(error);
    }
}