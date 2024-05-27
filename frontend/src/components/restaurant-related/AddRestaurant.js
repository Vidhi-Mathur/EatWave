import React, { useState } from 'react';
import { StepIndicator } from '../UI/StepIndicator';

export const AddRestaurant = () => {
  const steps = ['Restaurant Information', 'Restaurant Documents', 'Menu Setup'];
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({ working_days: [] });

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

  const changeHandler = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox' && name === 'working_days') {
      setFormData(prevState => {
        if (checked) return { ...prevState, working_days: [...prevState.working_days, value] };
        else return { ...prevState, working_days: prevState.working_days.filter(day => day !== value) };
      });
    } 
    else setFormData({ ...formData, [name]: value })
  };
  
  
  const submitHandler = (e) => {
    e.preventDefault();
    console.log({ ...formData });
  };

  return (
    <div className="min-h-screen flex items-center justify-center mt-4 mb-4">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-4xl">
        <div className="flex">
          <StepIndicator steps={steps} currentStep={currentStep} />
          <div className="w-3/4 p-4">
            <form onChange={changeHandler} onSubmit={submitHandler} className="space-y-4">
              {currentStep === 0 && (
                <>
                  <h1 className='text-2xl font-bold'>Restaurant Information</h1>
                  <div className="border rounded p-4 shadow mb-6">
                    <h1 className="text-md font-semibold mb-2">Basic Details</h1>
                    <input type="text" name="owner" className="border p-2 w-full mb-4" placeholder="Owner's Full Name" />
                    <input type="text" name="restaurant" className="border p-2 w-full mb-4" placeholder="Restaurant's Name"  />
                    <button type="button" className="text-orange-500 mb-4">Add Restaurant Location</button>
                  </div>
                  <div className="border rounded p-4 shadow mb-6">
                    <h1 className="text-md font-semibold mb-2">Owner Contact Details</h1>
                    <input type="email" name="email" className="border p-2 w-full mb-4" placeholder="Email Address" />
                    <input type="text" name="phone" className="border p-2 w-full mb-4" placeholder="Phone Number" />
                    <p>Provide your <strong>WhatsApp Number</strong> to get insights on ratings, menu etc.</p>
                    <div className="flex items-center mt-4 mb-4">
                      <input type="radio" id="same_whatsapp" name="whatsapp_option" value="same" className="mr-2" />
                      <label htmlFor="same_whatsapp">My WhatsApp Number is same as above</label>
                    </div>
                    <div className="flex items-center">
                      <input type="radio" id="different_whatsapp" name="whatsapp_option" value="different" className="mr-2" />
                      <label htmlFor="different_whatsapp">I have a different WhatsApp number</label>
                    </div>
                  </div>
                  <div className="border rounded p-4 shadow mb-6">
                    <h1 className="text-md font-semibold mb-2">Working Days</h1>
                    <button type="button" className="text-orange-500 mb-4">Select All</button>
                    <div className="grid grid-cols-2 gap-2">
                      {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                        <div key={day} className="flex items-center">
                          <input type="checkbox" id={day.toLowerCase()} name="working_days" value={day} className="mr-2" />
                          <label htmlFor={day.toLowerCase()}>{day}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="border rounded p-4 shadow mb-6">
                    <h1 className="text-md font-semibold mb-2">Opening and Closing Time</h1>
                    <div className="mt-4">
                      <label className="block mb-2">Opening Time</label>
                      <input type="time" name="opening_time" className="border p-2 w-full mb-4" />
                      <label className="block mb-2">Closing Time</label>
                      <input type="time" name="closing_time" className="border p-2 w-full mb-4" />
                    </div>
                    <p>Opening and Closing Time remains same on all working days</p>
                  </div>
                </>
              )}
              {currentStep === 1 && (
                <>
                  <h1 className='text-2xl font-bold'>Restaurant Documents</h1>
                  <div className="border rounded p-4 shadow mb-6">
                    <h1 className="text-md font-semibold mb-2">Enter PAN and GSTIN details</h1>
                    <input type="text" name="pan" className="border p-2 w-full mb-4" placeholder="Business/Owner PAN" />
                    <input type="text" name="gst" className="border p-2 w-full mb-4" placeholder="GSTIN" />
                    <div className="flex items-center">
                      <input type="checkbox" id="has_gst" name="gst_option" value="gst" className="mr-2" />
                      <label htmlFor="has_gst">I don't have a GST number</label>
                    </div>
                  </div>
                  <div className="border rounded p-4 shadow mb-6">
                    <h1 className="text-md font-semibold mb-2">Official Bank Details</h1>
                    <p className='mb-2'>Payments from EatWave will be credited here</p>
                    <input type="text" name="ifsc" className="border p-2 w-full mb-4" placeholder="Bank IFSC code" />
                    <input type="text" name="account" className="border p-2 w-full mb-4" placeholder="Bank Account number" />
                  </div>
                  <div className="border rounded p-4 shadow">
                    <h1 className="text-md font-semibold">FSSAI certificate</h1>
                    <input type="number" name="fssai" className="border p-2 w-full mb-4" placeholder="FSSAI certificate number" />
                  </div>
                </>
              )}
              {currentStep === 2 && (
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
                      <button type="button" className="text-orange-500 mb-4">+ Add More</button>
                    </div>
                  </div>
                  <div className="border rounded p-4 shadow mb-6">
                    <h3 className="text-md font-semibold mb-2">Cost for two</h3>
                    <input type="number" id="cost" name="costForTwo" placeholder="Rs." className="border p-2 w-full mb-4" />
                  </div>
                  <div className="border rounded p-4 shadow mb-6">
                  <h3 className="text-md font-semibold mb-2">Add your menu</h3>
                  <input type="file" name="menu" className="border p-2 w-full mb-4" />
                  </div>
                  <div className="border rounded p-4 shadow mb-6">
                  <h3 className="text-md font-semibold mb-2">Packaging Charges</h3>
                  <p className="mb-4">Not applicable on Indian Breads, packaged items, and beverages</p>
                  <input type="number" id="packaging_cost" name="packaging_cost" placeholder="Rs." className="border p-2 w-full mb-4" />
                  </div>
                </>
              )}
              <div className="flex justify-between">
                {currentStep > 0 && (
                  <button type="button" onClick={backHandler} className="bg-gray-500 text-white py-2 px-4 rounded">Back</button>
                )}
                {currentStep < steps.length - 1 ? (
                  <button type="button" onClick={nextHandler} className="bg-orange-500 text-white py-2 px-4 rounded">Proceed</button>
                ) : (
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