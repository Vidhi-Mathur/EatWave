const foodTags = ['Vegan', 'Vegetarian', 'Non-Vegetarian', 'Spicy', 'Non-Spicy', 'Mild-Spicy']
export const AddMenuItems = ({item, idx, onChangeMenuItem, onRemoveMenuItem, isEditable}) => {
    const tagToggler = (currTag) => {
        //If already exist, remove, otherwise add
        const updatedTags =item.foodTags.includes(currTag)? item.foodTags.filter(t => t !== currTag): [currTag, ...item.foodTags]
        onChangeMenuItem({ target: { name: `foodTags-${idx}`, value: updatedTags }}, idx)
    }
    return (
        <div className="border rounded p-4 shadow mb-6">
            <h2 className="text-md font-semibold mb-2">Menu Item {idx + 1}</h2>
            <input className="border p-2 w-full mb-4" type="text" name={`name-${idx}`} value={item.name} onChange={(e) => onChangeMenuItem(e, idx)} placeholder="Name" readOnly={!isEditable}/>
            <input className="border p-2 w-full mb-4" type="text" name={`description-${idx}`} value={item.description} onChange={(e) => onChangeMenuItem(e, idx)} placeholder="Description" readOnly={!isEditable}/>
            <input className="border p-2 w-full mb-4" type="number" name={`price-${idx}`} value={item.price} onChange={(e) => onChangeMenuItem(e, idx)} placeholder="Price" readOnly={!isEditable} min={0} max={100000}/>
            <div>
                {foodTags.map(tag => (
                    <button key={tag} disabled={!isEditable} type="button"  className={`mr-2 mb-2 px-2 py-1 border rounded ${item.foodTags.includes(tag) ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`} onClick={() => tagToggler(tag)}>{tag} {item.foodTags.includes(tag) && <span>&times;</span>}</button>
                ))}
            </div>
            <button className="mt-2 py-2 px-4 bg-orange-400 text-white rounded-md hover:bg-orange-500 focus:outline-none focus:bg-orange-500" onClick={() => onRemoveMenuItem(idx)} disabled={!isEditable}>Remove</button>
        </div>
    )
}