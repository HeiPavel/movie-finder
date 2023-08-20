import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import { fetchMovies } from "../../util/moviesRequest";

export const loadMovies = createAsyncThunk('movies/loadMovies', 
    async (paramObj) => {
        const response = await fetchMovies(paramObj);
        return response.data.filter(movie => movie.poster_path).map(movie => {
            return {
                title: movie.original_title,
                overview: movie.overview,
                poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                release_date: movie.release_date,
                vote_average: movie.vote_average,
                vote_count: movie.vote_count,
                genre: movie.genre_ids,
                id: movie.id,
                matchCounter: 0
            }
        });
    }
);

export const moviesSlice = createSlice({
    name: 'movies',
    initialState: {
        loading: {
            movies: [],
            isLoading: false,
            isError: false
        },
        searchParams: {
            query: '',
            with_genres: [],
            with_people: [],
            primary_release_year: '',
            page: 1
        },
        movieIds: {}
    },
    reducers: {
        addPage: (state) => {
            state.searchParams.page += 1;
        },
        updateSearchParams: (state, action) => {
            for (const param in action.payload) {
                Array.isArray(action.payload[param]) ? state.searchParams[param].push(...action.payload[param]) : state.searchParams[param] = action.payload[param];
            }
        },
        resetMovies: (state) => {
            state.loading.movies = [];
        },
        resetSearchParams: (state) => {
            state.searchParams = {
                query: '',
                with_genres: [],
                with_people: [],
                primary_release_year: '',
                page: 1
            }
            state.movieIds = {};
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(loadMovies.pending, (state) => {
            state.loading['isLoading'] = true;
            state.loading['isError'] = false;
        })
        .addCase(loadMovies.fulfilled, (state, action) => {
            const {query, with_genres, primary_release_year} = state.searchParams;
            action.payload.forEach(movie => {
                if (!Object.hasOwn(state.movieIds, movie.id)) {
                    state.movieIds[movie.id] = 1;
                    state.loading.movies.push(movie);
                    if (query && movie.title.toLowerCase().includes(query)) movie.matchCounter++;
                    if (with_genres.length && with_genres.some(genre => movie.genre.includes(genre))) movie.matchCounter++;
                    if (primary_release_year && movie.release_date.includes(primary_release_year)) movie.matchCounter++;
                }
            });
            state.loading.movies.sort((a, b) => b.matchCounter - a.matchCounter);
            state.loading['isLoading'] = false;
            state.loading['isError'] = false;
        })
        .addCase(loadMovies.rejected, (state) => {
            state.loading['isLoading'] = false;
            state.loading['isError'] = true;
        })
    }
});

export const selectMovies = (state) => state.movies.loading;
export const selectSearchParams = (state) => state.movies.searchParams;
export const {addPage, updateSearchParams, resetMovies, resetSearchParams} = moviesSlice.actions;

export default moviesSlice.reducer;