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
import Spinner from "@/components/Spinner/Spinner";
import restaurant from "@/models/restaurant";
import { useAppSelector } from "@/redux/store";

const baseUrl = "http://localhost:8080/restaurant";
const FoodList: React.FC = () => {
  const params = useParams();
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const restaurant: Restaurant | undefined = useAppSelector((state) =>
    state.restaurant.restaurants.find((r) => r._id === params.restaurant)
  );
  const [isLoading, setIsLoading] = useState(false);
  const user = useAppSelector((state) => state.auth.user);

  const addButtonIsVisible = user ? true : false;

  useEffect(() => {
    // Fetch data from your API
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${baseUrl}/${params.restaurant}/foodItems/all`
        );
        const data = await response.json();
        setFoodItems(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // /dashboard?search=my-project
    fetchData();
  }, [restaurant?.foodItems]);

  return (
    <div className="flex justify-center w-full">
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col items-center w-full">
          <div className="w-full">
            {restaurant && (
              <CoverImage
                src={restaurant.profilePhoto}
                alt="Restaurant cover image"
              />
            )}
          </div>
          <div className="flex flex-col w-full p-10">
            {restaurant?.name && (
              <Title
                title={restaurant.name + " | " + restaurant?.rating}
                variant={"h2"}
              ></Title>
            )}
            <div className="flex flex-col md:flex-row">
              <div className="w-1/5 border-r-2">
                <Title title="Menu" variant={"h5"}></Title>
              </div>
              <div className="flex flex-wrap justify-start w-4/5">
                {foodItems.map((foodItem) => (
                  <FoodCard
                    key={foodItem._id}
                    foodItem={foodItem}
                    foodQuantity={0}
                    addButtonIsVisible={addButtonIsVisible}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodList;
