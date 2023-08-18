import fetch from "node-fetch";

const handler = async (event) => {
    const apiKey = process.env.API_KEY;
    const {term} = event.queryStringParameters;
    const baseUrl = `https://api.themoviedb.org/3/search/person?api_key=${apiKey}`;
    const url = baseUrl + `&query=${term}`;
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