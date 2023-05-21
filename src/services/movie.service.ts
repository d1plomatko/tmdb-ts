import {axiosService} from "./axios.service";

import {urls} from "../constants";
import {IRes} from "../types";
import {IApi, IMovie, IMovieDetails} from "../interfaces";
import {IWatchListBody, IWatchListRes} from "../interfaces/watch-list.interface";


const movieService = {
    getAll: (page: string, genre: string): IRes<IApi<IMovie[]>> => axiosService.get(urls.movies, {
        params: {
            page,
            with_genres: genre
        }
    }),
    getById: (id: string): IRes<IMovieDetails> => axiosService.get(urls.movieById(id), {params: {append_to_response: 'videos'}}),
    searchMovies: (query: string, page: string) => axiosService.get(urls.searchMovies, {params: {query, page}}),
    getTrending: (): IRes<IApi<IMovie[]>> => axiosService.get(urls.trending),

    getWatchList: (id: number, session_id: string): IRes<IApi<IMovie[]>> => axiosService.get(urls.watchList(id), {params: {session_id}}),
    addToWatchList: (id: number, body: IWatchListBody, session_id: string): IRes<IWatchListRes> => axiosService.post(urls.addWatchList(id), body, {params: {session_id}})
};

export {
    movieService
};