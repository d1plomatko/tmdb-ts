import {FC} from "react";
import {Rating} from "@mui/material";

interface IProps {
    rating: number
}
const StarRating: FC<IProps> = ({rating}) => {

    return (
        <Rating readOnly value={rating} precision={0.1}/>
    )
}

export {StarRating};