import {FC} from "react";
import {CardMedia, SxProps, Theme} from "@mui/material";

import {emptyImageURL, posterURL} from "../../constants";

interface IProps {
    path: string | null,
    alt: string,
    height?: string,
    sx?: SxProps<Theme>
}
const PosterPreview:FC<IProps> = ({path, alt, height= '300px', sx}) => {

    const url = path ? `${posterURL}${path}` : emptyImageURL;


    return (
        <CardMedia
            component={'img'}
            image={url}
            title={alt}
            sx={{height , objectPosition: 'top', ...sx}}
        />
    )
}

export {PosterPreview};