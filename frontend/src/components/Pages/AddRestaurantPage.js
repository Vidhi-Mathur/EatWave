import { Layout }from "../UI/Layout"
import { AddRestaurant } from "../restaurant-related/AddRestaurant"
import backgroundImage from "../../assets/AddRestaurantPage.jpg"

export const AddRestaurantPage = () => {
    return (
        <Layout customisedImageUrl={backgroundImage}>
            <AddRestaurant />
        </Layout>
    )
}