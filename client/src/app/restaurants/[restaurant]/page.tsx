"use client";
import FoodCard from "@/components/FoodCard";
import { useEffect, useState } from "react";
import * as React from "react";
import CoverImage from "@/components/CoverImage";
import FoodItem from "@/models/foodItem";
import Restaurant from "@/models/restaurant";
import Image from "next/image";
import Title from "../../../components/Title";
import { useParams } from "next/navigation";

const baseUrl = "http://localhost:8080/restaurant";

const FoodList: React.FC = () => {
  const params = useParams();

  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [restaurant, setRestaurant] = useState<Restaurant>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseUrl}/${params.restaurant}`);
        const data = await response.json();
        setRestaurant(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [params.restaurant]);

  useEffect(() => {
    // Fetch data from your API
    const fetchData = async () => {
      try {
        setFoodItems(restaurant?.foodItems || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // /dashboard?search=my-project
    fetchData();
  }, [restaurant?.foodItems]);

  return (
    <>
      <div>
        {restaurant && (
          <CoverImage
            //   src={restaurant.profilePhoto}
            src={"/images/restaurant.jpg"}
            alt="Restaurant cover image"
          />
        )}
        <div>
          <Title
            title={restaurant?.name + " | " + restaurant?.rating}
            variant={"h2"}
          ></Title>
          <Title title="Menu" variant={"h4"}></Title>
          {foodItems.map((foodItem) => (
            <FoodCard key={foodItem._id} foodItem={foodItem} />
          ))}
        </div>
      </div>
    </>
  );
};

export default FoodList;
