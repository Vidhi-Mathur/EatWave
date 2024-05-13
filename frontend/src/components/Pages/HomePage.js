import React, { Suspense } from "react";
import Layout from "../UI/Layout";
let TopPicks = React.lazy(() => import("../restaurant-related/TopPicks"))

const HomePage = () => {
  return (
    <Layout>
      <Suspense fallback="Loading">
      <TopPicks />
      </Suspense>
    </Layout>
  );
};

export default HomePage;

