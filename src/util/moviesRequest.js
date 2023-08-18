export const fetchMovies = async (obj) => {
    let params = new URLSearchParams();
    for (const param in obj) {
        if (obj[param]) params.set(param, obj[param]);
    }
    try {
        const response = await fetch(`.netlify/functions/fetch-movies?${params.toString()}`);
        const json = await response.json();
        return json;
    } catch(error) {
        console.log(error);
    }
}