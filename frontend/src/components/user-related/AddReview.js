import { forwardRef, useContext, useEffect, useState } from "react"
import Rating from '@mui/material/Rating';
import { AuthContext } from "../../store/Auth-Context";
import { ErrorDialog } from "../UI/ErrorDialog";

export const AddReview = forwardRef(({orderId, restaurantId, existingReview, updateReview}, ref) => {
    const { token, fetchRefreshToken } = useContext(AuthContext);
    const [ addReview, setAddReview ] = useState(existingReview || {})
    const [ editReview, setEditReview ] = useState(!existingReview)
    const [ selectedFile, setSelectedFile ] = useState(null)
    const [ errors, setErrors ] = useState(null)

    useEffect(() => {
        if(existingReview) setAddReview(existingReview)
    }, [existingReview])

    const changeHandler = (e, newRating) => {
        if(e){
            const { name, value, files } = e.target
            if(name === 'reviewImage') setSelectedFile(files[0])
            else setAddReview((prev) => ({...prev, [name]: name === 'rating'? Number(value): value}))
        }
        else setAddReview((prev) => ({...prev, value: newRating}))
    }
    
    const modalHandler = async(confirmed) => {
        if(confirmed){
            let imageUrl = addReview.imageUrl
            let folder = 'review_images'
            let previousImageUrl = existingReview? existingReview.imageUrl: null
            if(selectedFile){
                const imageFormData = new FormData()
                imageFormData.append('image', selectedFile)
                imageFormData.append('folder', folder)
                try {
                    const imageResponse = await fetch('http://localhost:3000/upload-image', {
                        method: 'POST',
                        headers: {
                            'Authorization': token? `Bearer ${token}`: ''
                        },
                        body: imageFormData
                    })
                    if(!imageResponse.ok){
                        throw new Error("Can't save imageFormData, try again later")
                    }
                    const imageResult = await imageResponse.json()
                    imageUrl = imageResult.imageUrl
                    if(previousImageUrl){
                    //Splitting along '/'
                    const urlParts = previousImageUrl.split('/');
                    //PublicId with file extension
                    let publicIdWithExtension = urlParts.pop(); 
                    //Removing file extension
                    const publicId = publicIdWithExtension.split('.').slice(0, -1).join('.');
                        await fetch('http://localhost:3000/delete-image', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': token? `Bearer ${token}`: ''
                            },
                            body: JSON.stringify({ public_id: publicId })
                        })
                    }
                }
                catch(err) {
                    console.log(err)
                    return
                }
            }
            const reviews = {
                rating: addReview.rating,
                comments: addReview.comments,
                restaurant: restaurantId,
                imageUrl
            }
            let url = `http://localhost:3000/review/${existingReview? existingReview._id: orderId}`
            let method = existingReview? 'PATCH': 'POST'
            let response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token? `Bearer ${token}`: ''
                },
                body: JSON.stringify(reviews)
            })
            const result = await response.json()
            if(!response.ok){
                if(response.status === 401){
                   const refreshResponse = await fetchRefreshToken()
                        if(refreshResponse){
                            response = await fetch(url, {
                            method,
                            headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${refreshResponse.accessToken}`
                            },
                            body: JSON.stringify(reviews)
                            })
                            if(!response.ok){
                                const errorMessages = result.errors ? result.errors.map(err => err.msg) : [result.message];
                                setErrors(errorMessages);
                                return;                   }
                            else {
                                setErrors(["Session expired, try login"])
                            }
                        }
                        else {
                            setErrors(["Can't save review, try again later"])
                        }
                    }
                setAddReview(result.review)
                updateReview(orderId, result.review)
                setEditReview(false)
            }
            setAddReview(existingReview || {})
            setEditReview(!existingReview)
            ref.current.close()
        }
    }

    const closeErrorDialogHandler = () => {
        setErrors(null)
    }

    return (
    <dialog ref={ref} className="fixed z-10 inset-0 overflow-y-auto">
        {errors && <ErrorDialog errors={errors} onClose={closeErrorDialogHandler}/>}
        <div className="flex items-center justify-center">
            <div className="bg-white rounded-lg p-8">
                <Rating name="rating" value={addReview.rating || 0} onChange={(e, newRating) => changeHandler(e, newRating)} readOnly={!editReview}/>
                <textarea id="comments" type="text" name="comments" className="border p-2 w-full mb-4" placeholder="comments" onChange={changeHandler} value={addReview.comments || ""} readOnly={!editReview}/>
                {editReview? <input type="file" name="reviewImage" accept='image/*' className="border p-2 w-full mb-4" onChange={changeHandler} />: <img src={addReview.imageUrl} alt="Review" className="w-full h-auto max-h-64 object-contain rounded-lg mb-4" />}
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