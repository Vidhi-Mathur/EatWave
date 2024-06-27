import { useState } from "react"

export const Sort = () => {
    const [selected, setSelected] = useState("Relevance (default)")

    const changeHandler = (e) => {
        setSelected(e.target.value)
    }

    return (
        <div className="relative inline-block">
            <div className="z-auto absolute right-0 mt-6 bg-white divide-y divide-gray-100 rounded-lg shadow w-48 dark:bg-gray-700">
                <nav className="py-2">
                <label className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                    <input className="mr-2" type="radio" value="Relevance (default)" checked={selected === "Relevance (default)"} onChange={changeHandler}/>
                    Relevance (default)
                </label>
                <label className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                    <input className="mr-2" type="radio" value="Delivery Time" checked={selected === "Delivery Time"} onChange={changeHandler}/>
                    Delivery Time
                </label>
                <label className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                    <input className="mr-2" type="radio" value="Cost: Low To High" checked={selected === "Cost: Low To High"} onChange={changeHandler}/>
                    Cost: Low to High
                </label>
                <label className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                    <input className="mr-2" type="radio" value="Cost: High To Low" checked={selected === "Cost: High To Low"} onChange={changeHandler}/>
                    Cost: High to Low
                </label>
                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Apply</button>
                </nav>
            </div>
        </div>
    )
}