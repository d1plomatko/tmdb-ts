import {FC, useEffect} from "react";
import {Grid} from "@mui/material";
import {useSearchParams} from "react-router-dom";

import {useAppDispatch, useAppSelector} from "../../hooks";
import {movieActions} from "../../redux";
import {MovieListCard} from "../MovieListCard/MovieListCard";

const MovieList: FC = () => {

    const {movies, loading} = useAppSelector(state => state.movieReducer)
    const dispatch = useAppDispatch()

    const [query] = useSearchParams({page: '1'});

    useEffect(() => {

        if (query.get('name')) {
            dispatch(movieActions.searchMovies({page: query.get('page'), name: query.get('name')}))
            document.title = 'Results of search'
        } else {
            dispatch(movieActions.getAll({page: query.get('page'), genre: query.get('genre')}))
            document.title = 'Movies'
        }

    }, [dispatch, query])


    if (loading){
        return null
    }

    return (
        <Grid container columnSpacing={2} rowSpacing={3}>
            {
                movies.map(movie => <MovieListCard key={movie.id} movie={movie}/>)
            }
        </Grid>
    )
}

export {MovieList};