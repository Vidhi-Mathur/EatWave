import React from "react";
import backgroundImage from "../../assets/EatWaveLogo8.jpg"; // Import the background image
import Header from "./Header";

const HomePage = () => {
  return (
    <div className="h-screen bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <Header />
    </div>
  );
};

export default HomePage;
