import { Link, useNavigate } from "react-router-dom";
import { Card } from "../UI/Card";
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import { useContext, useState } from "react";
import { AuthContext } from "../../store/Auth-Context";
import { LoadingSpinner } from "../UI/LoadingSpinner";

const AuthForm = ({ signupMode, toggleHandler }) => {
    const { signup, login, token, setToken } = useContext(AuthContext)
    const navigate = useNavigate()
    const [errors, setErrors] = useState(null)
    const [loading, setLoading] = useState(false)
    
    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true)
        const form = new FormData(e.target)
        const data = Object.fromEntries(form.entries())
        try {
            let url = signupMode? `${process.env.REACT_APP_API_URL}/signup`: `${process.env.REACT_APP_API_URL}/login`
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token? `Bearer ${token}`: ' ' 
                },
                body: JSON.stringify(data)
            })
            const result = await response.json()
            if(!response.ok){
                const errorMessages = result.errors? result.errors.map(err => err.msg): [result.message];
                setErrors(errorMessages);
                setLoading(false)
                return;
            }
            signupMode? signup(result.accessToken, result.refreshToken, result.name, result.email): login(result.accessToken, result.refreshToken, result.name, result.email)
            setToken(result.accessToken)
            navigate('/')
            setLoading(false)
            //In case needed anywhere in component
            return result
        }
        catch (err) {
            setErrors([err.message || "Can't authenticated, try again later"])
            setLoading(false)
            return
        }
    }

    const getButtonContent = () => {
        if (loading){
            return <LoadingSpinner size={6} />;
        }
        return signupMode ? 'Sign Up' : 'Login';
    } 

    return (
        <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4 text-center">{signupMode ? 'Sign Up' : 'Login'}</h2>
            {<p className="mt-2 text-center">{signupMode ? (
                <span onClick={toggleHandler}>
                    Already have an account? try{' '}<Link to="/login" className="text-orange-400 hover:underline">Login</Link>
                </span>
            ) : (
                <span onClick={toggleHandler}>
                    Don't have an account?{' '}<Link to="/signup" className="text-orange-400 hover:underline">Sign Up</Link>
                </span>)}
            </p>}
            {errors && (
                <div className="text-red-500 text-center m-4">
                    {errors.map((error, index) => (
                        <p key={index}>{error}</p>
                    ))}
                </div>
            )}
            <form className="space-y-4" onSubmit={submitHandler}>
                {signupMode && <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                    <div className="relative">
                        <PersonIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input name="name" type="text" placeholder="Enter your name" required pattern="[A-Za-z ]+" autoComplete="off" autoFocus className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-400" />
                    </div>
                </div>}
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <div className="relative">
                        <EmailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input name="email" type="email" placeholder="Email" required autoComplete="off" className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-400" />
                    </div>
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <div className="relative">
                        <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input name="password" type="password" placeholder="Password" required autoComplete="off" className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-400" />
                    </div>
                </div>
                <button className="w-full h-10 py-2 px-4 bg-orange-400 text-white rounded-md hover:bg-orange-500 focus:outline-none focus:bg-orange-500 flex items-center justify-center" disabled={loading}>{getButtonContent()}</button>
            </form>
            {signupMode && <p className="mt-4 text-sm text-gray-600 text-center">
                By Signing In, I accept the EatWave's <Link to="/terms-and-conditions" className="font-semibold text-orange-400">Terms & Conditions & Privacy Policy</Link>
            </p>}
        </Card>
    );
};

export default AuthForm;