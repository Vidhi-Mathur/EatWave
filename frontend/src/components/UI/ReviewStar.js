import StarIcon from '@mui/icons-material/Star';

export const ReviewStar = ({ rating }) => (
    <button className="bg-orange-600 text-white px-2 py-1 rounded-md"><StarIcon style={{color: 'ghostwhite'}} /> {rating}</button>
);