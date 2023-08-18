export const fetchActors = async (term) => {
    try {
        const response = await fetch(`.netlify/functions/fetch-actors?term=${term}`);
        const json = await response.json();
        return json;
    } catch(error) {
        console.log(error);
    }
}