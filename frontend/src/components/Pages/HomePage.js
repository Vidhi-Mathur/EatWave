import React, { Suspense, useState } from "react";
import { Layout }from "../UI/Layout";
import { SortMenu } from "../UI/SortMenu";
import { FilterDialog } from "../UI/FilterDialog";
import { SortedRestaurants } from "../restaurant-related/SortedRestaurants";
let TopPicks = React.lazy(() => import("../restaurant-related/TopPicks"))

export const HomePage = () => {
const [restaurants, setRestaurants] = useState([])
  return (
    <Layout>
      <Suspense fallback="Loading">
        <TopPicks />
      </Suspense>
      <div>
        <div className="lg:inline-flex items-center space-x-4 sm:flex md:flex">
          <h1 className="ml-10 text-3xl font-bold text-white bg-gray-800 bg-opacity-75 px-4 py-2 rounded-lg shadow-lg">Choose what you want </h1>
          <FilterDialog setRestaurants = {setRestaurants} />
        </div>
        <SortMenu setRestaurants = {setRestaurants}/>
      </div>
      <SortedRestaurants restaurants = {restaurants} />
    </Layout>
  );
};
