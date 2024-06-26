import React, { Suspense, useState } from "react";
import Layout from "../UI/Layout";
import TuneIcon from '@mui/icons-material/Tune';
import SortIcon from '@mui/icons-material/Sort';
import { Sort } from "../UI/Sort";
let TopPicks = React.lazy(() => import("../restaurant-related/TopPicks"))

const HomePage = () => {
  const [showSort, setShowSort] = useState(false)
  const toggleSort = () => {
    setShowSort(prevState => !prevState)
  }
  return (
    <Layout>
      <Suspense fallback="Loading">
        <TopPicks />
      </Suspense>
      <div className="inline-flex items-center space-x-4">
      <h1>Choose what you want </h1>
      <button className="mr-2 mb-2 px-2 py-1 border rounded bg-white shadow-md">Filter <TuneIcon /></button>
      <button className="mr-2 mb-2 px-2 py-1 border rounded bg-white shadow-md" onClick={toggleSort}>Sort By <SortIcon /></button>
      {showSort && <Sort />}
      </div>
    </Layout>
  );
};

export default HomePage;