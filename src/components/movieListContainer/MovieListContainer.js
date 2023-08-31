import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectMovies, selectSearchParams, loadMovies, addPageAndRestSortTerm } from "../../features/movies/moviesSlise";
import { Movie } from "../movie/Movie";
import {Skeleton} from 'primereact/skeleton';

export const MovieListContainer = () => {
    const {movies, isLoading} = useSelector(selectMovies);
    const searchParams = useSelector(selectSearchParams);
    const dispatch = useDispatch();

    const loading = () => {
        return (
            <>
                {new Array(12).fill(1).map((_, index) => (<Skeleton key={index} width="" height="" />))}
            </>
        );
    }

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
                })} {isLoading ? loading() : []}
            <div className="button-container">
                <button onClick={() => dispatch(addPageAndRestSortTerm())}>Load more</button>
            </div>
        </div>
    );
}