import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectMovies, loadMovies, addPage } from "../../features/movies/moviesSlise";
import { Movie } from "../movie/Movie";

export const MovieListContainer = () => {
    const {movies, page} = useSelector(selectMovies);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadMovies({page: page, title: 'fight'}));
    }, [dispatch, page]);

    return (
        <div className="movies-container">
            {movies.map(movie => {
                return <Movie 
                            poster={movie.poster}
                            key={movie.id}
                        />;
            })}
            <div className="button-container">
                <button onClick={() => dispatch(addPage())}>Load more</button>
            </div>
        </div>
    );
}