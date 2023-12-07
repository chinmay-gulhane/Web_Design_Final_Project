"use client";
import AdminSideNav from "@/components/AdminSideNav/AdminSideNav";
import React, { useState } from "react";
import "./admin-dashboard.scss";
import AdminDashboard from "@/components/AdminDashboard/AdminDashboard";
import AdminOrders from "@/components/AdminOrders/AdminOrders";
import AdminUsers from "@/components/AdminUsers/AdminUsers";
import AdminRestaurants from "@/components/AdminRestaurants/AdminRestaurants";

const AdminHomePage = () => {
  const [selectedComponent, setSelectedComponent] = useState<string>("Home");

  const renderSelectedComponent = () => {
    console.log("in render selected", selectedComponent);
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
          <AdminSideNav onSelect={setSelectedComponent}></AdminSideNav>
        </div>
        {/* components */}
        <div className="admin-main-content">{renderSelectedComponent()}</div>
      </div>
    </>
  );
};

export default AdminHomePage;
