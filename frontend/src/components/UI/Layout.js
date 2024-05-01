import React from "react";
import Header from "../UI/Header";
import backgroundImage from "../../assets/EatWaveBg.jpeg";

const Layout = ({children, customisedImageUrl}) => {
    return (
      <div className="relative">
        <Header />
        <div
          className="fixed top-0 left-0 w-full h-full bg-cover bg-no-repeat bg-center z-0"
          style={{ backgroundImage: `url(${customisedImageUrl || backgroundImage})` }}
        />
        {/* Appers above background image */}
        <div className="relative z-10">{children}</div>
      </div>
    )
}

export default Layout

