import { useEffect, useState } from "react";
import SortIcon from '@mui/icons-material/Sort';
import { ErrorDialog } from "./ErrorDialog";
import { SortOptions } from "./SortOptions";
import { applyFilter } from "../../services/FilterService";

export const SortMenu = ({ setRestaurants }) => {
	const [showSort, setShowSort] = useState(false);
	const[errors, setErrors] = useState(null)
    const [selectedSort, setSelectedSort] = useState("Relevance (default)");

  	useEffect(() => {
        //To apply default when component mounts
        applyHandler({ sort: "Relevance (default)" });
  	}, [])   

      const closeErrorDialogHandler = () => {
    	setErrors(null)
  	}

  	const toggleSort = () => {
  	  setShowSort((prevState) => !prevState);
  	};

  	const applyHandler = async (filterCriteria) => {
        const result = await applyFilter(filterCriteria);
        setShowSort(false);
        if(result.error) {
            setErrors(Array.isArray(result.error) ? result.error : [result.error]);
            return
        }
        else {
            setRestaurants(result.restaurants);
            setSelectedSort(filterCriteria.sort);
        }
    };

    const handleSortChange = (sortedType) => {
        applyHandler({ sort: sortedType });
    };

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
                  <SortOptions onSortChange={handleSortChange} initialSort={selectedSort} showApplyButton={true} styling={menuStyling}/>
              </div>
            )}
        </div>
      </>
    );
};