import fetch from "node-fetch";

const fetchMovieRuntime = async (apiKey, baseUrl, id) => {
    const url = `${baseUrl}${id}?api_key=${apiKey}`;
    try {
        const response = await fetch(url);
        const jsonResponse = await response.json();
        return jsonResponse.runtime;
    } catch(error) {
        console.log(error);
    }
}

const fetchMovieActors = async (apiKey, baseUrl, id) => {
    const url = `${baseUrl}${id}/credits?api_key=${apiKey}`;
    try {
        const response = await fetch(url);
        const jsonResponse = await response.json();
        return jsonResponse.cast.map(actor => ({name: actor.name, id: actor.id, photo: actor.profile_path}));
    } catch(error) {
        console.log(error);
    }
}

const fetchTrailer = async (apiKey, baseUrl, id) => {
    const url = `${baseUrl}${id}/videos?api_key=${apiKey}`;
    try {
        const response = await fetch(url);
        const jsonResponse = await response.json();
        let key = '';
        for (const video of jsonResponse.results) {
            if (!key) {
                key = video.key;
            } else {
                if (video.type.toLowerCase() === 'trailer' && !video.name.endsWith('2')) {
                    key = video.key;
                    break;
                } else {
                    if (video.type.toLowerCase() === 'teaser') key = video.key;
                }
            }
        }
        return key;
    } catch(error) {
        console.log(error);
    }
}

const handler = async (event) => {
    const apiKey = process.env.API_KEY;
    const baseUrl = "https://api.themoviedb.org/3/movie/";
    const {id} = event.queryStringParameters;
    try {
        const response = await Promise.all([fetchMovieRuntime(apiKey, baseUrl, id), fetchMovieActors(apiKey, baseUrl, id), fetchTrailer(apiKey, baseUrl, id)]);
        const data = {
            runtime: response[0],
            actors: response[1],
            trailer: response[2]
        }
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