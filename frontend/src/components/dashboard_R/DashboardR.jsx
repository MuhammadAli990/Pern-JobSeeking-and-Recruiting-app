import React from "react";
import Navbar from "../Home/Navbar";
import ProfileR from "./ProfileR";
import JobApplications from "./JobApplications";

function DashboardR() {
  return (
    <>
      <Navbar color="black" />
      <div className="pt-20 flex md:flex-row flex-col max-w-[1200px] mx-auto px-4 gap-6">
        <ProfileR />
        <JobApplications />
      </div>
    </>
  );
}

export default DashboardR;
