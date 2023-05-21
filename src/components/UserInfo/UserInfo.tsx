import {FC} from "react";
import {Avatar, Box, Typography} from "@mui/material";
import {Link} from "react-router-dom";

import {IUserRes} from "../../interfaces";


interface IProps {
    user: IUserRes,
    closeDrawer: () => void
}
const UserInfo:FC<IProps> = ({user, closeDrawer}) => {

    if (!user){
        return null
    }

    const {id, username, avatar: {tmdb: {avatar_path}}} = user

    return (
        <Box sx={{display: 'flex', gap: '10px', alignItems: 'center'}}>
            <Avatar src={avatar_path} alt={username} title={username}/>
            <Typography component={Link} to={`/profile/${id}`} color={'text.secondary'} onClick={closeDrawer}>{username}</Typography>
        </Box>
    )
}

export {UserInfo};