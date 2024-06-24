import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

export const PreviousArrow = (props) => {
    const { style, onClick } = props
    return (
        <div className="slick-arrow" style={{...style, display: 'block', cursor: 'pointer', zIndex: 1}} onClick={onClick}> 
        <ArrowBackIos style={{ color: 'black', fontSize: '30px'}}/>
        </div>
    )
}

export const NextArrow = (props) => {
    const { style, onClick } = props
    return (
        <div className="slick-arrow" style={{...style, display: 'block', cursor: 'pointer', zIndex: 1}} onClick={onClick}> 
        <ArrowForwardIos style={{ color: 'black', fontSize: '30px'}}/>
        </div>
    )
}