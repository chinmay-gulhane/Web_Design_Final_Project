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
import { FoodItem } from "@/interfaces/interfaces";

interface PageProps {
  params: {
    restaurantId: string;
    // Add other properties if needed
  };
}

const RestaurantHomePage: React.FC<PageProps> = ({ params }) => {
  const [selectedComponent, setSelectedComponent] = useState<string>("Home");
  const [restaurant, setRestaurant] = useState<Restaurant>();
  const [menuItems, setFoodItems] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const restaurantId = params.restaurantId;
  console.log("restaurantId", restaurantId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await restaurantService.getRestaurantById(restaurantId);
        console.log(data);
        setRestaurant(data);
        setFoodItems(data.foodItems);
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
        return <RestaurantDashboard />;
      case "Menu":
        return (
          <RestaurantMenu menuItems={menuItems} restaurantId={restaurantId} />
        );
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
