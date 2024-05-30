import { forwardRef, useState } from "react"

let cuisine = ["Afghan", "Central Asian", "Egyptian", "French", "German", "Indonesian", "Iranian", "Japanese", "Jordanian", "Korean", "Lebanese", "Lithuanian", "Malaysian", "Mauritian", "Moroccan", "Spanish", "Sri Lankan", "Swedish", "Thai", "Vietnamese", "Cafe", "Burgers", "Fast Food", "Keto", "Healthy Food", "North Eastern", "Oriental", "Home Food", "Barbecue", "Pastas", "Pizzas", "Snacks", "Bihari", "Thalis", "Mediterranean", "Mughlai", "Chaat", "Mexican", "Rajasthani", "Turkish", "European", "Pan-Asian", "Bengali", "South Indian", "Italian", "Punjabi", "Continental", "Desserts", "Lucknowi", "Kerala", "Tibetan", "Biryani", "Andhra", "Goan", "Chinese", "North Indian"
]

export const AddCuisine = forwardRef(({onSelectCuisine}, ref) => {
    const [selectedCuisine, setSelectedCuisine] = useState([])

    const cuisineToggler = (cuisine) => {
        (selectedCuisine.includes(cuisine)? setSelectedCuisine(selectedCuisine.filter(c => c !== cuisine)): setSelectedCuisine([cuisine, ...selectedCuisine]))
    }

    const modalHandler = (confirmed) => {
        if(confirmed) onSelectCuisine(selectedCuisine)
        ref.current.close()
    }

    return (
        <dialog ref={ref} className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center">
                <div className="bg-white rounded-lg p-8">
                    <h2 className="text-lg font-bold mb-4">Select Your Cuisine Type</h2>
                    <div className="grid grid-cols-8 gap-4">
                    {cuisine.map(cuisine => (
                        <button key={cuisine} type="button"  className={`mr-2 mb-2 px-2 py-1 border rounded ${selectedCuisine.includes(cuisine) ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`} onClick={() => cuisineToggler(cuisine)}>{cuisine} {selectedCuisine.includes(cuisine) && <span>&times;</span>}</button>
                    ))}
                    </div>
                    <div className="flex justify-end mt-8">
                        <button type="button" className="bg-red-500 text-white py-2 px-4 rounded mr-4" onClick={() => modalHandler(false)}>Close</button>
                        <button type="button" className="bg-orange-500 text-white py-2 px-4 rounded" onClick={() => modalHandler(true)}>Confirm</button>
                    </div>
                </div>
            </div>
        </dialog>
    )
})