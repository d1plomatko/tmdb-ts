import {FC} from "react";
import {Typography} from "@mui/material";

import css from './GenreBadge.module.css';

interface IProps {
    genre: string
}
const GenreBadge: FC<IProps> = ({genre}) => {

    return (
        <Typography className={css.GenreBadge}>
            {genre}
        </Typography>
    )
}

export {GenreBadge};