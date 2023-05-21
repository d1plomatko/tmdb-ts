import {FC, useEffect} from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, Navigation, Pagination} from "swiper";
import {Container, Divider, Typography} from "@mui/material";
import 'swiper/css'
import 'swiper/css/navigation'

import {useAppDispatch, useAppSelector} from "../../hooks";
import {movieActions} from "../../redux";
import {SmallMovieCard} from "../SmallMovieCard/SmallMovieCard";

const SwiperContainer: FC = () => {

    const {trending} = useAppSelector(state => state.movieReducer);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(movieActions.getTrending())
    }, [dispatch])


    const breakpoints = {
        1200: {
            slidesPerView: 7,
            spaceBetween: 8
        },
        900: {
            slidesPerView: 5,
            spaceBetween: 10
        },
        600: {
            slidesPerView: 3,
            spaceBetween: 12
        },
        0: {
            slidesPerView: 1
        }
    }

    return (
        <Container>
            <Divider sx={{marginBottom: '15px'}}/>
            <Typography fontWeight={'bold'} variant={'h6'} gutterBottom>
                Trending today
            </Typography>
            <Swiper modules={[Navigation, Pagination, Autoplay]}
                    breakpoints={breakpoints}
                    navigation={{}}
                    loop={true}
            >
                {
                    trending.map(movie => (
                        <SwiperSlide style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}} key={movie.id}>
                            <SmallMovieCard movie={movie}/>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
            <Divider sx={{marginTop: '15px'}}/>
        </Container>
    )
}

export {SwiperContainer};