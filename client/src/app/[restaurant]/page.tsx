"use client";
import FoodCard from "@/components/FoodCard";
import { useEffect, useState } from "react";
import * as React from "react";
import CoverImage from "@/components/CoverImage";
import FoodItem from "@/models/foodItem";
import Restaurant from "@/models/restaurant";
import Image from "next/image";

const FoodList: React.FC = () => {
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);

  useEffect(() => {
    // Fetch data from your API
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/restaurant/655d0b832242b5a3bdc4879b/foodItems/all"
        );
        const data = await response.json();
        setFoodItems(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const [restaurant, setRestaurant] = useState<Restaurant>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/restaurant/655d0b832242b5a3bdc4879b"
        );
        const data = await response.json();
        setRestaurant(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  //   console.log(restaurant);

  return (
    <div>
      {restaurant && (
        <CoverImage
          //   src={restaurant.profilePhoto}
          src={"/client/public/restaurant.jpg"}
          alt="Restaurant cover image"
        />
      )}
      <h1>{restaurant?.name}</h1>
      <h1>Food Items</h1>
      {foodItems.map((foodItem) => (
        <FoodCard key={foodItem._id} foodItem={foodItem} />
      ))}
    </div>
  );
};

export default FoodList;
