import {createSlice} from "@reduxjs/toolkit";

export const searchParametersSlice = createSlice({
    name: 'searchParameters',
    initialState: {
        searchParameters: {
            query: '',
            with_genres: {
                array: [],
                separator: false
            },
            with_people: {
                array: [],
                separator: false
            },
            primary_release_year: ''
        }
    },
    reducers: {
        changeQuery: (state, action) => {
            state.searchParameters.query = action.payload;
        },
        addPeople: (state, action) => {
            state.searchParameters.with_people.array = action.payload.map(actor => actor.id);
        },
        changeSelectedGenres: (state, action) => {
            state.searchParameters.with_genres.array = action.payload;
        },
        chooseYear: (state, action) => {
            state.searchParameters.primary_release_year = action.payload;
        },
        toggleGenreSeparator: (state, action) => {
            state.searchParameters.with_genres.separator = action.payload;
        },
        togglePeopleSeparator: (state, action) => {
            state.searchParameters.with_people.separator = action.payload;
        }
    }
});

export const selectSearchParameters = (state) => state.searchParameters.searchParameters;
export const selectYear = (state) => state.searchParameters.searchParameters.primary_release_year;
export const selectGenreSeparator = (state) => state.searchParameters.searchParameters.with_genres.separator;
export const selectPeopleSeparator = (state) => state.searchParameters.searchParameters.with_people.separator;

export const {addPeople, changeSelectedGenres, chooseYear, toggleGenreSeparator, togglePeopleSeparator, changeQuery} = searchParametersSlice.actions;
export default searchParametersSlice.reducer;