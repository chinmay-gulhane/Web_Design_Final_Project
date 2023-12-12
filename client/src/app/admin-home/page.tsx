"use client";
import AdminSideNav from "@/components/AdminSideNav/SideNav";
import React, { useState } from "react";
import "./admin-home.scss";
import AdminDashboard from "@/components/AdminDashboard/AdminDashboard";
import AdminOrders from "@/components/AdminOrders/AdminOrders";
import AdminUsers from "@/components/AdminUsers/AdminUsers";
import AdminRestaurants from "@/components/AdminRestaurants/AdminRestaurants";
import AdminSidebarData from "../../components/AdminSideNav/AdminSidebarData";


const AdminHomePage = () => {
  const [selectedComponent, setSelectedComponent] = useState<string>("Home");

  const renderSelectedComponent = () => {
    switch (selectedComponent) {
      case "Home":
        return <AdminDashboard />;
      case "Users":
        return <AdminUsers />;
      case "Restaurants":
        return <AdminRestaurants />;
      case "Orders":
        return <AdminOrders />;
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
            sidebarData={AdminSidebarData}
          ></AdminSideNav>
        </div>
        {/* components */}
        <div className="admin-main-content">{renderSelectedComponent()}</div>
      </div>
    </>
  );
};

export default AdminHomePage;
