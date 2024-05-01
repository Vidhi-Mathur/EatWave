import { useState } from "react"
import AuthForm from "../user-related/AuthForm"
import backgroundImage from '../../assets/EatWaveBg2.jpg'
import Layout from "../UI/Layout"

const AuthFormPage = ({signup}) => {
    const [signupMode, setSignupMode] = useState(signup)
    const toggleHandler = () => {
        setSignupMode(prevMode => !prevMode)
    }
    return (
        <>
        <Layout customisedImageUrl={backgroundImage}>
            <AuthForm signupMode={signupMode} toggleHandler={toggleHandler}/>
        </Layout>
        </>
    )
}

export default AuthFormPage

