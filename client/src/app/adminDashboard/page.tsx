import React from "react";
import AdminSideNav from "@/components/AdminSideNav/AdminSideNav";
import "./admin-dashboard.scss";
import AdminHomePage from "@/components/AdminHomePage/AdminHomePage";

const AdminDashBoard = () => (
  <>
    <div className="main-div">
      {/* navbar */}
      <div className="admin-side-nav">
        <AdminSideNav></AdminSideNav>
      </div>
      {/* components */}
      <div className="admin-main-content">
        <AdminHomePage></AdminHomePage>
      </div>
    </div>
  </>
);

export default AdminDashBoard;
