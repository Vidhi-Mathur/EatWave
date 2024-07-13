import { useState, useRef, useContext } from 'react';
import { StepIndicator } from '../UI/StepIndicator';
import { AddMenuItems } from './AddMenuItems';
import { AddCuisine } from './AddCuisine';
import { AuthContext } from '../../store/Auth-Context';
import { ErrorDialog } from '../UI/ErrorDialog';

let weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
let steps = ['Restaurant Information', 'Restaurant Documents', 'Menu Setup'];
export const AddRestaurant = () => {
  const {token, fetchRefreshToken} = useContext(AuthContext)
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({ working_days: [], menuItems: [], restaurantImages: [] });
  const [cuisine, setCuisine] = useState([])
  const [menuId, setMenuId] = useState()
  const [isEditable, setIsEditable] = useState(true)
  const [error, setError] = useState(null)
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
    return { name: '', description: '', price: 0, foodTags: [] }
  }

  const addMenuItemHandler = () => {
    setFormData(prevState => ({
      ...prevState,
      menuItems: [...prevState.menuItems, generateMenuItems()]
    }))
  }

  const removeMenuItemHandler = (idx) => {
    setFormData(prevState => ({
      ...prevState,
      menuItems: prevState.menuItems.filter((_,i) => i !== idx)
    }))
  }

  const removeImageHandler = (idx) => {
    setFormData(prevState => ({
      ...prevState,
      restaurantImages: prevState.restaurantImages.filter((_, i) => i !== idx)
    }))
  }
  
  const changeMenuItemHandler = (e, idx) => {
    const { name, value } = e.target;
    const field = name.split('-')[0];
    setFormData(prevState => {
      const updatedItems = [...prevState.menuItems]
      updatedItems[idx][field] = value
      return { ...prevState, menuItems: updatedItems }
    })
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
        body: JSON.stringify({items: formData.menuItems})
      })
      const result = await response.json()
      if(!response.ok){
        setError(result.message)
        return
      }
      //To include _id too
      setFormData(prevState => ({
        ...prevState,
        menuItems: result.menu.items
      }));
      setMenuId(result.menu._id)
      setIsEditable(false)
      return result
    }
    catch(err) {
      setError("Can't save menu, try again later")
    }
  }

  const editMenuHandler = async() => {
    try {
      const response = await fetch(`http://localhost:3000/restaurant/menu/${menuId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : ''
        },
        body: JSON.stringify({items: formData.menuItems})
      })
      const result = await response.json()
      if(!response.ok){
        setError(result.message)
        return
      }
      setIsEditable(false)
      return result
    }
    catch(err) {
      setError("Can't edit menu, try again later")
    }
  }

  const uploadImageHandler = async(files, folder) => {
    try {
      const imageFormData = new FormData();
      for (let i = 0; i < files.length; i++) {
        imageFormData.append('images', files[i]);
      }
      imageFormData.append('folder', folder);
      const imageResponse = await fetch('http://localhost:3000/upload-image', {
        method: 'POST',
        headers: {
          'Authorization': token ? `Bearer ${token}` : ''
        },
        body: imageFormData
      });
      if (!imageResponse.ok) {
        throw new Error("Can't save image, try again later");
      }
      const imageResult = await imageResponse.json();
      return imageResult.imageUrls; 
    } 
    catch (err) {
      console.log(err); 
    }
  }
  

  const changeHandler = async(e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'checkbox' && name === 'working_days') {
      setFormData(prevState => {
        if (checked) return { ...prevState, working_days: [...prevState.working_days, value] };
        else return { ...prevState, working_days: prevState.working_days.filter(day => day !== value) };
      });
    } 
    else if(name.startsWith('address.')) {
      const addressField = name.split('.')[1]
      setFormData(prevState => ({
        ...prevState,
        address: {
          ...prevState.address,
          [addressField]: value
        }
      }))
    }
    else if (type === 'file' && name === 'restaurantImages') {
      if (files.length > 0) {
        setFormData(prevState => ({
          ...prevState,
          restaurantImages: [...prevState.restaurantImages, ...Array.from(files)]
        }));
      }
    }
    else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const submitHandler = async(e) => {
    e.preventDefault();
    let imageUrls = [];
    if (formData.restaurantImages.length > 0) {
      let folder = 'restaurant_images';
      imageUrls = await uploadImageHandler(formData.restaurantImages, folder);
    }
    const filteredData = Object.fromEntries(
      Object.entries(formData).filter(
        ([key]) => !key.startsWith('name-') && !key.startsWith('description-') && !key.startsWith('price-')
      )
    );
    const restaurantData = { 
      restaurantName: filteredData.restaurant,
      ownerName: filteredData.owner,
      phone: filteredData.phone, 
      email: filteredData.email, 
      address: filteredData.address, 
      openingTime: filteredData.opening_time, 
      closingTime: filteredData.closing_time,
      workingDays: filteredData.working_days, 
      menu: menuId,
      packagingCharges: filteredData.packaging_cost,
      accountNumber: filteredData.account,
      fssai: filteredData.fssai, 
      foodType: filteredData.food_option,
      costForTwo: filteredData.cost_for_two,
      cuisine,
      imageUrls
      };
    try {
      let response = await fetch('http://localhost:3000/restaurant/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : ''
        },
        body: JSON.stringify(restaurantData)
      })
      if(!response.ok){
        if(response.status === 401) {
            const refreshResponse = await fetchRefreshToken()
            if(refreshResponse){
                response = await fetch('http://localhost:3000/restaurant/new', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${refreshResponse.accessToken}`
                  },
                  body: JSON.stringify(restaurantData)
                });
                if(!response.ok) {
                    throw new Error("Can't save restaurant, try again later")
                }
            }
            else {
                throw new Error("Session expired, try again later")
            }
        }
        else {
            throw new Error("Can't save restaurant, try again later")
        }
     }
     const result = await response.json()
     return result
    }
    catch(err) {
      console.log(err)
    }
  };

  const closeErrorDialogHandler = () => {
    setError(null)
  }

  return (
    <div className="min-h-screen flex items-center justify-center mt-4 mb-4">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-4xl">
        <div className="flex">
          <StepIndicator steps={steps} currentStep={currentStep} />
          <div className="w-3/4 p-4">
            <form onChange={changeHandler} onSubmit={submitHandler} className="space-y-4">
            {[...Array(steps.length)].map((_, index) => {
                return (
                  <>
                    {error && <ErrorDialog error={error} onClose={closeErrorDialogHandler}/>}
                    <div key={index} className={currentStep === index ? '' : 'hidden'}>
                      {index === 0 && (
                        <>
                          <h1 className='text-2xl font-bold'>Restaurant Information</h1>
                          <div className="border rounded p-4 shadow mb-6">
                            <h1 className="text-md font-semibold mb-2">Basic Details</h1>
                            <input type="text" name="owner" className="border p-2 w-full mb-4" placeholder="Owner's Full Name" />
                            <input type="text" name="restaurant" className="border p-2 w-full mb-4" placeholder="Restaurant's Name"  />
                            {/* Later - ToDo add location*/}
                            <h1 className="text-md font-semibold mb-2">Address</h1>
                            <input type="text" name="address.street" className="border p-2 w-full mb-2" placeholder="Street" />
                            <input type="text" name="address.city" className="border p-2 w-full mb-2" placeholder="City" />
                            <input type="text" name="address.state" className="border p-2 w-full mb-2" placeholder="State" />
                            <input type="number" name="address.postalCode" className="border p-2 w-full mb-2" placeholder="Postal Code" />
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
                          <div className='border rounded p-4 shadow mb-6'>
                            <h1 className="text-md font-semibold mb-2">Restaurant Images</h1>
                              <input type='file' name="restaurantImages" accept='image/*' className="border p-2 w-full mb-4" multiple/>
                                {formData.restaurantImages.length > 0 && (
                                  <div className="mt-4">
                                    <h2 className="text-md font-semibold mb-2">Preview</h2>
                                    <div className="flex flex-wrap gap-2">
                                      {formData.restaurantImages.map((image, idx) => (
                                        <div key={idx} className='relative w-32 h-32'>
                                          <img src={URL.createObjectURL(image)} alt={`Restaurant ${idx + 1}`} className="w-full h-full object-cover rounded border" />
                                          <button className='absolute right-1 top-1 w-6 h-6 flex items-center justify-center rounded-md bg-red-500 text-white font-bold text-sm cursor-pointer' onClick={() => removeImageHandler(idx)}>x</button>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
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
                              <input type="radio" id="Veg" name="food_option" value="Veg" className="mr-2" />
                              <label htmlFor="Veg">Veg only</label>
                            </div>
                            <div className="flex items-center">
                              <input type="radio" id="Both" name="food_option" value="Both" className="mr-2" />
                              <label htmlFor="Both">Both Veg & Non-veg</label>
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
                            <h3 className="text-md font-semibold mb-2">Cost For Two</h3>
                            <input type="number" id="cost_for_two" name="cost_for_two" placeholder=" &#8377;" className="border p-2 w-full mb-4" />
                          </div>
                          <div className="border rounded p-4 shadow mb-6">
                          <h3 className="text-md font-semibold mb-2">Add your menu</h3>
                          {formData.menuItems.map((item, idx) => (
                            <AddMenuItems key={idx} idx={idx} item={item} onChangeMenuItem={changeMenuItemHandler} onRemoveMenuItem={removeMenuItemHandler} isEditable={isEditable}/>
                          ))}
                          <button type="button" className="text-orange-500 mb-4 mr-4" onClick={addMenuItemHandler}>+ Add More</button>
                          {isEditable ? formData.menuItems.length > 0 && (
                            <>
                            <button type="button" className="bg-green-500 text-white py-2 px-4 rounded mr-4" onClick={menuId ? editMenuHandler : saveMenuHandler}>Save Menu</button>
                            {menuId && <button type="button" className="bg-red-500 text-white py-2 px-4 rounded" onClick={() => setIsEditable(false)}>Cancel</button>}
                            </>
                          ): formData.menuItems.length > 0 && (
                          <button type="button" className="bg-orange-500 text-white py-2 px-4 rounded" onClick={() => setIsEditable(true)}>
                              Edit Menu
                          </button>
                          )}
                          </div>
                          <div className="border rounded p-4 shadow mb-6">
                          <h3 className="text-md font-semibold mb-2">Packaging Charges</h3>
                          <p className="mb-4">Not applicable on Indian Breads, packaged items, and beverages</p>
                          <input type="number" id="packaging_cost" name="packaging_cost" placeholder=" &#8377;" className="border p-2 w-full mb-4" />
                          </div>
                        </>
                      )}
                    </div>
                  </>
                )
              })}
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