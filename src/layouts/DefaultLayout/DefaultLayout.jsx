import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import "./DefaultLayout.scss";

const DefaultLayout = ({ children }) => {
  return (
    <>
      <div className="upper_container">
        <Header />
        {children}
      </div>
      <Footer />
    </>
  );
};

export default DefaultLayout;
