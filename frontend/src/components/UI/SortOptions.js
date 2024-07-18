import { useEffect, useState } from "react";

export const SortOptions = ({ onSortChange, initialSort, styling, showApplyButton}) => {
    const [selectedSort, setSelectedSort] = useState(initialSort)
    const sortOptions = [ "Relevance (default)", "Ratings", "Cost: Low To High", "Cost: High To Low"]

    useEffect(() => {
        if(!showApplyButton) onSortChange(selectedSort)
    }, [showApplyButton, selectedSort, onSortChange])

    const sortChangeHandler = (e) => {
        setSelectedSort(e.target.value)
    }

    const sortApplyHandler = () => {
        onSortChange(selectedSort)
    }

    const { checkedRadio, selectedLabel, container, optionLabel } = styling

    return (
        <div className={container || ''}>
            {sortOptions.map((sortOption) => (
                <label key={sortOption} className={`${optionLabel} ${selectedSort === sortOption ? selectedLabel : ''}`}>
                  <input type="radio" className="peer hidden" value={sortOption} checked={selectedSort === sortOption} onChange={sortChangeHandler}/>
                  <span className={checkedRadio}></span>
                  {sortOption}
                </label>
              ))}
               {showApplyButton && (
                <button className='w-full text-left px-4 py-2 bg-orange-500 text-white hover:bg-orange-600' onClick={sortApplyHandler} >
                Apply
              </button>
               )}
        </div>
    )
}