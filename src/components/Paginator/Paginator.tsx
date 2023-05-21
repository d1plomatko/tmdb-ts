import {Box, Pagination} from "@mui/material";
import {useSearchParams} from "react-router-dom";
import {FC} from "react";

import {useAppSelector} from "../../hooks";

const Paginator: FC = () => {

    const {total_pages} = useAppSelector(state => state.movieReducer)

    const [query, setQuery] = useSearchParams({page: '1'});

    const handlePagination = (n: number) => {
        query.set('page', n.toString())
        setQuery(query)
        window.scrollTo(0, 0)
    }




    return (
        <Box sx={{display: 'flex', justifyContent: 'center', padding: '40px 0'}}>
            <Pagination
                onChange={(_, n) => handlePagination(n)}
                page={+query.get('page')!}
                count={total_pages}
                variant={"outlined"}
                shape={'rounded'}/>
        </Box>
    )
}

export {Paginator};