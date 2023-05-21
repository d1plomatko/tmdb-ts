import {FC, useEffect} from "react";
import {Grid} from "@mui/material";

import {useAppDispatch, useAppSelector} from "../../hooks";
import {movieActions} from "../../redux";
import {MovieListCard} from "../MovieListCard/MovieListCard";


const WatchList: FC = () => {
    
    const {watchList} = useAppSelector(state => state.movieReducer);
    const dispatch = useAppDispatch();
    

    useEffect(() => {
        dispatch(movieActions.getWatchList())
    }, [dispatch])


    return (
        <Grid container columnSpacing={2} rowSpacing={3}>
            {
                watchList.map(movie => <MovieListCard key={movie.id} movie={movie}/>)
            }
        </Grid>
    )
}

export {WatchList};