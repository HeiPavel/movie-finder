import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchGenres } from "../../util/genresRequest";
import { changeSelectedGenres } from "../searchParameters/searchParametersSlice";

export const loadGenres = createAsyncThunk('genres/loadGenres',
    async (language) => {
        const response = await fetchGenres(language);
        return response.data.map(genre => (genre.name === 'Science Fiction' || genre.name === 'TV Movie') ? {name: genre.name.split(' ').join('-'), id: genre.id} : genre);
    }
);

export const genresSlice = createSlice({
    name: 'genres',
    initialState: {
        genres: [],
        selectedGenres: []
    },
    reducers: {
        changeGenre: (state, action) => {
            state.selectedGenres = action.payload === null ? [] : action.payload;
        },
        resetGenres: (state) => {
            state.selectedGenres = [];
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(loadGenres.fulfilled, (state, action) => {
            state.genres = action.payload;
        })
    }
});

export const selectGenres = (state) => state.genres.genres;
export const selectSelectedGenres = (state) => state.genres.selectedGenres;

export const {changeGenre, resetGenres} = genresSlice.actions;
export const updateGenres = (payload) => {
    return dispatch => {
        dispatch(changeGenre(payload));
        dispatch(changeSelectedGenres(payload ? payload.map(genre => genre.id) : []));
    }
}

export default genresSlice.reducer;