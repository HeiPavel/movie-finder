import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import { fetchMovies } from "../../util/moviesRequest";
import { resetActors } from "../searchActors/searchActorsSlice";
import { toggleVisibility } from "../sidebar/sidebarSlice";

export const loadMovies = createAsyncThunk('movies/loadMovies', 
    async (paramObj) => {
        const response = await fetchMovies(paramObj);
        return response.data.filter(movie => movie.poster_path).map(movie => {
            return {
                title: movie.title,
                overview: movie.overview,
                poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                release_date: new Date(movie.release_date).getFullYear(),
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
            with_genres: {
                array: [],
                separator: false
            },
            with_people: {
                array: [],
                separator: false
            },
            primary_release_year: '',
            page: 1
        },
        movieIds: {},
        sortTerm: ''
    },
    reducers: {
        addPage: (state) => {
            state.searchParams.page += 1;
        },
        updateSearchParams: (state, action) => {
            for (const param in action.payload) {
                state.searchParams[param] = action.payload[param];
            }
        },
        resetMovies: (state) => {
            state.loading.movies = [];
            state.searchParams = {
                query: '',
                with_genres: {
                    array: [],
                    separator: false
                },
                with_people: {
                    array: [],
                    separator: false
                },
                primary_release_year: '',
                page: 1
            }
            state.movieIds = {};
        },
        changeSortTerm: (state, action) => {
            state.sortTerm = action.payload;
        },
        resetSortTerm: (state) => {
            state.sortTerm = ''
        },
        sortByTerm: (state) => {
            if (state.sortTerm) {
                const currentSortTerm = state.sortTerm.includes('Vote') ? 'vote_average' : state.sortTerm.includes('Year') ? 'release_date' : 'matchCounter';
                state.loading.movies.sort((a,b) => state.sortTerm.includes('asc') ? a[currentSortTerm] - b[currentSortTerm] : b[currentSortTerm] - a[currentSortTerm]);
            }
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(loadMovies.pending, (state) => {
            state.loading['isLoading'] = true;
            state.loading['isError'] = false;
        })
        .addCase(loadMovies.fulfilled, (state, action) => {
            const {query, primary_release_year} = state.searchParams;
            const {array} = state.searchParams.with_genres;
            action.payload.forEach(movie => {
                if (!Object.hasOwn(state.movieIds, movie.id)) {
                    state.movieIds[movie.id] = 1;
                    state.loading.movies.push(movie);
                    if (query && movie.title.toLowerCase().includes(query.toLowerCase())) movie.matchCounter++;
                    if (query && movie.title.toLowerCase() === query.toLowerCase()) movie.matchCounter++;
                    if (array.length && array.some(genre => movie.genre.includes(genre))) movie.matchCounter++;
                    if (primary_release_year && movie.release_date === primary_release_year) movie.matchCounter++;
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
export const selectSortTerm = (state) => state.movies.sortTerm;
export const {addPage, updateSearchParams, resetMovies, changeSortTerm, resetSortTerm, sortByTerm} = moviesSlice.actions;
export const resetAndUpdate = (payload) => {
    return dispatch => {
        dispatch(resetMovies());
        dispatch(updateSearchParams(payload));
        dispatch(resetActors());
        dispatch(toggleVisibility());
        dispatch(resetSortTerm());
    }
}

export const addPageAndRestSortTerm = () => {
    return dispatch => {
        dispatch(addPage());
        dispatch(resetSortTerm());
    } 
}

export const sortAndHideSidebar = () => {
    return dispatch => {
        dispatch(sortByTerm());
        dispatch(toggleVisibility());
    }
}

export default moviesSlice.reducer;