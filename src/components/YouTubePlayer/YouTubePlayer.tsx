import {FC} from "react";
import {Box, Modal} from "@mui/material";
import YouTube from "react-youtube";

import {ISetState} from "../../types/set-state.type";
import {IVideo} from "../../interfaces";
import css from './YouTubePlayer.module.css'

interface IProps {
    openPlayer: boolean,
    setOpenPlayer: ISetState<boolean>,
    videos: IVideo[]
}

const YouTubePlayer: FC<IProps> = ({setOpenPlayer, openPlayer, videos}) => {


    const options = {
        playerVars: {
            autoplay: 1
        },
        width: '100%',
    };

    const getVideoId = () => {
        const offTrailer = videos.find(({name}) => name === 'Official Trailer')

        if (offTrailer) {
            return offTrailer?.key
        }

        const partiallyOff = videos.find(({name}) => name.includes('Official Trailer'))

        if (partiallyOff) {
            return partiallyOff?.key
        }

        return videos[0]?.key

    }

    return (
        <Modal open={openPlayer} onClose={() => setOpenPlayer(false)}
               className={css.PlayerModal}>
            <Box className={css.PlayerContainer}>
                <YouTube videoId={getVideoId()} opts={options}/>
            </Box>
        </Modal>
    )
}

export {YouTubePlayer};