import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectMovies, selectSearchParams, loadMovies, addPageAndRestSortTerm } from "../../features/movies/moviesSlise";
import { Movie } from "../movie/Movie";
import {Skeleton} from 'primereact/skeleton';
import { ErrorOrEmpty } from "../errorOrEmpty/ErrorOrEmpty";

export const MovieListContainer = () => {
    const {movies, isLoading, isError} = useSelector(selectMovies);
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
            {isError ? <ErrorOrEmpty
                            message={'Sorry something went wrong, change search parameters or try later.'}
            /> : movies.map(movie => {
                return <Movie 
                        movie={movie}
                        key={movie.id}
                    />;
                })} {isLoading ? loading() : (!movies.length && !isError) ? <ErrorOrEmpty
                        message={'Sorry, nothing was found with your search parameters try to change them.'}
                /> : []}
            <div className="button-container">
                <button onClick={() => dispatch(addPageAndRestSortTerm())}>Load more</button>
            </div>
        </div>
    );
}