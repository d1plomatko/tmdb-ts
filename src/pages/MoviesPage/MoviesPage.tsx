import {FC} from "react";
import {Grid} from "@mui/material";

import {GenreList, MovieList, Paginator, SearchBar, SwiperContainer} from "../../components";

const MoviesPage: FC = () => {

    return (
        <Grid container columnSpacing={2} rowSpacing={4}>
            <Grid item xs={12}>
                <SwiperContainer/>
            </Grid>
            <Grid item xs={12} sm={6}>
                <GenreList/>
            </Grid>
            <Grid item xs={12} sm={6}>
                <SearchBar/>
            </Grid>
            <Grid item xs={12} sx={{minHeight: '100vh', height: '100%'}}>
                <MovieList/>
            </Grid>
            <Grid item xs={12}>
                <Paginator/>
            </Grid>
        </Grid>
    )
}

export {MoviesPage};