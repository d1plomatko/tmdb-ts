import {IGenre} from './genre.interface'


interface IProdCompany {
    id: number,
    logo_path: string,
    name: string,
    origin_country: string
}

interface IProdCountry {
    iso_3166_1: string,
    name: string
}

interface ILanguage {
    english_name: string,
    iso_639_1: string,
    name: string
}

export interface IVideo {
    iso_639_1: string,
    iso_3166_1: string,
    name: string,
    key: string,
    site: string,
    size: number,
    type: string,
    official: string,
    published_at: string,
    id: string
}


export interface IMovieDetails {
    adult: boolean,
    backdrop_path: string
    belongs_to_collection: null,
    budget: number;
    genres: IGenre[],
    homepage: string,
    id: number,
    imdb_id: string,
    original_language: string,
    original_title: string,
    overview: string,
    popularity: number,
    poster_path: string,
    production_companies: IProdCompany[],
    production_countries: IProdCountry[],
    release_date: string,
    revenue: number,
    runtime: number,
    spoken_languages: ILanguage[],
    status: string,
    tagline: string,
    title: string,
    video: boolean,
    vote_average: number,
    vote_count: number,
    videos: {
        results: IVideo[]
    }
}