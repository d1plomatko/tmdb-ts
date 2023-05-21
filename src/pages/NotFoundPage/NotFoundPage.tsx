import {FC} from "react";
import {Container, Typography} from "@mui/material";

import css from './NotFoundPage.module.css';

const NotFoundPage: FC = () => {

    document.title = 'Not Found'

    return (
        <Container className={css.NotFoundContainer}>
            <Typography variant={'h3'} component={'div'} className={css.NotFoundText}>
                Not Found
            </Typography>
        </Container>
    )
}

export {NotFoundPage};