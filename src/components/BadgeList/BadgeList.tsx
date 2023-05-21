import {FC, useEffect, useState} from "react";
import {Box} from "@mui/material";

import {IGenre} from "../../interfaces";
import css from './BadgeList.module.css';
import {GenreBadge} from "../GenreBadge/GenreBadge";
import {genreService} from "../../services";

interface IProps {
    genre_ids: number[]
}

const BadgeList: FC<IProps> = ({genre_ids}) => {

    const [movieGenres, setMovieGenres] = useState<IGenre[]>([]);

    useEffect(() => {
        genreService.getAll().then(({data: {genres}}) => {
            return setMovieGenres(genres.filter(genre => genre_ids.some(id => id === genre.id)).slice(0, 3))
        })
    }, [genre_ids])

    return (
        <Box className={css.BadgeList}>
            {
                movieGenres.map(({id, name}) => <GenreBadge key={id} genre={name}/>)
            }
        </Box>
    )
}

export {BadgeList};