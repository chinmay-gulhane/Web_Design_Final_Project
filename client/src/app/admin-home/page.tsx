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
import Restaurant from "@/models/restaurant";
import { User } from "@/models/auth";
import AdminSidebarData from "@/components/AdminSideNav/AdminSidebarData";

const AdminHomePage = () => {
  const [selectedComponent, setSelectedComponent] = useState<string>("Home");
  const [restaurantsData, setRestaurantsData] = useState<Restaurant[]>([]);
  const [usersData, setUsersData] = useState<User[]>([]);
  const [ordersData, setOrdersData] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // get all orders
        // const data = await orderService.getAllOrders();
        // setOrdersData(data);

        // get all restaurants
        // const restaurantData = await restaurantService.getRestaurants();
        // setRestaurantsData(restaurantData);

        // get all users
        const userData = await orderService.getAllUsers();
        setUsersData(userData);

        // setOrdersData(ordersdata);
        // setFoodItems(foodData);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err);
        } else {
          setError(new Error("An unknown error occurred"));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderSelectedComponent = () => {
    switch (selectedComponent) {
      case "Home":
        return <AdminDashboard />;
      case "Users":
        return <AdminUsers usersData={usersData} />;
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
