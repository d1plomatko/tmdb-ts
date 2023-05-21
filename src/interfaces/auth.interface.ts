export interface IRequestToken {
    request_token: string
}

export interface ISessionWithLogin extends IRequestToken {
    username: string,
    password: string
}

export interface ISessionWithLoginResponse extends IRequestToken {
    success: boolean,
    expires_at: string
}

export interface ISessionRes {
    success: boolean,
    session_id: string
}

export interface IUserRes {
    avatar: {
        gravatar: {
            hash: string
        },
        tmdb: {
            avatar_path: string
        }
    },
    id: number,
    iso_639_1: string,
    iso_3166_1: string,
    name: string,
    include_adult: boolean,
    username: string
}

export interface ISessionId {
    session_id: string
}