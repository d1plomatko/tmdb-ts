import {FC, ReactNode} from "react";
import {TableCell, TableRow, Typography} from "@mui/material";

interface IProps {
    cellName: string,
    children: ReactNode
}
const MovieDetailsRow:FC<IProps> = ({cellName, children}) => {


    return (
        <TableRow>
            <TableCell>
                <Typography fontWeight={'bolder'}>{cellName}</Typography>
            </TableCell>
            <TableCell>
                {children}
            </TableCell>
        </TableRow>
    )
}

export {MovieDetailsRow};