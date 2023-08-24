import fetch from "node-fetch";

const fetchByParams = async (baseUrl, queryObj, apiKey) => {
    let params = new URLSearchParams();
    for (const param in queryObj) {
        if (queryObj[param] && param !== 'query' && param !== 'separator') params.set(param, queryObj[param]);
    }
    const url = `${baseUrl}discover/movie?api_key=${apiKey}&${params.toString()}`;
    try {
        const response = await fetch(url);
        const jsonResponse = await response.json();
        return jsonResponse;
    } catch(error) {
        console.log(error);
    }
}

const fetchByTitle = async (baseUrl, queryObj, apiKey) => {
    const {page, query} = queryObj;
    if (!query) return {results: []};
    const querySearch = `&query=${query}&page=${page}`;
    const url = `${baseUrl}search/movie?api_key=${apiKey}&${querySearch}`;
    try {
        const response = await fetch(url);
        const jsonResponse = await response.json();
        return jsonResponse;
    } catch(error) {
        console.log(error);
    }
}

const fetchByActors = async (baseUrl, queryObj, apiKey) => {
    console.log('hello');
    const {page, with_people} = queryObj;
    const query = with_people.split(/[,|\|]/).join('|');
    const url = `${baseUrl}discover/movie?api_key=${apiKey}&with_people=${query}&page=${page}`;
    try {
        const response = await fetch(url);
        const jsonResponse = await response.json();
        return jsonResponse;
    } catch(error) {
        console.log(error);
    }
}

const handler = async (event) => {
    const {with_people, with_genres, primary_release_year, separator} = event.queryStringParameters;
    const apiKey = process.env.API_KEY;
    const baseUrl = "https://api.themoviedb.org/3/";
    const promisesToFetch = [fetchByTitle(baseUrl, event.queryStringParameters, apiKey), fetchByParams(baseUrl, event.queryStringParameters, apiKey)];
    if ((with_people && (with_genres || primary_release_year)) || (separator && with_people && with_people.split(/[,|\|]/).length > 1)) promisesToFetch.push(fetchByActors(baseUrl, event.queryStringParameters, apiKey));
    try {
        const response = await Promise.all(promisesToFetch);
        const data = [];
        response.forEach(collection => data.push(...collection.results));
        return {
            statusCode: 200,
            body: JSON.stringify({data: data})
        }
    } catch(error) {
        const {status, statusText, headers, data} = error.response;
        return {
            statusCode: status,
            body: JSON.stringify({status, statusText, headers, data})
        }
    }
}

module.exports = {handler};