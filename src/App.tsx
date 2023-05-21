import {Navigate, Route, Routes} from "react-router-dom";

import {MainLayout} from "./layouts";
import {LoginPage, MovieDetailsPage, MoviesPage, MyWatchListPage, NotFoundPage, ProfilePage} from "./pages";
import {RequireAuth} from "./hoc";

const App = () => {

    return (
        <Routes>
            <Route path={'/'} element={<MainLayout/>}>
                <Route index element={<Navigate to={'movies'}/>}/>
                <Route path={'movies'} element={<MoviesPage/>}/>
                <Route path={'movies/:id'} element={<MovieDetailsPage/>}/>
                <Route path={'login'} element={<LoginPage/>}/>
                <Route path={'my-watch-list'} element={<RequireAuth><MyWatchListPage/></RequireAuth>}/>
                <Route path={'profile/:id'} element={<RequireAuth><ProfilePage/></RequireAuth>}/>
                <Route path={'*'} element={<NotFoundPage/>}/>
            </Route>
        </Routes>
    )
}

export default App;