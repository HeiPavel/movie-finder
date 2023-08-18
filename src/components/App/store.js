import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from '../../features/movies/moviesSlise';
import personReducer from "../../features/person/personSlice";

export const store = configureStore({
    reducer: {
        movies: moviesReducer,
        person: personReducer
    }
});