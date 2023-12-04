import React from "react";
import AdminSideNav from "@/components/AdminSideNav/AdminSideNav";
import "./admin-dashboard.scss";
import AdminHomePage from "@/components/AdminHomePage/AdminHomePage";
import Header from "@/components/Header/Header";
import Header1 from "@/components/Header1/Header1";

const AdminDashBoard = () => (
  <>
    <Header1></Header1>
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
