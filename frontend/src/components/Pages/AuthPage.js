import React, { Suspense, useState } from "react"
import backgroundImage from '../../assets/AuthPage.jpg'
import Layout from "../UI/Layout"

const AuthForm = React.lazy(() => import("../user-related/AuthForm"))

const AuthFormPage = ({signup}) => {
    const [signupMode, setSignupMode] = useState(signup)
    const toggleHandler = () => {
        setSignupMode(prevMode => !prevMode)
    }
    return (
        <>
        <Layout customisedImageUrl={backgroundImage}>
            <Suspense fallback="Loading">
            <AuthForm signupMode={signupMode} toggleHandler={toggleHandler}/>
            </Suspense>
        </Layout>
        </>
    )
}

export default AuthFormPage

