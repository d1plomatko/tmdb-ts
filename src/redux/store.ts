import {combineReducers} from "redux";
import {configureStore} from "@reduxjs/toolkit";

import {authReducer, genreReducer, movieReducer} from "./slices";

const rootReducer = combineReducers({
    movieReducer,
    genreReducer,
    authReducer
});

const setupStore = () => configureStore({
    reducer: rootReducer
});

export {
    setupStore,
    rootReducer
};