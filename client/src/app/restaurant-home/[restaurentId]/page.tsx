"use client";
import AdminSideNav from "@/components/AdminSideNav/SideNav";
import React, { useEffect, useState } from "react";
import "./restaurant-home.scss";
import { RestaurantSidebarData } from "../../../components/AdminSideNav/RestaurantSideBarData";
import RestaurantDashboard from "@/components/RestaurantDashboard/RestaurantDashboard";
import RestaurantOrders from "@/components/RestaurantOrders/RestaurantOrders";
import RestaurantMenu from "@/components/RestautantMenu/RestaurantMenu";

const RestaurantHomePage = () => {
  const [selectedComponent, setSelectedComponent] = useState<string>("Home");

  const renderSelectedComponent = () => {
    switch (selectedComponent) {
      case "Home":
        return <RestaurantDashboard />;
      case "Menu":
        return <RestaurantMenu />;
      case "Orders":
        return <RestaurantOrders />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="main-div">
        {/* navbar */}
        <div className="admin-side-nav">
          <AdminSideNav
            onSelect={setSelectedComponent}
            sidebarData={RestaurantSidebarData}
          ></AdminSideNav>
        </div>
        {/* components */}
        <div className="admin-main-content">{renderSelectedComponent()}</div>
      </div>
    </>
  );
};

export default RestaurantHomePage;
