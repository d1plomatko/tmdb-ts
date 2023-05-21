import {rootReducer, setupStore} from "../redux";

type RootState = ReturnType<typeof rootReducer>;
type AppStore = ReturnType<typeof setupStore>;
type AppDispatch = AppStore['dispatch'];

export type {
    AppStore,
    AppDispatch,
    RootState
};
