import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from '../../features/movies/moviesSlise';
import searchActorsReducer from "../../features/searchActors/searchActorsSlice";
import searchParametersReducer from '../../features/searchParameters/searchParametersSlice';
import genresReducer from '../../features/genres/genresSlice';
import searchMovieTitleReducer from "../../features/searchMovieTitle/searchMovieTitle";
import sidebarReducer from '../../features/sidebar/sidebarSlice';

export const store = configureStore({
    reducer: {
        movies: moviesReducer,
        searchActors: searchActorsReducer,
        searchParameters: searchParametersReducer,
        genres: genresReducer,
        movieTitles: searchMovieTitleReducer,
        sidebar: sidebarReducer
    }
});