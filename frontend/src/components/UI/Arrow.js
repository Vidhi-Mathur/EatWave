import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

export const Arrow = ({ style, onClick, direction }) => {
    return (
        <div className={`slick-arrow block absolute top-1/2 transform -translate-y-1/2 z-10 cursor-pointer ${direction === 'left'? 'left-2': 'right-2'}`} style={style} onClick={onClick}> 
        {direction === 'left'? (
            <ArrowBackIos style={{ color: 'black', fontSize: '30px'}}/>
        ): 
        (
            <ArrowForwardIos style={{ color: 'black', fontSize: '30px'}}/>
        )}
        </div>
    )
}