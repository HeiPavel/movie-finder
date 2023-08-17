import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from '../../features/movies/moviesSlise';

export const store = configureStore({
    reducer: {
        movies: moviesReducer
    }
});