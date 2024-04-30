import React from "react";
import { Link } from "react-router-dom";
import Card from "../UI/Card";
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';

const SignUpForm = (props) => {
    function submitHandler(e) {
        e.preventDefault();
        // Add your form submission logic here
    }

    return (
        <Card>
            <h2 className="text-2xl font-semibold mb-4 text-center">Sign Up</h2>
            <form className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                    <input name="name" type="text" placeholder="Enter your name" required pattern="[A-Za-z ]+" autoComplete="off" autoFocus className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-400" />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input name="email" type="email" placeholder="Email" required autoComplete="off" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-400" />
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <input name="password" type="password" placeholder="Password" required pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" autoComplete="off" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-400" />
                </div>
                <button onClick={submitHandler} className="w-full py-2 px-4 bg-orange-400 text-white rounded-md hover:bg-orange-500 focus:outline-none focus:bg-orange-500">Sign Up</button>
            </form>
            <p className="mt-4 text-sm text-gray-600 text-center">
                By Signing In, I accept the EatWave's <Link to="/terms-and-conditions" className="font-semibold text-orange-400">Terms & Conditions & Privacy Policy</Link>
            </p>
        </Card>
    );
};

export default SignUpForm;