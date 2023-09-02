import fetch from "node-fetch";

const handler = async (event) => {
    const apiKey = process.env.API_KEY;
    const {language} = event.queryStringParameters;
    try {
        const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=${language}`);
        const jsonResponse = await response.json();
        const data = jsonResponse.genres.map(genre => {
            return {
                name: genre.name,
                id: genre.id
            }
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