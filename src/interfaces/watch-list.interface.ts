export interface IWatchListBody {
    media_type: 'tv' | 'movie',
    media_id: number,
    watchlist: boolean
}

export interface IWatchListRes {
    status_code: number,
    status_message: string
}