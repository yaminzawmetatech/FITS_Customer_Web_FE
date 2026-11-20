import React from "react";
import HeaderSlider from "../HeaderSlider/HeaderSlider";
import OurServicePage from "../our-service/OurServicePage";
import CompanyInfoCard from "../companyInfoCard/companyInfoCard";
import HowToApplyLoan from "../howToApplyLoan/HowToApplyLoan";

const HomePageWrapper = () => {
  return (
    <>
      <HeaderSlider />
      <CompanyInfoCard />
      <OurServicePage />
      <HowToApplyLoan/>
    </>
  );
};

export default HomePageWrapper;
