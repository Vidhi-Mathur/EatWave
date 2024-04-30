import SignUpForm from "../user-related/SignupForm"
import backgroundImage from '../../assets/EatWaveBg2.jpg'
import HomePage from "./HomePage"

const SignupPage = () => {
    return (
        <>
        <HomePage customisedImageUrl={backgroundImage}>
            <SignUpForm />
        </HomePage>
        </>
    )
}

export default SignupPage