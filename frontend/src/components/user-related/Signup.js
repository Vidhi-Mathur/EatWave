import { Link } from "react-router-dom"

const SignUp = (props) => {
    function submitHandler(e){
        e.preventDefault()
    }
    return (
        <>
        <p>Sign Up or <Link to="/login">login to your account</Link></p>
        <form>
            <div>
                <label htmlFor="name">Name</label>
                <input name="name" type="text" placeholder="Enter your name" required pattern="[A-Za-z ]+" autoComplete="off" autoFocus />
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input name="email" type="email" placeholder="Email" required autoComplete="off" />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input name="password" type="password" placeholder="Password" required pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
 autoComplete="off" />
            </div>
            <button onClick={submitHandler}>Sign In</button>
            <p>By Signing In, I accept the <Link to="/terms-and-conditions">Terms & Conditions & Privacy Policy</Link></p>
        </form>
        </>
    )
}

export default SignUp