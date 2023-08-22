import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from '../../features/movies/moviesSlise';
import searchActorsReducer from "../../features/searchActors/searchActorsSlice";
import searchParametersReducer from '../../features/searchParameters/searchParametersSlice';
import genresReducer from '../../features/genres/genresSlice';

export const store = configureStore({
    reducer: {
        movies: moviesReducer,
        searchActors: searchActorsReducer,
        searchParameters: searchParametersReducer,
        genres: genresReducer
    }
});