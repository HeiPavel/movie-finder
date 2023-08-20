import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchActors } from "../../util/personRequest";

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
            if (state.selectedActors.every(actor => actor.id !== action.payload.id)) state.selectedActors.push(action.payload);
        },
        removeActor: (state, action) => {
            state.selectedActors = state.selectedActors.filter(actor => actor.id !== action.payload);
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

export const {changeTerm, addActor, removeActor, resetActors, clearActors} = searchActors.actions;

export default searchActors.reducer;