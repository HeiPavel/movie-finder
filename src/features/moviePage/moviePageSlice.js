import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchDetails } from "../../util/moviePageRequest";

export const loadMovieData = createAsyncThunk('moviePage/loadMovieData',
    async ({id, language}) => {
        const response = await fetchDetails(id, language);
        return response.data;
    }
);

export const moviePageSlice = createSlice({
    name: 'moviePage',
    initialState: {
        runtime: 0,
        actors: [],
        trailer: '',
        isLoading: false,
        isError: false
    }, reducers: {
        resetMovieInfo: (state) => {
            state.runtime = 0;
            state.actors = [];
            state.trailer = '';
            state.isLoading = false;
            state.isError = false;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(loadMovieData.pending, (state) => {
            state['isLoading'] = true;
            state['isError'] = false;
        })
        .addCase(loadMovieData.fulfilled, (state, action) => {
            for (const term in action.payload) {
                state[term] = action.payload[term];
            }
            state['isLoading'] = false;
            state['isError'] = false;
        })
        .addCase(loadMovieData.rejected, (state) => {
            state['isLoading'] = false;
            state['isError'] = true;
        })
    }
});

export const selectMovieData = (state) => state.moviePage;

export const {resetMovieInfo} = moviePageSlice.actions;

export default moviePageSlice.reducer;