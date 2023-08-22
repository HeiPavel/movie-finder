export const fetchGenres = async () => {
    try {
        const response = await fetch(`.netlify/functions/fetch-genres`);
        const json = await response.json();
        return json;
    } catch(error) {
        console.log(error);
    }
}