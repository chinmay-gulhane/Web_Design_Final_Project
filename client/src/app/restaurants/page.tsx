"use client";
import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import "./restaurant.scss";
import * as restaurantService from "@/services/restaurant-service";
import Restaurant from "@/models/restaurant";
import RestaurantCard from "@/components/RestaurantCard/RestaurantCard";
import Header from "@/components/Header/Header";
import Link from "next/link";

const RestaurantPage: React.FC = () => {
  const [products, setProducts] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await restaurantService.getRestaurants();
        setProducts(data);
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

  return (
    <>
      <Header></Header>
      <div className="body">
        <Row>
          {products.map((restaurant: Restaurant) => (
            <Col key={restaurant._id} sm={12} md={6} lg={4} xl={3}>
              <Link href={`/restaurant/${restaurant._id}`}>
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