import {FC, useState} from "react";
import {
    Box,
    Button,
    Card,
    Divider,
    Grid,
    Icon,
    IconButton,
    Table,
    TableBody,
    TableContainer,
    Typography
} from "@mui/material";


import {PosterPreview} from "../PosterPreview/PosterPreview";
import {MovieDetailsRow} from "../MovieDetailsRow/MovieDetailsRow";
import {YouTubePlayer} from "../YouTubePlayer/YouTubePlayer";
import {IMovieDetails} from "../../interfaces";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {movieActions} from "../../redux";


interface IProps {
    movieDetails: IMovieDetails
}

const MovieDetails: FC<IProps> = ({movieDetails}) => {

    const {
        title,
        original_title,
        overview,
        poster_path,
        videos: {results},
        runtime,
        release_date,
        vote_average,
        vote_count,
        production_companies,
        production_countries,
        genres
    } = movieDetails

    document.title = title

    console.log(movieDetails)

    const [openPlayer, setOpenPlayer] = useState<boolean>(false);

    const {user} = useAppSelector(state => state.authReducer);
    const {watchList} = useAppSelector(state => state.movieReducer)
    const dispatch = useAppDispatch();


    const isMovieAtWatchList = watchList.some(({id}) => id === movieDetails.id)

    const saveToWatchList = (movie: IMovieDetails) => {

        if (isMovieAtWatchList) {
            dispatch(movieActions.addToWatchList({
                body: {
                    media_id: movie.id,
                    media_type: 'movie',
                    watchlist: false
                }
            }))
            dispatch(movieActions.setWatchList(watchList.filter(({id}) => id !== movie.id)))
        } else {
            dispatch(movieActions.addToWatchList({
                body: {
                    media_id: movie.id,
                    media_type: 'movie',
                    watchlist: true
                }
            }))
            dispatch(movieActions.setWatchList([...watchList, movie]))
        }
    }

    const companies = production_companies.length ? production_companies.map(company => company.name).join(', ') : '-'
    const countries = production_countries.length ? production_countries.map(country => country.name).join(', ') : '-'
    const genresList = genres.length ? genres.map(genre => genre.name).join(', ') : '-'


    return (
        <Grid container rowSpacing={3} columnSpacing={5}>
            <Grid item xs={10}>
                <Typography variant={'h4'} component={'div'}>{title}</Typography>
                <Typography color={'text.secondary'} gutterBottom>{original_title}</Typography>
                <Divider/>
            </Grid>
            <Grid item xs={1}>
                {user && (
                    <IconButton onClick={() => saveToWatchList(movieDetails)}>
                        {isMovieAtWatchList ?
                            <Icon baseClassName="fas" className='fa-solid fa-x'/> :
                            <Icon baseClassName="fas" className='fa-plus-circle'/>
                        }
                    </IconButton>
                )}
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <Box>
                    <Card sx={{boxShadow: 'none'}}>
                        <PosterPreview path={poster_path} alt={title} height={'auto'}/>
                    </Card>
                    {
                        !!results.length && (
                            <Button sx={{width: '100%', margin: '15px 0'}}
                                    variant={'contained'}
                                    size={'large'}
                                    onClick={() => setOpenPlayer(true)}
                            >
                                Play trailer
                            </Button>
                        )
                    }
                </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={5} lg={4}>
                <TableContainer>
                    <Table>
                        <TableBody>
                            <MovieDetailsRow cellName={'Rating:'}>
                                {vote_average?.toFixed(2)} ({vote_count})
                            </MovieDetailsRow>
                            <MovieDetailsRow cellName={'Release date:'}>
                                {release_date}
                            </MovieDetailsRow>
                            <MovieDetailsRow cellName={'Runtime:'}>
                                {runtime}min
                            </MovieDetailsRow>
                            <MovieDetailsRow cellName={'Countries:'}>
                                {countries}
                            </MovieDetailsRow>
                            <MovieDetailsRow cellName={'Companies:'}>
                                {companies}
                            </MovieDetailsRow>
                            <MovieDetailsRow cellName={'Genres: '}>
                                {genresList}
                            </MovieDetailsRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            <Grid item lg={9}>
                <Typography variant={'h5'} component={'div'} gutterBottom>
                    Description
                </Typography>
                <Typography color={'text.secondary'}>{overview}</Typography>
            </Grid>


            <YouTubePlayer openPlayer={openPlayer} setOpenPlayer={setOpenPlayer} videos={results}/>
        </Grid>
    )
}

export {MovieDetails};