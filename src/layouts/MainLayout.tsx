import {FC} from "react";
import {Outlet} from "react-router-dom";
import {CssBaseline, Container, ThemeProvider, createTheme} from "@mui/material";

import {Header} from "../components";
import {useLocalStorage} from "../hooks/use-local-storage.hook";
import {ITheme} from "../types";

const MainLayout: FC = () => {

    const [mode, setMode] = useLocalStorage<ITheme>('theme', 'light');

    const theme = createTheme({
        palette: {
            mode
        }
    })

    return (
        <ThemeProvider theme={theme}>
            <Container sx={{marginTop: '100px', marginBottom: '40px'}}>
                <CssBaseline/>
                <Header mode={mode} setMode={setMode}/>
                <Outlet/>
            </Container>
        </ThemeProvider>
    )
}

export {MainLayout};