import {FC, useEffect} from "react";

import {MovieDetails} from "../../components";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {movieActions} from "../../redux";
import {useParams} from "react-router-dom";

const MovieDetailsPage: FC = () => {

    const {movieDetails, loading} = useAppSelector(state => state.movieReducer);
    const dispatch = useAppDispatch();

    const {id} = useParams();

    useEffect(() => {
        dispatch(movieActions.getById({id: id!}))
    }, [id, dispatch])

    if (loading){
        return null
    }

    return (
        <>
            {movieDetails && <MovieDetails movieDetails={movieDetails}/>}
        </>
    )
}

export {MovieDetailsPage};