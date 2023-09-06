export const fetchDetails = async (id) => {
    try {
        const response = await fetch(`.netlify/functions/fetch-details?id=${id}`);
        const json = await response.json();
        return json;
    } catch(error) {
        console.log(error);
    }
}