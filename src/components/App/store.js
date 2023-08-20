import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from '../../features/movies/moviesSlise';
import personReducer from "../../features/person/personSlice";
import searchParametersReducer from '../../features/searchParameters/searchParametersSlice';

export const store = configureStore({
    reducer: {
        movies: moviesReducer,
        person: personReducer,
        searchParameters: searchParametersReducer
    }
});