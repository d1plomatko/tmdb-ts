import {FC, useEffect} from "react";
import {Box, Button, Drawer} from "@mui/material";
import {NavLink, useLocation, useNavigate} from "react-router-dom";

import {ISetState} from "../../types/set-state.type";
import {UserInfo} from "../UserInfo/UserInfo";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {authActions} from "../../redux";
import css from './MenuDrawer.module.css';


interface IProps {
    open: boolean,
    setOpen: ISetState<boolean>
}

const MenuDrawer: FC<IProps> = ({open, setOpen}) => {

    const {user, trigger} = useAppSelector(state => state.authReducer);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(authActions.getUser())
    }, [dispatch, trigger])


    const navigate = useNavigate();
    const {pathname} = useLocation();

    const handleAuth = async () => {
        if (user) {
            await dispatch(authActions.logout())
        } else {
            navigate('/login', {state: {from: pathname}})
        }

        setOpen(false)
    }

    const closeDrawer = () => setOpen(false)

    return (
        <Drawer open={open} onClose={() => setOpen(false)} anchor={'right'}>
            <Box sx={{
                padding: '30px 15px',
                width: '250px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '15px'
            }}>
                <UserInfo user={user} closeDrawer={closeDrawer}/>

                <NavLink className={css.MenuDrawerLink} to={'/my-watch-list'} onClick={closeDrawer}>
                    My Watch List
                </NavLink>

                <Button color={user ? 'error' : 'primary'} onClick={handleAuth} variant={'contained'}>
                    {user ? 'Logout' : 'Login'}
                </Button>
            </Box>

        </Drawer>
    )
}

export {MenuDrawer};