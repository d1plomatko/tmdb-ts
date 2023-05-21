import {FC, useState} from "react";
import {Box, Button, Icon, IconButton, InputAdornment, Paper, TextField, Typography} from "@mui/material";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";
import {useLocation, useNavigate} from "react-router-dom";

import css from './LoginForm.module.css';
import {IUser} from "../../interfaces";
import {userValidator} from "../../validators";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {authActions} from "../../redux";

const LoginForm: FC = () => {

    const {handleSubmit, control, reset, formState: {isValid, errors}} = useForm<IUser>({
        mode: "all",
        resolver: joiResolver(userValidator)
    });

    const {error} = useAppSelector(state => state.authReducer);
    const dispatch = useAppDispatch();

    const navigate = useNavigate();
    const {state} = useLocation()

    const [showPassword, setShowPassword] = useState<boolean>(false);



    const login: SubmitHandler<IUser> = async (user) => {
        const {meta: {requestStatus}} = await dispatch(authActions.login({user}));
        reset()
        if (requestStatus === 'fulfilled'){
            navigate(state.from || '/movies')
        }
    }


    return (
        <Box className={css.LoginContainer} component={Paper}>
            <Typography className={css.LoginHeading} variant={'h5'} component={'div'}>Login</Typography>
            <form onSubmit={handleSubmit(login)} className={css.LoginForm}>
                <Controller control={control}
                            name={'username'}
                            defaultValue={''}
                            render={({field: {value, onChange}}) =>
                                <TextField label={'Username'}
                                           value={value}
                                           onChange={onChange}
                                           error={!!errors.username}
                                           helperText={errors.username ? errors.username.message : null}
                                />}
                />
                <Controller control={control}
                            defaultValue={''}
                            name={'password'}
                            render={({field: {value, onChange}}) =>
                                <TextField label={'Password'}
                                           value={value}
                                           onChange={onChange}
                                           type={showPassword ? 'text' : 'password'}
                                           error={!!errors.password}
                                           helperText={errors.password ? errors.password.message : null}
                                           InputProps={{
                                               endAdornment: <InputAdornment position={'end'}>
                                                   <IconButton
                                                       onClick={() => setShowPassword(prev => !prev)}>
                                                       <Icon fontSize={'small'} baseClassName={'fas'}
                                                             className={showPassword ?
                                                                 'fa-solid fa-eye-slash' :
                                                                 'fa-solid fa-eye'}/>
                                                   </IconButton>
                                               </InputAdornment>
                                           }}

                                />}
                />
                {error && <Typography color={'red'} textAlign={'center'}>{error.status_message}</Typography>}
                <Button type={'submit'} disabled={!isValid} size={'large'} variant={'contained'}>Login</Button>
            </form>
        </Box>
    )
}

export {LoginForm};