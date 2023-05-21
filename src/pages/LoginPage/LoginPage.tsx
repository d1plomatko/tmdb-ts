import {FC} from "react";
import {Modal} from "@mui/material";
import {useLocation, useNavigate} from "react-router-dom";

import {LoginForm} from "../../components";

const LoginPage: FC = () => {


    const {state} = useLocation();
    const navigate = useNavigate();

    document.title = 'Login'

    const path = state?.from || '/movies'

    return (
        <Modal sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}} open={true}
               onClose={() => navigate(path)}>
            <>
                <LoginForm/>
            </>
        </Modal>
    )
}

export {LoginPage};