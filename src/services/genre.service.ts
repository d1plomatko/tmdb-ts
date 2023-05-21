import {axiosService} from "./axios.service";
import {urls} from "../constants";
import {IRes} from "../types";
import {IGenreList} from "../interfaces";

const genreService = {
    getAll: (): IRes<IGenreList> => axiosService.get(urls.genres)
};

export {
    genreService
};