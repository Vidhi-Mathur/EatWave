import { useEffect, useState } from "react";
import SortIcon from '@mui/icons-material/Sort';
import { ErrorDialog } from "./ErrorDialog";
import { SortOptions } from "./SortOptions";

export const SortMenu = ({ setRestaurants }) => {
	const [showSort, setShowSort] = useState(false);
	const[errors, setErrors] = useState(null)
    const [selectedSort, setSelectedSort] = useState("Relevance (default)");

  	useEffect(() => {
        //To apply default when component mounts
    	fetchSortedRestaurants("Relevance (default)")
  	}, [])   

      const closeErrorDialogHandler = () => {
    	setErrors(null)
  	}

  	const toggleSort = () => {
  	  setShowSort((prevState) => !prevState);
  	};

  	const fetchSortedRestaurants = async(sortedType) => {
  	  	let url = getSortUrl(sortedType)
  	  	try {
  	  	  	const response = await fetch(url, {
  	  	    	method: 'GET',
  	  	    	headers: {
  	  	    	  'Content-Type': 'application/json'
  	  	    	}
  	  	  })
  	  	  	const result = await response.json()
  	  	 		if (!response.ok) {
  	  	  	  	const errorMessages = result.errors ? result.errors.map(err => err.msg) : [result.message];
  	  	  	  	setShowSort(false)
  	  	  	  	setErrors(errorMessages);
  	  	  	  	return;
  	  	  	}
  	  	  	setRestaurants(result.restaurants)
            setSelectedSort(sortedType);
  	  	  	setShowSort(false)
  	  	  	return result
  	  	}
  	  	catch(err) {
			setErrors(err.message || "Failed sorting, try again later");
  	  	  	setShowSort(false)
  	  	}
  	}

    const getSortUrl = (sortedType) => {
        switch(sortedType){
            case "Relevance (default)": 
                return "http://localhost:3000/restaurant/sort/default"
            case "Ratings": 
                return "http://localhost:3000/restaurant/sort/ratings"

            case "Cost: Low To High": 
                return "http://localhost:3000/restaurant/sort/cost-low-to-high"

            case "Cost: High To Low": 
                return "http://localhost:3000/restaurant/sort/cost-high-to-low"
            default: 
                setErrors("Failed sorting, try again later");
        }
    }

    let menuStyling = {
        container: "py-2 text-sm text-gray-700",
        checkedRadio :"peer-checked:bg-orange-500 peer-checked:border-transparent mr-2 w-3 h-3 inline-block rounded-full border border-gray-300",
        selectedLabel: "peer-checked:text-black font-semibold",
        optionLabel: "flex items-center px-4 py-2 hover:bg-gray-100"
    }

    return (
      <>
        <div className="relative inline-block">
    		{errors && <ErrorDialog errors={errors} onClose={closeErrorDialogHandler}/>}
          <button className="mr-2 mb-2 px-2 py-1 border rounded bg-white shadow-md" onClick={toggleSort}>
            Sort By <SortIcon />
          </button>
          {showSort && (
            <div className="z-10 absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-48">
                <SortOptions onSortChange={fetchSortedRestaurants} initialSort={selectedSort} showApplyButton={true} styling={menuStyling}/>
            </div>
          )}
        </div>
      </>
    );
};
