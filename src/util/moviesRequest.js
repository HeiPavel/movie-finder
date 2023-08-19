export const fetchMovies = async (obj) => {
    let params = new URLSearchParams();
    for (const param in obj) {
        const stringParam =  Array.isArray(obj[param]) ? obj[param].join('|') : obj[param];
        if (stringParam) params.set(param, stringParam);
    }
    try {
        const response = await fetch(`.netlify/functions/fetch-movies?${params.toString()}`);
        const json = await response.json();
        return json;
    } catch(error) {
        console.log(error);
    }
}