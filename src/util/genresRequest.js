export const fetchGenres = async (language) => {
    try {
        const response = await fetch(`.netlify/functions/fetch-genres?language=${language}`);
        const json = await response.json();
        return json;
    } catch(error) {
        console.log(error);
    }
}