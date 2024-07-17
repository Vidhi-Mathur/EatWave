import { useEffect, useState } from "react"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Rating from '@mui/material/Rating';
import { ErrorDialog } from "../UI/ErrorDialog"

export const Review = ({restaurantId}) => {
    const [reviews, setReviews] = useState(null)
    const [errors, setErrors] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchReviews = async() => {
            try {
                const response = await fetch(`http://localhost:3000/review/restaurant/${restaurantId}`)
                const result = await response.json()
                if(!response.ok) {
                    const errorMessages = result.errors ? result.errors.map(err => err.msg) : [result.message];
                    setErrors(errorMessages);
                    setLoading(false)
                }
                setReviews(result.reviews)
                setLoading(false)
            }
            catch(err) {
                setErrors(err.message || "Fetching reviews failed, try again later")
                setLoading(false)
            }
        }
        fetchReviews()
    }, [restaurantId])

    const closeErrorDialogHandler = () => {
        setErrors(null)
    }

    if(loading) return <div>Loading...</div>;

    if(reviews && reviews.length === 0) return <div className="max-w-4xl mx-auto px-4 py-8">No reviews available</div>;

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
                {errors && <ErrorDialog errors={errors} onClose={closeErrorDialogHandler}/>}
                {reviews && reviews.map((review, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md p-4 mb-4">
                        <h3 className="text-lg font-semibold"><AccountCircleIcon fontSize="large"/> {review.reviewer.name}</h3>
                        <p className="text-grey-600">{formattedDate(review.date)}</p>
                        <Rating value={review.rating} readOnly/>
                        <p className="text-gray-800 mt-2">{review.comments}</p>
                        {review.imageUrl && (
                            <div className="mt-4">
                                <img src={review.imageUrl} alt="Review" className="w-full h-auto max-h-64 object-contain rounded-lg mb-4"/>
                            </div>
                        )}
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