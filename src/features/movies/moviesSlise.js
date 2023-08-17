import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import { fetchMovies } from "../../util/moviesRequest";

export const loadMovies = createAsyncThunk('movies/loadMovies', 
    async ({page}) => {
        const response = await fetchMovies(page);
        return response.data.results.map(movie => {
            return {
                title: movie.original_title,
                overview: movie.overview,
                poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                release_date: movie.release_date,
                vote_average: movie.vote_average,
                vote_count: movie.vote_count,
                genre: movie.genre_ids,
                id: movie.id
            }
        });
    }
);

export const moviesSlice = createSlice({
    name: 'movies',
    initialState: {
        movies: [],
        isLoading: false,
        isError: false,
        page: 1
    },
    reducers: {
        addPage: (state) => {
            state.page += 1;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(loadMovies.pending, (state) => {
            state['isLoading'] = true;
            state['isError'] = false;
        })
        .addCase(loadMovies.fulfilled, (state, action) => {
            state.movies.push(...action.payload);
            state['isLoading'] = false;
            state['isError'] = false;
        })
        .addCase(loadMovies.rejected, (state) => {
            state['isLoading'] = false;
            state['isError'] = true;
        })
    }
});

export const selectMovies = (state) => state.movies;
export const {addPage} = moviesSlice.actions;

export default moviesSlice.reducer;