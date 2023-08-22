import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchActors } from "../../util/personRequest";
import { addPeople } from "../searchParameters/searchParametersSlice";

export const loadActors = createAsyncThunk('searchActors/loadActors',
    async (term) => {
        const response = await fetchActors(term);
        return response.data.results.map(person => {
            return {
                name: person.name,
                id: person.id,
                photo: person.profile_path
            }
        });
    }
);

export const searchActors = createSlice({
    name: 'searchActors',
    initialState: {
        term: '',
        selectedActors: [],
        actors: []
    },
    reducers: {
        changeTerm: (state, action) => {
            state.term = action.payload;
        },
        addActor: (state, action) => {
            state.selectedActors = action.payload;
        },
        resetActors: (state) => {
            state.term = '';
            state.actors = [];
        }, 
        clearActors: (state) => {
            state.actors = [];
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(loadActors.fulfilled, (state, action) => {
            state.actors = [...action.payload];
        })
    }
});

export const selectSearchTerm = (state) => state.searchActors.term;
export const selectActors = (state) => state.searchActors.actors;
export const selectSelectedActors = (state) => state.searchActors.selectedActors;

export const {changeTerm, addActor, resetActors, clearActors} = searchActors.actions;
export const addAndResetActors = (payload) => {
    return dispatch => {
        dispatch(addActor(payload ? payload : []));
        dispatch(addPeople(payload ? payload : []));
        dispatch(resetActors());
    }
}

export default searchActors.reducer;