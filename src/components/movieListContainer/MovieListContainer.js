import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectMovies, selectSearchParams, loadMovies, addPageAndRestSortTerm } from "../../features/movies/moviesSlise";
import { Movie } from "../movie/Movie";

export const MovieListContainer = () => {
    const {movies} = useSelector(selectMovies);
    const searchParams = useSelector(selectSearchParams);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadMovies(searchParams));
    }, [dispatch, searchParams]);

    return (
        <div className="movies-container">
            {movies.map(movie => {
                return <Movie 
                        movie={movie}
                        key={movie.id}
                    />;
                })}
            <div className="button-container">
                <button onClick={() => dispatch(addPageAndRestSortTerm())}>Load more</button>
            </div>
        </div>
    );
}