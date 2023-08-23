import {createSlice} from "@reduxjs/toolkit";

export const searchParametersSlice = createSlice({
    name: 'searchParameters',
    initialState: {
        searchParameters: {
            query: '',
            with_genres: [],
            with_people: [],
            primary_release_year: ''
        }
    },
    reducers: {
        addPeople: (state, action) => {
            state.searchParameters.with_people = action.payload.map(actor => actor.id);
        },
        changeSelectedGenres: (state, action) => {
            state.searchParameters.with_genres = action.payload;
        },
        chooseYear: (state, action) => {
            state.searchParameters.primary_release_year = action.payload;
        }
    }
});

export const selectSearchParameters = (state) => state.searchParameters.searchParameters;
export const selectYear = (state) => state.searchParameters.searchParameters.primary_release_year;

export const {addPeople, changeSelectedGenres, chooseYear} = searchParametersSlice.actions;
export default searchParametersSlice.reducer;