import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchGenres } from "../../util/genresRequest";
import { changeSelectedGenres } from "../searchParameters/searchParametersSlice";

export const loadGenres = createAsyncThunk('genres/loadGenres',
    async () => {
        const response = await fetchGenres();
        return response.data;
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
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(loadGenres.fulfilled, (state, action) => {
            state.genres.push(...action.payload);
        })
    }
});

export const selectGenres = (state) => state.genres.genres;
export const selectSelectedGenres = (state) => state.genres.selectedGenres;

export const {changeGenre} = genresSlice.actions;
export const updateGenres = (payload) => {
    return dispatch => {
        dispatch(changeGenre(payload));
        dispatch(changeSelectedGenres(payload ? payload.map(genre => genre.id) : []));
    }
}

export default genresSlice.reducer;