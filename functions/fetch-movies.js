import fetch from "node-fetch";

const fetchByParams = async (baseUrl, queryObj, apiKey) => {
    let params = new URLSearchParams();
    for (const param in queryObj) {
        if (queryObj[param] && param !== 'query') params.set(param, queryObj[param]);
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
    const {page, query, language} = queryObj;
    if (!query) return {results: []};
    const querySearch = `&query=${query}&language=${language}&page=${page}`;
    const url = `${baseUrl}search/movie?api_key=${apiKey}&${querySearch}`;
    try {
        const response = await fetch(url);
        const jsonResponse = await response.json();
        return jsonResponse;
    } catch(error) {
        console.log(error);
    }
}

const handler = async (event) => {
    const apiKey = process.env.API_KEY;
    const baseUrl = "https://api.themoviedb.org/3/";
    try {
        const response = await Promise.all([fetchByTitle(baseUrl, event.queryStringParameters, apiKey), fetchByParams(baseUrl, event.queryStringParameters, apiKey)]);
        const data = {
            movies: [],
            totalPages: 0
        };
        response.forEach(collection => {
            data.movies.push(...collection.results);
            if (data.totalPages < collection['total_pages']) data.totalPages = collection['total_pages'];
        });
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