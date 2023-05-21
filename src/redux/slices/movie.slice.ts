import {createAsyncThunk, createSlice, isFulfilled, isPending} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {IApi, IMovie, IMovieDetails} from "../../interfaces";
import {authService, movieService} from "../../services";
import {IWatchListBody, IWatchListRes} from "../../interfaces/watch-list.interface";


interface IState {
    movies: IMovie[],
    page: number,
    total_pages: number,
    total_results: number,
    movieDetails: IMovieDetails,
    trending: IMovie[],
    watchList: IMovie[],
    loading: boolean

}

const initialState: IState = {
    movies: [],
    page: 1,
    total_pages: 0,
    total_results: 0,
    movieDetails: null,
    trending: [],
    watchList: [],
    loading: false
};

const getAll = createAsyncThunk<IApi<IMovie[]>, { page: string, genre: string }>(
    'movieSlice/getAll',
    async ({page, genre}, {rejectWithValue}) => {
        try {
            const {data} = await movieService.getAll(page, genre);
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err?.response?.data)
        }
    }
);

const getById = createAsyncThunk<IMovieDetails, { id: string }>(
    'movieSlice/getById',
    async ({id}, {rejectWithValue}) => {
        try {
            const {data} = await movieService.getById(id);
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err?.response?.data)
        }
    }
);

const searchMovies = createAsyncThunk<IApi<IMovie[]>, { page: string, name: string }>(
    'movieSlice/searchMovies',
    async ({page, name}, {rejectWithValue}) => {
        try {
            const {data} = await movieService.searchMovies(name, page)
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err?.response?.data)
        }
    }
);

const getWatchList = createAsyncThunk<IApi<IMovie[]>, void>(
    'movieSlice/getWatchList',
    async (_, {rejectWithValue}) => {
        try {
            const sessionId = authService.getSessionId();
            const {data: {id}} = await authService.getUser(sessionId);

            const {data} = await movieService.getWatchList(id, sessionId)
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err?.response?.data)
        }
    }
);

const addToWatchList = createAsyncThunk<IWatchListRes, { body: IWatchListBody }>(
    'movieSlice/addToWatchList',
    async ({body}, {rejectWithValue}) => {
        try {
            const sessionId = authService.getSessionId();
            const {data: {id}} = await authService.getUser(sessionId);

            const {data} = await movieService.addToWatchList(id, body, sessionId);
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
);

const getTrending = createAsyncThunk<IApi<IMovie[]>>(
    'movieSlice/getTrending',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await movieService.getTrending();
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
);


const movieSlice = createSlice({
    name: 'movieSlice',
    initialState,
    reducers: {
        setWatchList: (state, action) => {
            state.watchList = action.payload
        }
    },
    extraReducers: builder =>
        builder
            .addCase(getAll.fulfilled, (state, action) => {
                state.movies = action.payload.results
            })
            .addCase(searchMovies.fulfilled, (state, action) => {
                state.movies = action.payload.results
            })
            .addCase(getWatchList.fulfilled, (state, action) => {
                state.watchList = action.payload.results
            })
            .addCase(getById.fulfilled, (state, action) => {
                state.movieDetails = action.payload
                state.loading = false
            })
            .addCase(getTrending.fulfilled, (state, action) => {
                state.trending = action.payload.results
            })
            .addMatcher(isFulfilled(getAll, searchMovies, getWatchList), (state, action) => {
                state.page = action.payload.page;
                state.total_results = action.payload.total_results;
                state.total_pages = action.payload.total_pages > 500 ? 500 : action.payload.total_pages;
            })
            .addMatcher(isFulfilled(), state => {
                state.loading = false
            })
            .addMatcher(isPending(getAll, getById, getWatchList, searchMovies), state => {
                state.loading = true
            })


});


const {reducer: movieReducer, actions} = movieSlice;

const movieActions = {
    ...actions,
    getAll,
    getById,
    searchMovies,
    getTrending,
    getWatchList,
    addToWatchList
};


export {
    movieActions,
    movieReducer
};