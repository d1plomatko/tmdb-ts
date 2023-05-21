const baseURL = 'https://api.themoviedb.org/3';
const posterURL = 'https://image.tmdb.org/t/p/w500';
const emptyImageURL = 'https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482953.jpg'
const urls = {
    movies: '/discover/movie',
    movieById: (id: string): string => `/movie/${id}`,
    genres: '/genre/list',
    searchMovies: '/search/movie',
    trending: '/trending/movie/day',
    watchList: (account_id: number): string => `/account/${account_id}/watchlist/movies`,
    addWatchList: (account_id: number): string => `/account/${account_id}/watchlist`,
    auth: {
        requestToken: '/authentication/token/new',
        sessionWithLogin: '/authentication/token/validate_with_login',
        session: '/authentication/session/new',
        sessionDelete: '/authentication/session'
    },
    account: '/account'
};

export {
    baseURL,
    posterURL,
    emptyImageURL,
    urls
};