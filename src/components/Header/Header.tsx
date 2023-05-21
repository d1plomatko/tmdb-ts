import {FC, useState} from "react";
import {
    AppBar,
    Container,
    Toolbar,
    Typography,
    Box,
    LinearProgress,
    IconButton,
    Icon
} from "@mui/material";
import {Link} from "react-router-dom";

import {ITheme} from "../../types";
import {ISetState} from "../../types/set-state.type";
import {ThemeSwitch} from "../ThemeSwitch/ThemeSwitch";
import {useAppSelector} from "../../hooks";
import css from './Header.module.css';
import {MenuDrawer} from "../MenuDrawer/MenuDrawer";

interface IProps {
    mode: ITheme,
    setMode: ISetState<ITheme>
}

const Header: FC<IProps> = ({mode, setMode}) => {

    const {loading} = useAppSelector(state => state.movieReducer);

    const [open, setOpen] = useState<boolean>(false);

    return (
        <AppBar>
            <Toolbar>
                <Container className={css.HeaderContainer}>
                    <Typography variant={'h6'}
                                fontWeight={'bolder'}
                                color={'inherit'}
                                component={Link} to={'/'}
                                sx={{textDecoration: 'none'}}
                    >
                        TMDB
                    </Typography>
                    <Box className={css.HeaderNav}>

                        <ThemeSwitch
                            checked={mode === 'dark'}
                            onChange={() => setMode(prev => prev === 'dark' ? 'light' : 'dark')}/>

                        <IconButton onClick={() => setOpen(true)}>
                            <Icon
                                baseClassName="fas"
                                className="fa-solid fa-bars"
                            />
                        </IconButton>

                    </Box>
                </Container>
            </Toolbar>

            {loading && <LinearProgress/>}

            <MenuDrawer open={open} setOpen={setOpen}/>
        </AppBar>
    )
}

export {Header};