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
        }
    }
});

export const selectSearchParameters = (state) => state.searchParameters.searchParameters;

export const {addPeople, changeSelectedGenres} = searchParametersSlice.actions;
export default searchParametersSlice.reducer;