import { useState } from "react";
import SortIcon from '@mui/icons-material/Sort';

export const SortMenu = () => {
  const [showSort, setShowSort] = useState(false);
  const [selected, setSelected] = useState("Relevance (default)");

  const toggleSort = () => {
    setShowSort((prevState) => !prevState);
  };

  const changeHandler = (e) => {
    setSelected(e.target.value);
  };

  const checkedRadio = "peer-checked:bg-orange-500 peer-checked:border-transparent mr-2 w-3 h-3 inline-block rounded-full border border-gray-300";
  const selectedLabel = "peer-checked:text-black font-semibold"

  return (
    <>
      <div className="relative inline-block">
        <button className="mr-2 mb-2 px-2 py-1 border rounded bg-white shadow-md" onClick={toggleSort}>
          Sort By <SortIcon />
        </button>
        {showSort && (
          <div className="z-10 absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-48 dark:bg-gray-700">
            <nav className="py-2 text-sm text-gray-700 dark:text-gray-200">
              <label className={`flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white ${selected === "Relevance (default)" ? selectedLabel : ''}`}>
                <input type="radio" className="peer hidden" value="Relevance (default)" checked={selected === "Relevance (default)"} onChange={changeHandler}/>
                <span className={checkedRadio}></span>
                Relevance (default)
              </label>
              <label className={`flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white ${selected === "Delivery Time" ? selectedLabel : ''}`}>
                <input type="radio" className="peer hidden" value="Delivery Time" checked={selected === "Delivery Time"} onChange={changeHandler}/>
                <span className={checkedRadio}></span>
                Delivery Time
              </label>
              <label className={`flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white ${selected === "Cost: Low To High" ? selectedLabel : ''}`}>
                <input type="radio" className="peer hidden" value="Cost: Low To High" checked={selected === "Cost: Low To High"} onChange={changeHandler}/>
                <span className={checkedRadio}></span>
                Cost: Low to High
              </label>
              <label className={`flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white ${selected === "Cost: High To Low" ? selectedLabel : ''}`}>
                <input type="radio" className="peer hidden" value="Cost: High To Low" checked={selected === "Cost: High To Low"} onChange={changeHandler}/>
                <span className={checkedRadio}></span>
                Cost: High to Low
              </label>
              <button className={`w-full text-left px-4 py-2 
    ${selected ? 'bg-orange-500 text-white hover:bg-orange-600' : 'hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'}`}>
                Apply
              </button>
            </nav>
          </div>
        )}
      </div>
    </>
  );
};
