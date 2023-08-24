export const fetchMovies = async (obj) => {
    let params = new URLSearchParams();
    for (const param in obj) {
        const stringParam =  (typeof obj[param] === 'object') ? obj[param].array.join(`${obj[param].separator ? ',' : '|'}`) : obj[param];
        if (stringParam) params.set(param, stringParam);
    }
    if (obj['with_people'].array.length && obj['with_people'].separator) params.set('separator', 'true');
    try {
        const response = await fetch(`.netlify/functions/fetch-movies?${params.toString()}`);
        const json = await response.json();
        return json;
    } catch(error) {
        console.log(error);
    }
}