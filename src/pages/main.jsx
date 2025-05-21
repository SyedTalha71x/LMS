import React from "react";
import Home from "./home";
import Statistics from "./statistics";
import BenefitsLms from "./benefits-lms";
import BestCourse from "./best-course";
import PricingSection from "./pricing";
import ContactPage from "./contact";
import AboutUs from "./about-us";

const main = () => {
  return (
    <>
      <Home />
      <Statistics />
      <AboutUs />
      <BenefitsLms />
      <BestCourse />
      <PricingSection />
      <ContactPage />
    </>
  );
};

export default main;
