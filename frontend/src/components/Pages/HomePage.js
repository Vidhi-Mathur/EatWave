import React, { Suspense } from "react";
import Layout from "../UI/Layout";
import TuneIcon from '@mui/icons-material/Tune';
import { SortMenu } from "../UI/SortMenu";
let TopPicks = React.lazy(() => import("../restaurant-related/TopPicks"))

const HomePage = () => {
  return (
    <Layout>
      <Suspense fallback="Loading">
        <TopPicks />
      </Suspense>
      <div>
        <div className="inline-flex items-center space-x-4">
          <h1>Choose what you want </h1>
          <button className="mr-2 mb-2 px-3 py-1 border rounded bg-white shadow-md mt-3">Filter <TuneIcon /></button>
        </div>
        {<SortMenu />}
      </div>
    </Layout>
  );
};

export default HomePage;