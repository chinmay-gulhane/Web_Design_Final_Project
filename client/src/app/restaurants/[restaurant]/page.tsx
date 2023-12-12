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
        <div className="h-[70vh]">
          <Spinner />
        </div>
      ) : (
        <div className="flex flex-col items-center w-full -m-14">
          <div className="w-full">
            {restaurant && (
              <CoverImage
                src={restaurant.profilePhoto}
                alt="Restaurant cover image"
              />
            )}
          </div>
          <div className="flex flex-col w-full lg:p-10">
            {restaurant?.name && (
              <div className="flex justify-content-between items-center py-2">
                <Title title={restaurant.name + " "} variant={"h2"}></Title>
                <div className="flex">
                  <Image
                    width={40}
                    height={40}
                    src="https://img.icons8.com/color/48/rating-circled.png"
                    alt="rating-circled"
                  />
                  <Title title={restaurant?.rating.toString()} variant={"h4"} />
                </div>
              </div>
            )}
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-1/5 border-r-2">
                <Title title="Menu" variant={"h5"}></Title>
              </div>
              <div className="flex flex-wrap md:px-10 justify-start w-full md:w-4/5">
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
