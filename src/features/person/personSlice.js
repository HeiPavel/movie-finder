import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchActors } from "../../util/personRequest";

export const loadActors = createAsyncThunk('person/loadActors',
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

export const personSlice = createSlice({
    name: 'person',
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
            if (state.selectedActors.every(actor => actor.id !== action.payload.id)) state.selectedActors.push(action.payload);
        },
        removeActor: (state, action) => {
            state.selectedActors = state.selectedActors.filter(actor => actor.id !== action.payload);
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

export const selectSearchTerm = (state) => state.person.term;
export const selectActors = (state) => state.person.actors;
export const selectSelectedActors = (state) => state.person.selectedActors;

export const {changeTerm, addActor, removeActor, clearActors} = personSlice.actions;

export default personSlice.reducer;