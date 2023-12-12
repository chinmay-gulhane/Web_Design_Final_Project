"use client";
import React, { useEffect, useState } from "react";
import { Row, Col, Spinner } from "react-bootstrap";
import "./restaurant.scss";
import * as restaurantService from "@/services/restaurant-service";
import Restaurant from "@/models/restaurant";
import RestaurantCard from "@/components/RestaurantCard/RestaurantCard";
import Link from "next/link";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { User } from "@/models/auth";
import { useDispatch } from "react-redux";
import { getRestaurants } from "@/redux/actions/restaurant-actions";
import Footer from "@/components/Footer/Footer";

const RestaurantPage: React.FC = () => {
  // const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<Error | null>(null);

  const user: User | null = useAppSelector((state) => state.auth.user);

  const dispatch: AppDispatch = useDispatch();
  const restaurants = useAppSelector((state) => state.restaurant.restaurants);
  const loading = useAppSelector((state) => state.restaurant.loading);
  const error = useAppSelector((state) => state.restaurant.error);

  useEffect(() => {
    if (restaurants.length === 0) {
      dispatch(getRestaurants());
    }
  }, [restaurants, dispatch]);

  // console.log(restaurants);
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col">
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
      )}
    </>
  );
};

export default RestaurantPage;
