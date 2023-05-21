import {FC, useState} from "react";
import {Button, Grid, TextField} from "@mui/material";
import {useSearchParams} from "react-router-dom";

const SearchBar: FC = () => {

    const [name, setName] = useState<string>('');

    const [, setQuery] = useSearchParams();

    const searchByName = (): void => {
        setQuery({name, page: '1'})
        setName('')
    }

    return (
        <Grid container spacing={3}>

            <Grid item xs={8} md={9}>
                <TextField value={name}
                           onChange={({target}) => setName(target.value)}
                           fullWidth
                           label={'Name'}/>
            </Grid>

            <Grid item xs={4} md={3}>
                <Button disabled={!name}
                        sx={{height: '100%'}}
                        size={'large'}
                        variant={'contained'}
                        fullWidth
                        onClick={searchByName}
                >
                    Search
                </Button>
            </Grid>

        </Grid>
    )
}

export {SearchBar};