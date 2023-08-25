import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchMovieTitles } from "../../util/titlesRequest";
import { changeQuery } from "../searchParameters/searchParametersSlice";

export const loadMovieTitles = createAsyncThunk('movieTitles/loadMovieTitles',
    async (query) => {
        const response = await fetchMovieTitles(query);
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

export const {changeTerm} = searchMovieTitleSlice.actions;
export const updateQuery = (payload) => {
    return dispatch => {
        dispatch(changeTerm(payload));
        dispatch(changeQuery(payload));
    }
}

export default searchMovieTitleSlice.reducer;