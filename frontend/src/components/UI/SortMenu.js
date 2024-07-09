import { useEffect, useState } from "react";
import SortIcon from '@mui/icons-material/Sort';

export const SortMenu = ({ setRestaurants }) => {
  const [showSort, setShowSort] = useState(false);
  const [selected, setSelected] = useState("Relevance (default)");

  useEffect(() => {
    fetchSortedRestaurants("Relevance (default)")
  }, [])

  const toggleSort = () => {
    setShowSort((prevState) => !prevState);
  };

  const changeHandler = (e) => {
    setSelected(e.target.value);
  };

  const sortingHandler = () => {
    fetchSortedRestaurants(selected)
  }

  const fetchSortedRestaurants = async(sortedType) => {
  let url;
  if(sortedType === "Relevance (default)") {
    url = "http://localhost:3000/restaurant/sort/default"
  }
  else if(sortedType === "Ratings"){
    url = "http://localhost:3000/restaurant/sort/ratings"
  } 
  else if(sortedType === "Cost: Low To High"){
    url = "http://localhost:3000/restaurant/sort/cost-low-to-high"
  } 
  else if(sortedType === "Cost: High To Low"){
    url = "http://localhost:3000/restaurant/sort/cost-high-to-low"
  }
  else {
    throw new Error("Failed sorting, try again later")
  }
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    if(!response.ok){
      throw new Error("Can't sort, try again later")
    }
    const result = await response.json()
    setRestaurants(result.restaurants)
    setShowSort(false)
    return result
  }
  catch(err) {
    console.log(err)
  }
  }

  const checkedRadio = "peer-checked:bg-orange-500 peer-checked:border-transparent mr-2 w-3 h-3 inline-block rounded-full border border-gray-300";
  const selectedLabel = "peer-checked:text-black font-semibold"

  return (
    <>
      <div className="relative inline-block">
        <button className="mr-2 mb-2 px-2 py-1 border rounded bg-white shadow-md" onClick={toggleSort}>
          Sort By <SortIcon />
        </button>
        {showSort && (
          <div className="z-10 absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-48">
            <nav className="py-2 text-sm text-gray-700">
              {["Relevance (default)", "Ratings", "Cost: Low To High", "Cost: High To Low"].map((sortOption) => (
                <label key={sortOption} className={`flex items-center px-4 py-2 hover:bg-gray-100 ${selected === sortOption ? selectedLabel : ''}`}>
                  <input type="radio" className="peer hidden" value={sortOption} checked={selected === sortOption} onChange={changeHandler}/>
                  <span className={checkedRadio}></span>
                  {sortOption}
                </label>
              ))}
              <button className={`w-full text-left px-4 py-2 ${selected ? 'bg-orange-500 text-white hover:bg-orange-600' : 'hover:bg-gray-100'}`} onClick={sortingHandler} >
                Apply
              </button>
            </nav>
          </div>
        )}
      </div>
    </>
  );
};
