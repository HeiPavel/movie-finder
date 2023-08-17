import fetch from "node-fetch";

const handler = async (event) => {
    const {page} = event.queryStringParameters;
    const baseUrl = "https://api.themoviedb.org/3/discover/movie?api_key=";
    const apiKey = process.env.API_KEY;
    const query = `&page=${page}&with_genres=Science%20Fiction`;
    const url = baseUrl + apiKey + query;
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