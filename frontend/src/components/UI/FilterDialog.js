import { useRef, useState } from 'react';
import TuneIcon from '@mui/icons-material/Tune';
import { cuisine } from '../restaurant-related/AddCuisine';

export const FilterDialog = () => { 
  const [selected, setSelected] = useState("Relevance (default)");
  const [activeFilter, setActiveFilter] = useState("sort")

  const sortChangeHandler = (e) => {
    setSelected(e.target.value);
  };

  const filterChangeHandler = (section) => {
    setActiveFilter(section)
  }

  const checkedRadio = "peer-checked:bg-orange-500 peer-checked:border-transparent mr-2 w-3 h-3 inline-block rounded-full border border-gray-300";
  const checkedBox = "peer-checked:bg-orange-500 peer-checked:border-transparent mr-2 w-3 h-3 inline-block border border-gray-300";
  const selectedLabel = "peer-checked:text-black font-semibold"

    const dialog = useRef()

    const openModalHandler = () => {
        dialog.current.showModal()
    }

    const closeModalHandler = () => {
        dialog.current.close()
    }

    return (
        <>
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
                                <button className='text-left p-2 py-2 w-full' onClick={() => filterChangeHandler(section)}><li>{section}</li></button>
                            ))}
                        </ul>
                    </nav>
                    <div className='w-3/4 p-4'>
                        <div>
                            {activeFilter === 'Sort' && (
                            <>
                            <h2>SORT BY</h2>
                            {["Relevance (default)", "Ratings", "Cost: Low To High", "Cost: High To Low"].map((sortOption) => (
                                <label className={`flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white ${selected === sortOption ? selectedLabel : ''}`}>
                                    <input type="radio" className="peer hidden" value={sortOption} checked={selected === sortOption} onChange={sortChangeHandler}/>
                                    <span className={checkedRadio}></span>
                                    {sortOption}
                                </label>
                            ))}
                            </>
                            )}
                            {activeFilter === 'Cuisines' && (
                                <>
                                <h2>FILTER BY CUISINE</h2>
                                {cuisine.map((item, idx) => (
                                <label key={idx} className='flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>
                                    <input type="checkbox" className="peer hidden" value={item}/>
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
                                <label className='flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>
                                <input type="checkbox" className="peer hidden" />
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
                                <label key={idx} className='flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>
                                    <input type="checkbox" className="peer hidden" value={item}/>
                                    <span className={checkedBox}></span>
                                    {item}
                                </label>
                                ))}
                                </>
                            )}
                            {activeFilter === 'Cost For Two' && (
                                <>
                                <h2>FILTER BY COST FOR TWO</h2>
                                <label className='flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>
                                    <input type="checkbox" className="peer hidden" value="Less than 300"/>
                                    <span className={checkedBox}></span>
                                    Less than &#8377; 300
                                </label>
                                <label className='flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>
                                    <input type="checkbox" className="peer hidden" value="300-600"/>
                                    <span className={checkedBox}></span>
                                    &#8377; 300 - 600
                                </label>
                                <label className='flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>
                                    <input type="checkbox" className="peer hidden" value="Greater than 600"/>
                                    <span className={checkedBox}></span>
                                    Greater than &#8377; 600
                                </label>
                                </>
                            )}
                            <div className='absolute bottom-4 right-4'>
                            <button className="bg-orange-500 text-white py-2 px-3 rounded mr-2">Clear All</button>
                            <button className="bg-orange-500 text-white py-2 px-3 rounded">Apply</button>
                            </div>
                        </div>
                    </div>
                </div>
            </dialog>
        </div>
        </>
    )
}