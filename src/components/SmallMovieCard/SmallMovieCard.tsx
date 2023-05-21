import {FC} from "react";
import {Box, Card, CardActionArea, CardContent, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";

import {PosterPreview} from "../PosterPreview/PosterPreview";
import {IMovie} from "../../interfaces";

interface IProps {
    movie: IMovie
}

const SmallMovieCard: FC<IProps> = ({movie}) => {

    const {title, poster_path, id} = movie

    const navigate = useNavigate();

    return (
          <Box  onClick={() => navigate(`/movies/${id}`)}>
              <Card sx={{width: '150px', marginBottom: '10px', height: '275px'}}>
                  <CardActionArea>
                      <PosterPreview path={poster_path} alt={title} height={'200px'}/>
                      <CardContent>
                          <Typography color={'text.secondary'} lineHeight={1} fontSize={14} >{title}</Typography>
                      </CardContent>
                  </CardActionArea>
              </Card>

          </Box>
    )
}

export {SmallMovieCard};