import React, { useState } from 'react';
import { StepIndicator } from '../UI/StepIndicator';

export const AddRestaurant = () => {
  const steps = ['Restaurant Information', 'Restaurant Documents', 'Menu Setup'];
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const form = new FormData(e.target)
    const data = Object.fromEntries(form.entries())
    console.log(data)
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="bg-white shadow-md rounded-lg p-6">
    <div className="flex">
      <StepIndicator steps={steps} currentStep={currentStep} />
      <div className="w-3/4 p-4">
        <form onSubmit={submitHandler} className='space-y-4'>
          {currentStep === 0 && (
            <>
            <h1>Basic Details</h1>
            <div className='border rounded p-4 shadow'>
              <input type="text" name="owner" className="border p-2 w-full mb-4" placeholder="Owner's Full Name"/>
              <input type="text" name="restaurant" className="border p-2 w-full mb-4" placeholder="Restaurant's Name"/>
              {/* Later - ToDo add location*/}
              <p>Add Restaurant Location</p>
            </div>
            <h1>Owner Basic Details</h1>
            <div className='border rounded p-4 shadow'>
              <input type="email" name="email" className="border p-2 w-full mb-4" placeholder="Email Address"/>
              <input type="number" name="phone" className="border p-2 w-full mb-4" placeholder="Mobile Number"/>
              <p>Provide your <strong>Whatsapp Number</strong> to get insights on ratings, menu etc.</p>
              <input type="radio" id="same_whatsapp" name="whatsapp_option" value="same" />
              <label for="same_whatsapp">My Whatsapp Number is same as above</label>
              <input type="radio" id="different_whatsapp" name="whatsapp_option" value="different" />
              <label for="different_whatsapp">I have a different Whatsapp number</label>
            </div>
            <h1>Working Days</h1>
            <div className='border rounded p-4 shadow'>
              {/* Later - ToDo make button work*/}
              <button>Select All</button>
              <input type='checkbox' id="monday" name="working days" value="Monday" />
              <label for="monday">Monday</label>
              <input type='checkbox' id="tuesday" name="working days" value="Tuesday" />
              <label for="tuesday">Tuesday</label>
              <input type='checkbox' id="wednesday" name="working days" value="Wednesday" />
              <label for="wednesday">Wednesday</label>
              <input type='checkbox' id="thursday" name="working days" value="Thursday" />
              <label for="thursday">Thursday</label>
              <input type='checkbox' id="friday" name="working days" value="Friday" />
              <label for="friday">Friday</label>
              <input type='checkbox' id="saturday" name="working days" value="Saturday" />
              <label for="saturday">Saturday</label>
              <input type='checkbox' id="sunday" name="working days" value="Sunday" />
              <label for="sunday">Sunday</label>
              </div>
              <h1>Opening and Closing Time</h1>
              <div className='border rounded p-4 shadow'>
              <input type='radio' id='same_time' name='timing_slot' value="same" />
              <label for="same_time">I open and close my restaurant at same time on all working days</label>
              <input type='radio' id='different_time' name='timing_slot' value="different"/>
              <label for="different_time">I have separate daywise time</label>
              {/* Later - ToDo make additional slots available*/}
              <p>Opening Time</p>
              <p>Closing Time</p>
              </div>
            </>
          )}
          {currentStep === 1 && (
            <div>
              <label className="block mb-2">Email</label>
              <input
                type="email"
                name="email"
                className="border p-2 w-full mb-4"
              />
              <label className="block mb-2">Phone</label>
              <input
                type="text"
                name="phone"
                className="border p-2 w-full mb-4"
              />
            </div>
          )}
          {currentStep === 2 && (
            <div>
              <h3 className="mb-4">Review your information</h3>
              <p><strong>Name:</strong> </p>
              <p><strong>Email:</strong> </p>
              <p><strong>Phone:</strong> </p>
            </div>
          )}
          <div className="flex justify-between">
            {currentStep > 0 && (
              <button type="button" onClick={handleBack} className="bg-gray-500 text-white py-2 px-4 rounded">
                Back
              </button>
            )}
            {currentStep < steps.length - 1 ? (
              <button type="button" onClick={handleNext} className="bg-blue-500 text-white py-2 px-4 rounded">
                Proceed
              </button>
            ) : (
              <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded">
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
    </div>
    </div>
  );
};