import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectMovies } from "../../features/movies/moviesSlise";
import { useParams, useNavigate } from "react-router-dom";
import { loadMovieData, selectMovieData } from "../../features/moviePage/moviePageSlice";

export const MoviePage = () => {
    const dispatch = useDispatch();
    const {movies} = useSelector(selectMovies);
    const data = useSelector(selectMovieData);
    const {id} = useParams();
    const movie = movies.find(m => m.id == id);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(loadMovieData(id));
    }, [dispatch, id]);

    return (
        <div className="movie-page">
            <p>{movie.title}</p>
            <p>{movie.overview}</p>
            <p>{data.runtime}</p>
            <button onClick={() => navigate(-1)}>Back</button>
        </div>
    );
}