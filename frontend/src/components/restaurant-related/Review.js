import { useEffect, useState } from "react"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Rating from '@mui/material/Rating';

export const Review = ({restaurantId}) => {
    const [reviews, setReviews] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchReviews = async() => {
            try {
                const response = await fetch(`http://localhost:3000/review/restaurant/${restaurantId}`)
                const result = await response.json()
                 if (!response.ok) {
                    setError(result.message)
                    return;
                }
                setReviews(result.reviews)
            }
            catch(err) {
                setError("Fetching reviews failed, try again later")
            }
        }
        fetchReviews()
    }, [restaurantId])
    
    if (error) {
        return <p className="text-red-500 text-center m-4">{error}</p>;
    }

    if (reviews === null) {
        return <div>Loading...</div>;
    }

    if (reviews.length === 0) {
        return <div className="max-w-4xl mx-auto px-4 py-8">No reviews available</div>;
    }
    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
                {error && <p className="text-red-500 text-center m-4">{error}</p>}
                {reviews.map((review, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md p-4 mb-4">
                        <h3 className="text-lg font-semibold"><AccountCircleIcon fontSize="large"/> {review.reviewer.name}</h3>
                        <p className="text-grey-600">{formattedDate(review.date)}</p>
                        <Rating value={review.rating} readOnly/>
                        <p className="text-gray-800 mt-2">{review.comments}</p>
                    </div>
                ))}
        </div>
    )
}

export const formattedDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };