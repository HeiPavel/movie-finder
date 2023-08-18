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
        actorId: '',
        actors: []
    },
    reducers: {
        changeTerm: (state, action) => {
            state.term = action.payload;
            state.actorId = ''
        },
        selectActor: (state, action) => {
            state.actorId = action.payload;
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

export const selectPerson = (state) => state.person;

export const {changeTerm, selectActor, clearActors} = personSlice.actions;

export default personSlice.reducer;