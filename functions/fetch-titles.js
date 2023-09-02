import fetch from "node-fetch";

const handler = async (event) => {
    const apiKey = process.env.API_KEY;
    const baseUrl = "https://api.themoviedb.org/3/";
    const {query, language} = event.queryStringParameters;
    const url = `${baseUrl}search/movie?api_key=${apiKey}&query=${query}&language=${language}&page=1`;
    try {
        const response = await fetch(url);
        const jsonResponse = await response.json();
        const data = jsonResponse.results.map(movie => movie.title);
        return {
            statusCode: 200,
            body: JSON.stringify({data: data})
        }
    }  catch(error) {
        const {status, statusText, headers, data} = error.response;
        return {
            statusCode: status,
            body: JSON.stringify({status, statusText, headers, data})
        }
    }
}

module.exports = {handler};