import {FC} from "react";
import {Box, Card, CardActionArea, CardContent, Grid, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";

import {IMovie} from "../../interfaces";
import {PosterPreview} from "../PosterPreview/PosterPreview";
import {StarRating} from "../StarRating/StarRating";
import {BadgeList} from "../BadgeList/BadgeList";

interface IProps {
    movie: IMovie
}

const MovieListCard: FC<IProps> = ({movie}) => {

    const {id, title, vote_average, poster_path, release_date, genre_ids} = movie

    const navigate = useNavigate();
    const redirect = (id: number) => {
        navigate(`/movies/${id}`)
        window.scrollTo(0, 0)
    }

    const rating = vote_average / 2;

    return (
        <Grid item lg={3} md={4} sm={6} xs={12}>
            <Card onClick={() => redirect(id)} sx={{position: 'relative'}}>
                <BadgeList genre_ids={genre_ids}/>
                <CardActionArea>
                    <PosterPreview path={poster_path} alt={title}/>
                    <CardContent>
                        <Typography variant={'h6'} lineHeight={1} component={'div'} gutterBottom height={'50px'}>
                            {title}
                        </Typography>
                        <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                            <StarRating rating={rating}/>
                            {release_date}
                        </Box>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
    )
}

export {MovieListCard};