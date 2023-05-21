import {createAsyncThunk, createSlice, isFulfilled, isPending, isRejectedWithValue} from "@reduxjs/toolkit";

import {ILoginError, IUser, IUserRes} from "../../interfaces";
import {AxiosError} from "axios";
import {authService} from "../../services";

interface IState {
    user: IUserRes,
    error: ILoginError,
    trigger: boolean,
    loading: boolean,
}

const initialState: IState = {
    user: null,
    error: null,
    trigger: false,
    loading: false
};

const login = createAsyncThunk<boolean, { user: IUser }>(
    'authSlice/login',
    async ({user}, {rejectWithValue}) => {
        try {
            const {data: {request_token}} = await authService.getRequestToken();
            const {data: {success}} = await authService.createSessionWithLogin({...user, request_token});
            if (success) {
                const {data: {session_id, success}} = await authService.createSession({request_token});
                authService.saveSessionId(session_id)
                return success
            }
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
);

const logout = createAsyncThunk<void, void>(
    'authSlice/logout',
    async (_, {rejectWithValue}) => {
        try {
            const session_id = authService.getSessionId()
            await authService.deleteSession({session_id})
            authService.removeSessionId()
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
);

const getUser = createAsyncThunk<IUserRes, void>(
    'authSlice/getUser',
    async (_, {rejectWithValue}) => {
        try {
            const session_id = authService.getSessionId()
            if (session_id){
                const {data} = await authService.getUser(session_id);
                return data
            }
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
);

const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {},
    extraReducers: builder =>
        builder
            .addCase(getUser.fulfilled, (state, action) => {
                state.user = action.payload
            })
            .addMatcher(isFulfilled(), state => {
                state.error = null
                state.loading = false
            })
            .addMatcher(isFulfilled(login, logout), state => {
                state.trigger = !state.trigger
            })
            .addMatcher(isPending(), state => {
                state.loading = true
            })
            .addMatcher(isRejectedWithValue(), (state, action) => {
                state.error = action.payload
                state.loading = false
            })
});


const {reducer: authReducer, actions} = authSlice;

const authActions = {
    ...actions,
    login,
    getUser,
    logout
}

export {
    authReducer,
    authActions
};