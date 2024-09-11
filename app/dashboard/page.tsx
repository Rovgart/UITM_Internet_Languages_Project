import React from "react";
import DashboardNavbar from "./components/Navbar/DashboardNavbar";
import DashboardBookList from "./components/List/DashboardBookList";

function Dashboard() {
  return (
    <>
      <DashboardNavbar />
      <DashboardBookList />
    </>
  );
}

export default Dashboard;
