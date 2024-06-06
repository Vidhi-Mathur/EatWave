import { forwardRef, useContext, useEffect, useState } from "react"
import Rating from '@mui/material/Rating';
import { AuthContext } from "../../store/Auth-Context";

export const AddReview = forwardRef(({orderId, restaurantId, existingReview}, ref) => {
    const { token, fetchRefreshToken } = useContext(AuthContext);
    const [ addReview, setAddReview ] = useState(existingReview || {})
    const [ editReview, setEditReview ] = useState(!existingReview)

    useEffect(() => {
        if(existingReview) setAddReview(existingReview)
    }, [existingReview])

    const changeHandler = (e, newRating) => {
        if(e){
            const { name, value } = e.target
            setAddReview((prev) => ({...prev, [name]: name === 'rating'? Number(value): value}))
        }
        else setAddReview((prev) => ({...prev, value: newRating}))
    }
    
    const modalHandler = async(confirmed) => {
        if(confirmed){
            const reviews = {
                rating: addReview.rating,
                comments: addReview.comments,
                restaurant: restaurantId
            }
            let response;
            if(existingReview){
                response = await fetch(`http://localhost:3000/review/${existingReview._id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token? `Bearer ${token}`: ''
                    },
                    body: JSON.stringify(reviews)
                })
            }
            else {
                response = await fetch(`http://localhost:3000/review/${orderId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token? `Bearer ${token}`: ''
                    },
                    body: JSON.stringify(reviews)
                })
            }
            if(!response.ok){
                if(response.status === 401){
                   const refreshResponse = await fetchRefreshToken()
                   if(refreshResponse){
                     response = await fetch(`http://localhost:3000/review/${existingReview? existingReview._id: orderId}`, {
                     method: existingReview? 'PATCH': 'POST',
                     headers: {
                     'Content-Type': 'application/json',
                     'Authorization': `Bearer ${refreshResponse.accessToken}`
                     },
                     body: JSON.stringify(reviews)
                     })
                     if(!response.ok){
                         throw new Error("Can't save review, try again later")
                     }
                   }
                   else {
                     throw new Error("Session expired, try login")
                   }
                }
                else {
                 throw new Error("Can't save review, try again later")
                }
             }
            const result = await response.json()
            setAddReview(result.review)
            setEditReview(false)
        }
        ref.current.close()
    }

    return (
    <dialog ref={ref} className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center">
            <div className="bg-white rounded-lg p-8">
                <Rating name="rating" value={addReview.rating || 0} onChange={(e, newRating) => changeHandler(e, newRating)} readOnly={!editReview}/>
                <textarea id="comments" type="text" name="comments" className="border p-2 w-full mb-4" placeholder="comments" onChange={changeHandler} value={addReview.comments || ""} readOnly={!editReview}/>
                <div className="flex justify-end mt-8">
                {editReview? (
                <button type="button" className="bg-green-500 text-white py-2 px-4 rounded mr-4" onClick={() => modalHandler(true)}>Save</button>
                ): (
                    <button type="button" className="bg-orange-500 text-white py-2 px-4 rounded mr-4" onClick={() => setEditReview(true)}>Edit</button>
                )}
                <button type="button" className="bg-red-500 text-white py-2 px-4 rounded" onClick={() => modalHandler(false)}>Cancel</button>
                </div>
            </div>
        </div>
    </dialog>
    )
})