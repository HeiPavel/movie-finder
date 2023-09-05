import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import { fetchMovies } from "../../util/moviesRequest";
import { resetActors, addActor } from "../searchActors/searchActorsSlice";
import { toggleVisibility } from "../sidebar/sidebarSlice";
import { resetSearchParameters } from "../searchParameters/searchParametersSlice";
import { resetGenres } from "../genres/genresSlice";
import { resetTitles } from "../searchMovieTitle/searchMovieTitle";

export const loadMovies = createAsyncThunk('movies/loadMovies', 
    async (paramObj) => {
        const response = await fetchMovies(paramObj);
        const obj = {
            totalPages: response.data.totalPages
        }
        obj.movies = response.data.movies.filter(movie => movie.poster_path).map(movie => {
            return {
                title: movie.title,
                overview: movie.overview,
                poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                release_date: new Date(movie.release_date).getFullYear(),
                vote_average: movie.vote_average,
                vote_count: movie.vote_count,
                genre: movie.genre_ids,
                id: movie.id,
                matchCounter: 0,
                sortIndex: 0
            }
        });
        return obj;
    }
);

export const moviesSlice = createSlice({
    name: 'movies',
    initialState: {
        loading: {
            movies: [],
            isLoading: false,
            isError: false,
            totalPages: 0
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
            language: 'en-US',
            page: 1,
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
            state.loading.totalPages = 0;
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
                language: state.searchParams.language,
                page: 1,
            }
            state.movieIds = {};
        },
        toggleLanguage: (state, action) => {
            state.searchParams.language = action.payload.term;
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
                state.loading.movies.sort((a,b) => {
                    if (state.sortTerm.includes('asc')) {
                        return a[currentSortTerm] - b[currentSortTerm];
                    }  else {
                        if (currentSortTerm === 'matchCounter') {
                            return b.matchCounter === a.matchCounter ? a.sortIndex - b.sortIndex : b.matchCounter - a.matchCounter;
                        } else {
                            return b[currentSortTerm] - a[currentSortTerm];
                        }
                    }
                });
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
            let index = state.loading.movies.length;
            action.payload.movies.forEach(movie => {
                if (!Object.hasOwn(state.movieIds, movie.id)) {
                    state.movieIds[movie.id] = 1;
                    state.loading.movies.push(movie);
                    if (query && movie.title.toLowerCase().includes(query.toLowerCase())) movie.matchCounter++;
                    if (query && movie.title.toLowerCase() === query.toLowerCase()) movie.matchCounter++;
                    if (array.length && array.some(genre => movie.genre.includes(genre))) movie.matchCounter++;
                    if (primary_release_year && movie.release_date === primary_release_year) movie.matchCounter++;
                    movie.sortIndex = index;
                    index++;
                }
            });
            if (!state.loading.totalPages) state.loading.totalPages = action.payload.totalPages;
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
export const selectLanguage = (state) => state.movies.searchParams.language;
export const selectSearchParams = (state) => state.movies.searchParams;
export const selectSortTerm = (state) => state.movies.sortTerm;
export const {addPage, updateSearchParams, resetMovies, changeSortTerm, resetSortTerm, sortByTerm, toggleLanguage} = moviesSlice.actions;
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

export const toggleLanguageAndReloadMovies = (payload) => {
    return dispatch => {
        dispatch(resetMovies());
        dispatch(toggleLanguage(payload));
        dispatch(resetTitles());
        dispatch(addActor([]));
        dispatch(resetGenres());
        dispatch(resetSearchParameters());
        dispatch(resetSortTerm());
    }
}

export default moviesSlice.reducer;