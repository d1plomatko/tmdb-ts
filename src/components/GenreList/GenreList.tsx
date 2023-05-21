import {FC, useEffect} from "react";
import {Box, Grid, Paper, Typography} from "@mui/material";

import css from './GenreList.module.css';
import {useAppDispatch, useAppSelector} from "../../hooks";
import {genreActions} from "../../redux";
import {GenreButton} from "../GenreButton/GenreButton";

const GenreList: FC = () => {

    const {genres} = useAppSelector(state => state.genreReducer);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(genreActions.getAll())
    }, [dispatch])

    return (
        <Box className={css.Opener}>
            <Typography component={'div'}
                        className={css.Text}
                        fontWeight={'bolder'}>
                Genres
            </Typography>

            <Box component={Paper} className={css.DropDown}>
                <Grid container columnSpacing={1} rowSpacing={2}>
                    {
                        genres.map(genre => <GenreButton key={genre.id} genre={genre}/>)
                    }
                </Grid>
            </Box>
        </Box>
    )
}

export {GenreList};