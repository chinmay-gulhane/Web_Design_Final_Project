"use client";
import AdminSideNav from "@/components/AdminSideNav/SideNav";
import React, { useEffect, useState } from "react";
import "./admin-home.scss";
import AdminDashboard from "@/components/AdminDashboard/AdminDashboard";
import AdminOrders from "@/components/AdminOrders/AdminOrders";
import AdminUsers from "@/components/AdminUsers/AdminUsers";
import AdminRestaurants from "@/components/AdminRestaurants/AdminRestaurants";
import { Order } from "@/models/order";
import * as orderService from "@/services/order-service";
import * as restaurantService from "@/services/restaurant-service";
import AdminSidebarData from "@/components/AdminSideNav/AdminSidebarData";
import { useDispatch } from "react-redux";
import { adminActions } from "@/redux/reducers/adminSlice";
import { useAppSelector } from "@/redux/store";
import Spinner from "@/components/Spinner/Spinner";

const AdminHomePage = () => {
  const [selectedComponent, setSelectedComponent] = useState<string>("Home");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const dispatch = useDispatch();
  const adminState = useAppSelector((state) => state.auth.loading);

  // to be removed
  const [ordersData, setOrdersData] = useState<Order[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // get all orders
        const ordersData = await orderService.getAllOrders();

        // get all restaurants
        const restaurantData = await restaurantService.getRestaurants();

        // get all users
        const userData = await orderService.getAllUsers();
        setOrdersData(ordersData);

        dispatch(
          adminActions.adminAction({ ordersData, restaurantData, userData })
        );
        setLoading(false);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err);
        } else {
          setError(new Error("An unknown error occurred"));
        }
      }
    };

    fetchData();
  }, []);

  const renderSelectedComponent = () => {
    switch (selectedComponent) {
      case "Home":
        return <AdminDashboard />;
      case "Users":
        return <AdminUsers />;
      case "Restaurants":
        return <AdminRestaurants />;
      case "Orders":
        return <AdminOrders ordersData={ordersData} />;
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
        <>
          <div className="admin-main-content">{renderSelectedComponent()}</div>
          {loading && <Spinner />}
        </>
      </div>
    </>
  );
};

export default AdminHomePage;
