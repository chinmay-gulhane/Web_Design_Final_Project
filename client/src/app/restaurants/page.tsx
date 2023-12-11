"use client";
import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import "./restaurant.scss";
import * as restaurantService from "@/services/restaurant-service";
import Restaurant from "@/models/restaurant";
import RestaurantCard from "@/components/RestaurantCard/RestaurantCard";
import Link from "next/link";
import { useAppSelector } from "@/redux/store";
import { User } from "@/models/auth";

import Footer from "@/components/Footer/Footer";

const RestaurantPage: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const user: User | null = useAppSelector((state) => state.auth.user);

  // console.log("USer from state", user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await restaurantService.getRestaurants();
        setRestaurants(data);
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

  console.log(user)
  return (
    <>
      <div className="flex flex-col p-10">
        <div className="flex flex-col items-center text-center">
          <div className="font-bold text-3xl my-2">
            Hi {user?.firstName}👋,
          </div>
          <div className="text-xl mt-2 mb-10">
            Which restaurant will you try today?
          </div>
        </div>
        <Row>
          {restaurants.map((restaurant: Restaurant) => (
            <Col key={restaurant._id} sm={12} md={6} lg={4} xl={3}>
              <Link href={`/restaurants/${restaurant._id}`}>
                <RestaurantCard restaurant={restaurant}></RestaurantCard>
              </Link>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
};

export default RestaurantPage;
