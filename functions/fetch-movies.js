import fetch from "node-fetch";

const handler = async (event) => {
    const apiKey = process.env.API_KEY;
    const {page, title} = event.queryStringParameters;
    const baseUrl = "https://api.themoviedb.org/3/";
    const discover = "discover/movie?api_key=";
    const search = "search/movie?api_key=";
    const queryDiscover = `&page=${page}&with_genres=Science%20Fiction`;
    const querySearch = `&query=${title}&page=${page}`;
    const url = title ? baseUrl + search + apiKey + querySearch :  baseUrl + discover + apiKey + queryDiscover;
    try {
        const response = await fetch(url);
        const jsonResponse = await response.json();
        return {
            statusCode: 200,
            body: JSON.stringify({data: jsonResponse})
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