import {FC, ReactNode, useEffect} from "react";
import {useNavigate} from "react-router-dom";

import {authService} from "../services";

interface IProps {
    children: ReactNode
}

const RequireAuth: FC<IProps> = ({children}) => {


    const sessionId = authService.getSessionId()

    const navigate = useNavigate();


    useEffect(() => {
       if (!sessionId){
           navigate('/login')
       }

    }, [sessionId, navigate])

    if (sessionId) {
        return <>{children}</>
    }

}

export {RequireAuth};