import { useContext, useRef, useState } from 'react';
import TuneIcon from '@mui/icons-material/Tune';
import { cuisine } from '../restaurant-related/AddCuisine';
import { AuthContext } from '../../store/Auth-Context';

export const FilterDialog = ({ setRestaurants }) => { 
  const { token } = useContext(AuthContext)
  const [selectedSort, setselectedSort] = useState("Relevance (default)");
  const [activeFilter, setActiveFilter] = useState("Sort")
  const [cuisines, setCuisines] = useState([])
  const [ratings, setRatings] = useState([])
  const [preference, setPreference] = useState()
  const [costForTwo, setCostForTwo] = useState([])
 
  const sortChangeHandler = (e) => {
    setselectedSort(e.target.value);
  };

  const filterChangeHandler = (section) => {
    setActiveFilter(section)
  }

  const cuisinesHandler = (e) => {
    setCuisines(prevState => (
        prevState.includes(e.target.value)? prevState.filter(cuisine => cuisine !== e.target.value): [...prevState, e.target.value]
    ))
  }

  const ratingsHandler = (e) => {
    const value = parseInt(e.target.value, 10);
    setRatings(prevState => (
        prevState.includes(value)? prevState.filter(rating => rating !== value): [...prevState, value]
    ))
    console.log(ratings)
  }

  const preferenceHandler = (e) => {
    setPreference(e.target.value)
  }

  const costForTwoHandler = (e) => {
    setCostForTwo(prevState => (
        prevState.includes(e.target.value)? prevState.filter(cost => cost !== e.target.value): [...prevState, e.target.value]
    ))
  }

  const clearFiltersHandler = () => {
    setselectedSort("Relevance (default)");
    setCuisines([])
    setRatings([])
    costForTwo([])
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

    const applyHandler = async() => {
        let url, body;
        if(activeFilter === 'Sort'){
            if(selectedSort === "Relevance (default)") {
                url = "http://localhost:3000/restaurant/sort/default"
              }
              else if(selectedSort === "Ratings"){
                url = "http://localhost:3000/restaurant/sort/ratings"
              } 
              else if(selectedSort === "Cost: Low to High"){
                url = "http://localhost:3000/restaurant/sort/cost-low-to-high"
              } 
              else {
                url = "http://localhost:3000/restaurant/sort/cost-high-to-low"
              }
        }
        else if(activeFilter === "Cuisines"){
            url =  "http://localhost:3000/restaurant/filter/cuisines"
            body = JSON.stringify({ cuisines })
        }
        else if(activeFilter === "Ratings"){
            url = "http://localhost:3000/restaurant/filter/ratings"
            body = JSON.stringify({ ratings })
        }
        else if(url === "Food Preference"){
            url = "http://localhost:3000/restaurant/filter/preference"
            body = JSON.stringify({ preference })
        }
        else{
            url = "http://localhost:3000/restaurant/filter/cost-for-two"
            body = JSON.stringify({ costForTwo })
        }
        try {
            const options = {
                method: body? 'POST':  'GET',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': token ? `Bearer ${token}` : ''
                }
            }
            if(body){
                options.body = body
            }
            const response = await fetch(url, options)
            if(!response.ok){
               throw new Error("Can't apply filter, try again later")
            }
            const result = await response.json()
            console.log(result.restaurants)
            setRestaurants(result.restaurants)
            closeModalHandler()
            return result
          }
          catch(err) {
            console.log(err)
          }
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
                                <label className={`flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white ${selectedSort === sortOption ? selectedLabel : ''}`}>
                                    <input type="radio" className="peer hidden" value={sortOption} checked={selectedSort === sortOption} onChange={sortChangeHandler}/>
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
                                    <input type="checkbox" className="peer hidden" value={item} checked={cuisines.includes(item)} onClick={cuisinesHandler}/>
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
                                <label key={i} className='flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>
                                <input type="checkbox" className="peer hidden" value={i} onClick={ratingsHandler} checked={ratings.includes(i)}/>
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
                                    <input type="checkbox" className="peer hidden" value={item} onClick={preferenceHandler}/>
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
                                    <input type="checkbox" className="peer hidden" onClick={costForTwoHandler} checked={costForTwo.includes("Less than 300")} value="Less than 300"/>
                                    <span className={checkedBox}></span>
                                    Less than &#8377;300
                                </label>
                                <label className='flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>
                                    <input type="checkbox" className="peer hidden" onClick={costForTwoHandler} checked={costForTwo.includes("Between 300-600")} value="Between 300-600"/>
                                    <span className={checkedBox}></span>
                                    Between &#8377;300 - 600
                                </label>
                                <label className='flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>
                                    <input type="checkbox" className="peer hidden" onClick={costForTwoHandler} checked={costForTwo.includes("Greater than 600")} value="Greater than 600"/>
                                    <span className={checkedBox}></span>
                                    Greater than &#8377;600
                                </label>
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <div className='flex justify-end items-center border-t p-4 space-x-2 sticky bottom-0 bg-white'>
                    <button className="bg-orange-500 text-white py-2 px-4 rounded" onClick={clearFiltersHandler}>Clear All</button>
                    <button className="bg-orange-500 text-white py-2 px-4 rounded" onClick={applyHandler}>Apply</button>
                </div>
            </dialog>
        </div>
        </>
    )
}