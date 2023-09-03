import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectMovies, selectSearchParams, loadMovies, addPageAndRestSortTerm, selectLanguage } from "../../features/movies/moviesSlise";
import { Movie } from "../movie/Movie";
import {Skeleton} from 'primereact/skeleton';
import { ErrorOrEmpty } from "../errorOrEmpty/ErrorOrEmpty";
import { selectContent } from "../../features/content/contentSlice";

export const MovieListContainer = () => {
    const {movies, isLoading, isError, totalPages} = useSelector(selectMovies);
    const searchParams = useSelector(selectSearchParams);
    const language = useSelector(selectLanguage);
    const content = useSelector(selectContent);
    const dispatch = useDispatch();

    const loading = () => {
        return (
            <>
                {new Array(12).fill(1).map((_, index) => (<Skeleton key={index} width="" height="" />))}
            </>
        );
    }

    const loadMore = () => {
        return (
            <div className="button-container" onClick={() => dispatch(addPageAndRestSortTerm())}>
                <p>{content[language].loadMore}</p>
            </div>
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
            {(!isLoading && !isError && movies.length && (searchParams.page < totalPages)) && loadMore()}
        </div>
    );
}