export const fetchMovieTitles = async (query) => {
    try {
        const response = await fetch (`.netlify/functions/fetch-titles?query=${query}`);
        const jsonResponse = await response.json();
        return jsonResponse;
    } catch(error) {
        console.log(error);
    }
}