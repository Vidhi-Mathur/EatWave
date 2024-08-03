import { useCallback, useRef, useState } from 'react';
import TuneIcon from '@mui/icons-material/Tune';
import { cuisine } from '../restaurant-related/AddCuisine';
import { ErrorDialog } from './ErrorDialog';
import { SortOptions } from './SortOptions';
import { applyFilter } from '../../services/FilterService';

export const FilterDialog = ({ setRestaurants }) => { 
    const dialog = useRef()
    const [activeFilter, setActiveFilter] = useState("Sort")
    const [filters, setFilters] = useState({
        sort: "Relevance (default)",
        cuisines: [],
        ratings: [],
        //To prevent validation error on backend
        preference: undefined,
        costForTwo: []
    })
    const [errors, setErrors] = useState(null)

    const activeFilterChangeHandler = (section) => {
        setActiveFilter(section)
    }

    const filterChangeHandler = useCallback((type, value) => {
        setFilters(prevFilters => {
            if(type === 'sort' || type === 'preference'){
                return { ...prevFilters, [type]: value };
            }
            if(type === 'cuisines' || type === 'ratings' || type === 'costForTwo'){
                let updateArray = prevFilters[type].includes(value)? prevFilters[type].filter(item => item !== value): [...prevFilters[type], value]
                return { ...prevFilters, [type]: updateArray }
            }
            return prevFilters
        });
    }, []);

    const clearFiltersHandler = () => {
        setFilters({
            sort: "Relevance (default)",
            cuisines: [],
            ratings: [],
            preference: undefined,
            costForTwo: []
        })
    }


    const openModalHandler = () => {
        dialog.current.showModal()
    }

    const closeModalHandler = () => {
        dialog.current.close()
    }

    const closeErrorDialogHandler = () => {
        setErrors(null)
    }

    const applyHandler = async() => {
        const result = await applyFilter(filters);
        closeModalHandler();
        if (result.error) {
            setErrors(Array.isArray(result.error) ? result.error : [result.error]);
            return
        } 
        else {
            setRestaurants(result.restaurants);
        }
    };

    let checkedRadio = "peer-checked:bg-orange-500 peer-checked:border-transparent mr-2 w-3 h-3 inline-block rounded-full border border-gray-300"
    let checkedBox = "peer-checked:bg-orange-500 peer-checked:border-transparent mr-2 w-3 h-3 inline-block border border-gray-300"

    const menuStyling = {
        checkedRadio: checkedRadio,
        checkedBox: checkedBox,
        selectedLabel: "peer-checked:text-black font-semibold",
        optionLabel: "flex items-center px-4 py-2 hover:bg-gray-100"
    }

    return (
        <>
        {errors && <ErrorDialog errors={errors} onClose={closeErrorDialogHandler}/>}
        <button className="mr-2 mb-2 px-3 py-1 border rounded bg-white shadow-md mt-6" onClick={openModalHandler}>
            Filter <TuneIcon />
        </button>
        <div className="flex justify-center items-center">
            <dialog ref={dialog} className='justify-center items-center z-10 rounded-md overflow-y-scroll h-[400px] w-[900px]'>
                <div className='flex items-center justify-between'>
                    <h2 className='text-xl font-bold ml-2 mt-1'>Filter</h2>
                    <button onClick={closeModalHandler} className='rounded-full bg-white text-gray-800 text-4xl shadow-md'>&times;</button>
                </div>
                <hr className='my-2 border-gray-300' />
                <div className='flex'>
                    <nav className='w-1/4 border-r'>
                        <ul>
                            {['Sort', 'Cuisines', 'Ratings', 'Food Preference', 'Cost For Two'].map((section) => (
                                <button key={section} className='text-left p-2 py-2 w-full' onClick={() => activeFilterChangeHandler(section)}><li>{section}</li></button>
                            ))}
                        </ul>
                    </nav>
                    <div className='w-3/4 p-4'>
                        <div>
                            {activeFilter === 'Sort' && (
                            <>
                            <h2>SORT BY</h2>
                            <SortOptions onSortChange={(value) => filterChangeHandler('sort', value)} initialSort={filters.sort} showApplyButton={false} styling={menuStyling}/>
                            </>
                            )}
                            {activeFilter === 'Cuisines' && (
                                <>
                                <h2>FILTER BY CUISINE</h2>
                                {cuisine.map((item, idx) => (
                                <label key={idx} className='flex items-center px-4 py-2 hover:bg-gray-100'>
                                    <input type="checkbox" className="peer hidden" value={item} checked={filters.cuisines.includes(item)} onChange={() => filterChangeHandler('cuisines', item)}/>
                                    <span className={checkedBox}></span>
                                    {item}
                                </label>
                                ))}
                                </>
                            )}
                            {activeFilter === 'Ratings' && (
                                <>
                                <h2>FILTER BY RATINGS</h2>
                                {[4, 3, 2].map((i) => (
                                <label key={i} className='flex items-center px-4 py-2 hover:bg-gray-100'>
                                <input type="checkbox" className="peer hidden" value={i} checked={filters.ratings.includes(i)} onChange={() => filterChangeHandler('ratings', i)}/>
                                <span className={checkedBox}></span>
                                {`Rating ${i}+`}
                                </label>
                                ))}
                                </>
                            )}
                            {activeFilter === 'Food Preference' && (
                                <>
                                <h2>FILTER BY FOOD PREFERENCE</h2>
                                {['Veg', 'Non-Veg'].map((item, idx) => (
                                <label key={idx} className='flex items-center px-4 py-2 hover:bg-gray-100'>
                                    <input type="radio" className="peer hidden" value={item} onChange={() => filterChangeHandler('preference', item)} checked={filters.preference=== item} />
                                    <span className={checkedRadio}></span>
                                    {item}
                                </label>
                                ))}
                                </>
                            )}
                            {activeFilter === 'Cost For Two' && (
                                <>
                                <h2>FILTER BY COST FOR TWO</h2>
                                <label className='flex items-center px-4 py-2 hover:bg-gray-100'>
                                    <input type="checkbox" className="peer hidden" value="Less than 300" checked={filters.costForTwo.includes("Less than 300")} onChange={() => filterChangeHandler('costForTwo', "Less than 300")} />
                                    <span className={checkedBox}></span>
                                    Less than &#8377;300
                                </label>
                                <label className='flex items-center px-4 py-2 hover:bg-gray-100'>
                                    <input type="checkbox" className="peer hidden" value="Between 300-600" checked={filters.costForTwo.includes("Between 300-600")} onChange={() => filterChangeHandler('costForTwo', "Between 300-600")}/>
                                    <span className={checkedBox}></span>
                                    Between &#8377;300 - 600
                                </label>
                                <label className='flex items-center px-4 py-2 hover:bg-gray-100'>
                                    <input type="checkbox" className="peer hidden" value="Greater than 600" checked={filters.costForTwo.includes("Greater than 600")} onChange={() => filterChangeHandler('costForTwo', "Greater than 600")}/>
                                    <span className={checkedBox}></span>
                                    Greater than &#8377;600
                                </label>
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <div className='flex justify-end items-center border-t p-4 space-x-2 sticky bottom-0 bg-white'>
                    <button className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600" onClick={clearFiltersHandler}>Clear All</button>
                    <button className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600" onClick={applyHandler}>Apply</button>
                </div>
            </dialog>
        </div>
        </>
    )
}