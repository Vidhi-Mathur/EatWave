import { useState } from "react"

const foodTags = ['Vegan', 'Vegetarian', 'Non-Vegetarian', 'Spicy', 'Non-Spicy', 'Mild-Spicy']
export const AddMenuItems = ({item, idx, changeMenuItem, removeMenuItem}) => {
    const [selectedTags, setSelectedTags] = useState([])
    const tagToggler = (currTag) => {
        //If already exist, remove, otherwise add
        setSelectedTags((prevTags) => prevTags.includes(currTag)? prevTags.filter(t => t !== currTag): [currTag, ...prevTags])
    }
    return (
        <div className="border rounded p-4 shadow mb-6">
            <h2 className="text-md font-semibold mb-2">Menu Item {idx + 1}</h2>
            <input className="border p-2 w-full mb-4" type="text" name={`name-${idx}`} value={item.name} onChange={(e) => changeMenuItem(e, idx)} placeholder="Name"/>
            <input className="border p-2 w-full mb-4" type="text" name={`description-${idx}`} value={item.description} onChange={(e) => changeMenuItem(e, idx)} placeholder="Description"/>
            <input className="border p-2 w-full mb-4" type="text" name={`price-${idx}`} value={item.price} onChange={(e) => changeMenuItem(e, idx)} placeholder="Price"/>
            <div>
                {foodTags.map(tag => (
                    <button key={tag} type="button"  className={`mr-2 mb-2 px-2 py-1 border rounded ${selectedTags.includes(tag) ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`} onClick={() => tagToggler(tag)}>{tag} {selectedTags.includes(tag) && <span>&times;</span>}</button>
                ))}
            </div>
            <button className="mt-2 py-2 px-4 bg-orange-400 text-white rounded-md hover:bg-orange-500 focus:outline-none focus:bg-orange-500" onClick={() => removeMenuItem(idx)}>Remove</button>
        </div>
    )
}