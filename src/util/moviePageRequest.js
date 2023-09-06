export const fetchDetails = async (id, language) => {
    try {
        const response = await fetch(`.netlify/functions/fetch-details?id=${id}&language=${language}`);
        const json = await response.json();
        return json;
    } catch(error) {
        console.log(error);
    }
}