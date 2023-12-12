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
import { InputBase, Paper, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const RestaurantPage: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>([]);

  const user: User | null = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await restaurantService.getRestaurants();
        setRestaurants(data);
        setFilteredRestaurants(data);
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

  // Update filtered restaurants based on search query
  useEffect(() => {
    const filtered = restaurants.filter((restaurant) =>
      restaurant.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredRestaurants(filtered);
  }, [searchQuery, restaurants]);

  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-row items-center text-center mb-10 justify-between flex-wrap">
          <div className="text-3xl my-2">
            <span className="font-bold">Hi {user?.firstName} 👋, </span>&nbsp;
            <span className="text-xl mt-2">Which restaurant will you try today?</span>
          </div>

          {/* Material-UI Search Bar */}
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: 400,
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search for a restaurant"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
        </div>

        {/* Display Filtered Restaurants */}
        <Row>
          {filteredRestaurants.map((restaurant: Restaurant) => (
            <Col key={restaurant._id} sm={12} md={6} lg={4} xl={3}>
              <Link href={`/restaurants/${restaurant._id}`}>
                <RestaurantCard restaurant={restaurant}></RestaurantCard>
              </Link>
            </Col>
          ))}
          {!filteredRestaurants.length && !loading && (
            <div className="flex justify-center">
              <p className="text-2xl">Oops...! No Restaurants found</p>
            </div>
          )}
        </Row>
      </div>
      {/* ... (existing content) */}
    </>
  );
};

export default RestaurantPage;
