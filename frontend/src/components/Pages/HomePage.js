import React, { Suspense, useRef } from "react";
import Layout from "../UI/Layout";
import { SortMenu } from "../UI/SortMenu";
import { FilterDialog } from "../UI/FilterDialog";
let TopPicks = React.lazy(() => import("../restaurant-related/TopPicks"))

const HomePage = () => {
  return (
    <Layout>
      <Suspense fallback="Loading">
        <TopPicks />
      </Suspense>
      <div>
        <div className="inline-flex items-center space-x-4">
          <h1 className="ml-10 text-3xl font-bold text-white bg-gray-800 bg-opacity-75 px-4 py-2 rounded-lg shadow-lg">Choose what you want </h1>
          <FilterDialog/>
        </div>
        <SortMenu />
      </div>
    </Layout>
  );
};

export default HomePage;