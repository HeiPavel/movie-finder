export const fetchActors = async (term, language) => {
    try {
        const response = await fetch(`.netlify/functions/fetch-actors?term=${term}&language=${language}`);
        const json = await response.json();
        return json;
    } catch(error) {
        console.log(error);
    }
}