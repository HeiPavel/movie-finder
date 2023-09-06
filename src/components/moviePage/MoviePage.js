import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectMovies } from "../../features/movies/moviesSlise";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { loadMovieData, selectMovieData } from "../../features/moviePage/moviePageSlice";

export const MoviePage = () => {
    const dispatch = useDispatch();
    const {movies} = useSelector(selectMovies);
    const data = useSelector(selectMovieData);
    const {id} = useParams();
    const movie = movies.find(m => m.id === Number(id));
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(loadMovieData(id));
    }, [dispatch, id]);

    if (!movie) {
        return (
            <Navigate to="/" />
        );
    }

    return (
        <div className="movie-page">
            <p>{movie.title}</p>
            <p>{movie.overview}</p>
            <p>{data.runtime}</p>
            <button onClick={() => navigate(-1)}>Back</button>
        </div>
    );
}