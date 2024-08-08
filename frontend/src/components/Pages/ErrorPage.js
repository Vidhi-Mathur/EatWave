import { Card } from "../UI/Card";
import { Layout }from "../UI/Layout";
import { Link } from "react-router-dom"
import backgroundImage from '../../assets/NotFoundPage.jpeg'

export const ErrorPage = () => {
    return (
        <Layout customisedImageUrl={backgroundImage}>
            <Card className="p-6">
            <div className="flex flex-col items-center justify-center h-full">
                <h1 className="text-4xl font-bold text-center text-gray-900 mb-4">Oops!</h1>
                <p className="text-lg text-center text-gray-700 mb-4">Looks Like You Took a Wrong Turn</p>
                <p className="text-lg text-center text-gray-700 mb-8">Let's Redirect You to Deliciousness!</p>
                <Link to="/" className="bg-orange-400 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-300 ease-in-out">Back to Food</Link>
            </div>
            </Card>
        </Layout>
    );
};