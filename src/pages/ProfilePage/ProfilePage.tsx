import {Avatar, Container, Divider, Grid, Typography} from "@mui/material";
import {FC} from "react";
import {useAppSelector} from "../../hooks";

const ProfilePage:FC = () => {


    const {user} = useAppSelector(state => state.authReducer)

    const {avatar, name, username, iso_3166_1} = user

    document.title = username

    return (
        <Container>
            <Grid container columnSpacing={2} rowSpacing={3}>
                <Grid item xs={12} md={4}>
                    <Avatar src={avatar.tmdb.avatar_path} sx={{width:'200px', height: '200px'}}/>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Typography variant={'h4'}>{name}</Typography>
                    <Typography color={'text.secondary'}>{username}</Typography>
                    <Divider sx={{margin: '10px 0'}}/>
                    <Typography>Country: {iso_3166_1}</Typography>
                </Grid>
            </Grid>
        </Container>
    )
}

export {ProfilePage};