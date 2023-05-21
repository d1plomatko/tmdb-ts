import {axiosService} from "./axios.service";
import {urls} from "../constants";
import {IRes} from "../types";
import {
    IRequestToken, ISessionId,
    ISessionRes,
    ISessionWithLogin,
    ISessionWithLoginResponse,
    IUserRes
} from "../interfaces";

const authService = {
    getRequestToken: (): IRes<IRequestToken> => axiosService.get(urls.auth.requestToken),
    createSessionWithLogin: (data: ISessionWithLogin): IRes<ISessionWithLoginResponse> => axiosService.post(urls.auth.sessionWithLogin, data),
    createSession: (token: IRequestToken): IRes<ISessionRes> => axiosService.post(urls.auth.session, token),
    getUser: (session_id: string): IRes<IUserRes> => axiosService.get(urls.account, {params: {session_id}}),
    deleteSession: (session: ISessionId): IRes<{ success: boolean }> => axiosService.delete(urls.auth.sessionDelete, {data: session}),

    saveSessionId: (session_id: string): void => localStorage.setItem('session_id', session_id),
    getSessionId: (): string => localStorage.getItem('session_id'),
    removeSessionId: (): void => localStorage.removeItem('session_id')
}

export {
    authService
}