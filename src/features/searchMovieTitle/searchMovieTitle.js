import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchMovieTitles } from "../../util/titlesRequest";
import { changeQuery } from "../searchParameters/searchParametersSlice";

export const loadMovieTitles = createAsyncThunk('movieTitles/loadMovieTitles',
    async ({term, language}) => {
        const response = await fetchMovieTitles(term, language);
        return response.data;
    }
);

export const searchMovieTitleSlice = createSlice({
    name: 'movieTitles',
    initialState: {
        term: '',
        titles: []
    },
    reducers: {
        changeTerm: (state, action) => {
            state.term = action.payload;
        },
        resetTitles: (state) => {
            state.term = '';
            state.titles = [];
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(loadMovieTitles.fulfilled, (state, action) => {
            state.titles = action.payload;
        })
    }
});

export const selectMovieTitles = (state) => state.movieTitles.titles;
export const selectTitleTerm = (state) => state.movieTitles.term;

export const {changeTerm, resetTitles} = searchMovieTitleSlice.actions;
export const updateQuery = (payload) => {
    return dispatch => {
        dispatch(changeTerm(payload));
        dispatch(changeQuery(payload));
    }
}

export default searchMovieTitleSlice.reducer;