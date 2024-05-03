import { useEffect, useState } from "react"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export const Review = ({id}) => {
    const [reviews, setReviews] = useState(null)

    useEffect(() => {
        const fetchReviews = async() => {
            const response = await fetch(`http://localhost:3000/review/restaurant/${id}`)
            if (!response.ok) {
                throw new Error("Can't fetch restaurant details");
            }
            const result = await response.json()
            console.log(result.reviews);
            setReviews(result.reviews)
        }
        fetchReviews()
    }, [id])
    
    if(!reviews) return <div>Loading...</div>

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
                {reviews.map((review, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md p-4 mb-4">
                        <h3 className="text-lg font-semibold"><AccountCircleIcon fontSize="large"/> {review.reviewer.name}</h3>
                        <p className="text-grey-600">{formattedDate(review.date)}</p>
                        <p className="text-gray-600">{review.rating}</p>
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