import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectMovies, selectLanguage } from "../../features/movies/moviesSlise";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { loadMovieData, selectMovieData } from "../../features/moviePage/moviePageSlice";

export const MoviePage = () => {
    const dispatch = useDispatch();
    const {movies} = useSelector(selectMovies);
    const data = useSelector(selectMovieData);
    const {id} = useParams();
    const language = useSelector(selectLanguage);
    const movie = movies.find(m => m.id === Number(id));
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(loadMovieData({id, language}));
    }, [dispatch, id, language]);

    if (!movie) {
        return (
            <Navigate to="/" />
        );
    }

    return (
        <div className="movie-page" style={{backgroundImage: `url(${movie.backdrop})`}}>
            <div className="movie-page-content">
                <button onClick={() => navigate(-1)}>Back</button>
            </div>
        </div>
    );
}