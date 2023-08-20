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
            state.searchParameters.with_people.push(action.payload);
        },
        removePeople: (state, action) => {
            state.searchParameters.with_people = state.searchParameters.with_people.filter(id => id !== action.payload);
        },
        resetSearchParams: (state) => {
            state.searchParameters = {
                query: '',
                with_genres: [],
                with_people: [],
                primary_release_year: ''
            }
        }
    }
});

export const selectSearchParameters = (state) => state.searchParameters.searchParameters;

export const {addPeople, removePeople, resetSearchParams} = searchParametersSlice.actions;
export default searchParametersSlice.reducer;