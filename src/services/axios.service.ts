import axios from "axios";

import {baseURL} from "../constants";

const axiosService = axios.create({baseURL});

const access = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNzJkNDYzMGRlMGQ2ODZhYWQwMDE0YzA5MjIwMzBkZCIsInN1YiI6IjY0NTNkNmI0ZDQ4Y2VlMDBmY2VlMDZlOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HfwhFucY4TlUeRIasa_6xdWtE-p6uLN1d8yf7emg9bQ'
axiosService.interceptors.request.use((config) => {
    config.headers = config.headers ?? {}

    config.headers.Authorization = `Bearer ${access}`
    return config
});

export {
    axiosService
};