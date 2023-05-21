import {FC} from "react";

import {WatchList} from "../../components";

const MyWatchListPage:FC = () => {

    document.title = 'Watch List'

    return (
        <div>
            <WatchList/>
        </div>
    )
}

export {MyWatchListPage};