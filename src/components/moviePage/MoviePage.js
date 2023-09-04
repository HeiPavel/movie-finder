import React from "react";
import { useSelector } from "react-redux";
import { selectMovies } from "../../features/movies/moviesSlise";
import { useParams, useNavigate } from "react-router-dom";

export const MoviePage = () => {
    const {movies} = useSelector(selectMovies);
    const {id} = useParams();
    const movie = movies.find(m => m.id == id);
    const navigate = useNavigate();

    return (
        <div className="movie-page">
            <p>{movie.title}</p>
            <p>{movie.overview}</p>
            <button onClick={() => navigate(-1)}>Back</button>
        </div>
    );
}