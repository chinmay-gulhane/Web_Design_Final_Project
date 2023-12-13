"use client";
import AdminSideNav from "@/components/AdminSideNav/SideNav";
import React, { useEffect, useState } from "react";
import "./restaurant-home.scss";
import { RestaurantSidebarData } from "../../../components/AdminSideNav/RestaurantSideBarData";
import RestaurantDashboard from "@/components/RestaurantDashboard/RestaurantDashboard";
import RestaurantOrders from "@/components/RestaurantOrders/RestaurantOrders";
import RestaurantMenu from "@/components/RestautantMenu/RestaurantMenu";
import Restaurant from "@/models/restaurant";
import * as restaurantService from "@/services/restaurant-service";
import * as foodItemService from "@/services/fooditem-service";
import * as orderService from "@/services/order-service";
import FoodItem from "@/models/foodItem";
import { Order } from "@/models/order";

interface PageProps {
  params: {
    restaurantId: string;
  };
}

const RestaurantHomePage: React.FC<PageProps> = ({ params }) => {
  const [selectedComponent, setSelectedComponent] = useState<string>("Home");
  // const [restaurant, setRestaurant] = useState<Restaurant>();
  const [menuItems, setFoodItems] = useState<FoodItem[]>([]);
  const [ordersData, setOrdersData] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const restaurantId = params.restaurantId;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await restaurantService.getRestaurantById(restaurantId);
        const foodData = await foodItemService.getFoodItems(restaurantId);
        const ordersdata = await orderService.searchOrders(0, 50, undefined, restaurantId);
        // setRestaurant(data);
        setOrdersData(ordersdata);
        setFoodItems(foodData);
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

  const calculateRevenue = () => {
    return ordersData.reduce((acc, currentValue)=>{
      return acc + currentValue.finalAmount;
    },0);
  }

  const renderSelectedComponent = () => {
    switch (selectedComponent) {
      case "Home":
        return <RestaurantDashboard totalOrders={ordersData.length} totalFoodItems={menuItems.length} totalRevenue={calculateRevenue()}/>;
      case "Menu":
        return <RestaurantMenu menuItems={menuItems} restaurantId={restaurantId} />;
      case "Orders":
        return <RestaurantOrders ordersData={ordersData} restaurantId={restaurantId} />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="main-div">
        {/* navbar */}
        <div className="admin-side-nav">
          <AdminSideNav onSelect={setSelectedComponent} sidebarData={RestaurantSidebarData}></AdminSideNav>
        </div>
        {/* components */}
        <div className="admin-main-content">{renderSelectedComponent()}</div>
      </div>
    </>
  );
};

export default RestaurantHomePage;
