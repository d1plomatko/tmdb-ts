import {FC} from "react";
import {Button, Grid} from "@mui/material";
import {useSearchParams} from "react-router-dom";

import {IGenre} from "../../interfaces";

interface IProps {
    genre: IGenre
}

const GenreButton: FC<IProps> = ({genre}) => {

    const {id, name} = genre;

    const [query, setQuery] = useSearchParams();

    const variant = query.get('genre') === id.toString() ? 'contained' : 'outlined';

    const handleGenreQuery = (genreId: number): void => {
        if (query.get('genre') === genreId.toString()) {
            setQuery({})
        } else {
            setQuery({genre: id.toString(), page: '1'})
        }
    }

    return (
        <Grid item xs={12} md={4}>
            <Button variant={variant}
                    fullWidth
                    onClick={() => handleGenreQuery(id)}
            >
                {name}
            </Button>
        </Grid>
    )
}

export {GenreButton};