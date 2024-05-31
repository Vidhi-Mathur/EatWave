import { useState, useRef, useContext } from 'react';
import { StepIndicator } from '../UI/StepIndicator';
import { AddMenuItems } from './AddMenuItems';
import { AddCuisine } from './AddCuisine';
import { AuthContext } from '../../store/Auth-Context';

let weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
let steps = ['Restaurant Information', 'Restaurant Documents', 'Menu Setup'];
export const AddRestaurant = () => {
  const {token, setToken} = useContext(AuthContext)
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({ working_days: [] });
  const [menuItems, setMenuItems] = useState([])
  const [cuisine, setCuisine] = useState([])
  const dialog = useRef()

  const nextHandler = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const backHandler = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const openModalHandler = () => {
    dialog.current.showModal()
  }

  const selectAllHandler = () => {
    setFormData(prevState => {
      if (prevState.working_days.length === weekdays.length) {
        return { ...prevState, working_days: [] };
      } else {
        return { ...prevState, working_days: weekdays };
      }
    });
  };

  const generateMenuItems = () => {
    return { name: '', description: '', price: 0, tags: [] }
  }

  const addMenuItemHandler = () => {
    setMenuItems(prevMenuItems => [...prevMenuItems, generateMenuItems()])
  }

  const removeMenuItemHandler = (idx) => {
    const updatedItems = menuItems.filter((_,i) => i !== idx)
    setMenuItems(updatedItems)
  }
  
  const changeMenuItemHandler = (e, idx) => {
    const { name, value } = e.target;
    const updatedItems = [...menuItems];
    const field = name.split('-')[0];
    updatedItems[idx][field] = value;
    setMenuItems(updatedItems);
  }

  const cuisineHandler = (receivedCuisine) => {
    setCuisine(receivedCuisine)
  }

  const removeCuisineHandler = (receivedCuisine) => {
    setCuisine(cuisine.filter(c => c !== receivedCuisine))
  }

  const saveMenuHandler = async() => {
    try {
      const response = await fetch('http://localhost:3000/restaurant/menu/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : ''
        },
        body: JSON.stringify({items: menuItems})
      })
      if(!response.ok){
         throw new Error("Can't save menu, try again later")
      }
      const result = await response.json()
      setToken(result.token)
      return result
    }
    catch(err) {
      console.log(err)
    }
  }

  const changeHandler = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox' && name === 'working_days') {
      setFormData(prevState => {
        if (checked) return { ...prevState, working_days: [...prevState.working_days, value] };
        else return { ...prevState, working_days: prevState.working_days.filter(day => day !== value) };
      });
    } else if (!name.startsWith('name-') || !name.startsWith('description-') || !name.startsWith('price-') || !name.startsWith('tags-')) {
      setFormData({ ...formData, [name]: value });
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const filteredFormData = Object.fromEntries(
      Object.entries(formData).filter(
        ([key]) => !key.startsWith('name-') && !key.startsWith('description-') && !key.startsWith('price-')
      )
    );
    const finalData = { ...filteredFormData, menu_items: menuItems, cuisine_items: cuisine };
    console.log(finalData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center mt-4 mb-4">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-4xl">
        <div className="flex">
          <StepIndicator steps={steps} currentStep={currentStep} />
          <div className="w-3/4 p-4">
            <form onChange={changeHandler} onSubmit={submitHandler} className="space-y-4">
            {[...Array(steps.length)].map((_, index) => (
              <div key={index} className={currentStep === index ? '' : 'hidden'}>
                {index === 0 && (
                  <>
                    <h1 className='text-2xl font-bold'>Restaurant Information</h1>
                    <div className="border rounded p-4 shadow mb-6">
                      <h1 className="text-md font-semibold mb-2">Basic Details</h1>
                      <input type="text" name="owner" className="border p-2 w-full mb-4" placeholder="Owner's Full Name" />
                      <input type="text" name="restaurant" className="border p-2 w-full mb-4" placeholder="Restaurant's Name"  />
                      {/* Later - ToDo add location*/}
                      <button type="button" className="text-orange-500 mb-4">Add Restaurant Location</button>
                    </div>
                    <div className="border rounded p-4 shadow mb-6">
                      <h1 className="text-md font-semibold mb-2">Owner Contact Details</h1>
                      <input type="email" name="email" className="border p-2 w-full mb-4" placeholder="Email Address" />
                      <input type="text" name="phone" className="border p-2 w-full mb-4" placeholder="Phone Number" />
                    </div>
                    <div className="border rounded p-4 shadow mb-6">
                      <div className='flex items-center justify-between mb-2'>
                        <h1 className="text-md font-semibold">Working Days</h1>
                        <button type="button" className="text-orange-500" onClick={selectAllHandler}>Select All</button>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {weekdays.map(day => (
                          <div key={day} className="flex items-center">
                            <input type="checkbox" id={day.toLowerCase()} checked={formData.working_days.includes(day)} name="working_days" value={day} className="mr-2" />
                            <label htmlFor={day.toLowerCase()}>{day}</label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="border rounded p-4 shadow mb-6">
                      <h1 className="text-md font-semibold mb-2">Opening and Closing Time</h1>
                      <div className="mt-4">
                        {/* Later - ToDo make additional slots available*/}
                        <label className="block mb-2">Opening Time</label>
                        <input type="time" name="opening_time" className="border p-2 w-full mb-4" />
                        <label className="block mb-2">Closing Time</label>
                        <input type="time" name="closing_time" className="border p-2 w-full mb-4" />
                      </div>
                      <p>Opening and Closing Time remains same on all working days</p>
                    </div>
                  </>
                )}
                {index === 1 && (
                  <>
                    <h1 className='text-2xl font-bold'>Restaurant Documents</h1>
                    <div className="border rounded p-4 shadow mb-6">
                      <h1 className="text-md font-semibold mb-2">Official Bank Details</h1>
                      <p className='mb-2'>Payments from EatWave will be credited here</p>
                      <input type="text" name="account" className="border p-2 w-full mb-4" placeholder="Bank Account number" />
                    </div>
                    <div className="border rounded p-4 shadow">
                      <h1 className="text-md font-semibold">FSSAI certificate</h1>
                      <input type="number" name="fssai" className="border p-2 w-full mb-4" placeholder="FSSAI certificate number" />
                    </div>
                  </>
                )}
                {index === 2 && (
                  <>
                    <h1 className='text-2xl font-bold'>Menu Setup</h1>
                    <div className="border rounded p-4 shadow mb-6">
                      <h1 className="text-md font-semibold mb-2">What Kind of food is on your menu?</h1>
                      <div className="flex items-center mb-4">
                        <input type="radio" id="veg" name="food_option" value="veg" className="mr-2" />
                        <label htmlFor="veg">Veg only</label>
                      </div>
                      <div className="flex items-center">
                        <input type="radio" id="both_food" name="food_option" value="both_food" className="mr-2" />
                        <label htmlFor="both_food">Both Veg & Non-veg</label>
                      </div>
                      <hr className="my-4" />
                      <div>
                        <h2 className="text-md font-semibold mb-2">Add cuisines that you serve</h2>
                        {cuisine.map((cuisineItem, idx) => (
                            <button key={idx} type="button"  className='mr-2 mb-2 px-2 py-1 border rounded bg-green-500 text-white' onClick={() => removeCuisineHandler(cuisineItem)}>{cuisineItem} <span>&times;</span></button>
                        ))}
                        <AddCuisine ref={dialog} onSelectCuisine={cuisineHandler}/>
                        <button type="button" className="text-orange-500 mb-4" onClick={openModalHandler}>+ Add More</button>
                      </div>
                    </div>
                    <div className="border rounded p-4 shadow mb-6">
                    <h3 className="text-md font-semibold mb-2">Add your menu</h3>
                    {menuItems.map((item, idx) => (
                      <AddMenuItems key={idx} idx={idx} item={item} onChangeMenuItem={changeMenuItemHandler} onRemoveMenuItem={removeMenuItemHandler}/>
                    ))}
                    <button type="button" className="text-orange-500 mb-4 mr-4" onClick={addMenuItemHandler}>+ Add More</button>
                    {menuItems.length > 0 && <button type="button" className="bg-orange-500 text-white py-2 px-4 rounded" onClick={saveMenuHandler}>Save Menu</button>}
                    </div>
                    <div className="border rounded p-4 shadow mb-6">
                    <h3 className="text-md font-semibold mb-2">Packaging Charges</h3>
                    <p className="mb-4">Not applicable on Indian Breads, packaged items, and beverages</p>
                    <input type="number" id="packaging_cost" name="packaging_cost" placeholder="Rs." className="border p-2 w-full mb-4" />
                    </div>
                  </>
                )}
              </div>
            ))}
            <div className="flex justify-between">
              {currentStep > 0 && (
                <button type="button" onClick={backHandler} className="bg-gray-500 text-white py-2 px-4 rounded">Back</button>
              )}
              {currentStep < steps.length - 1 && (
                <button type="button" onClick={nextHandler} className="bg-orange-500 text-white py-2 px-4 rounded">Proceed</button>
              )}
              {currentStep === steps.length - 1 && (
                <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded">Submit</button>
              )}
            </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};