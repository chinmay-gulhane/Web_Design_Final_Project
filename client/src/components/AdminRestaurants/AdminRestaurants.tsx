"use client";
import React, { useEffect, useState } from "react";
import { Row, Col, Table } from "react-bootstrap";
import "./admin-restaurant.scss";
import * as restaurantService from "@/services/restaurant-service";
import Restaurant from "@/models/restaurant";
import RestaurantCard from "@/components/RestaurantCard/RestaurantCard";
import Link from "next/link";
import { useAppSelector } from "@/redux/store";
import { User } from "@/models/auth";
import AdminSideNav from "@/components/AdminSideNav/SideNav";
import {
  TableContainer,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

const AdminRestaurants: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // const user: User | null = useAppSelector((state) => state.auth.user);

  // console.log("USer from state", user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await restaurantService.getRestaurants();
        setRestaurants(data);
        console.log(data);
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
      <div className="body">
        <h2>Restaurants</h2>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Restaurant Name</TableCell>
                <TableCell>Rating</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Phone Number</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Cuisine</TableCell>
                <TableCell>Offers</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {restaurants.map((restaurant) => (
                <TableRow key={restaurant._id}>
                  <TableCell>{restaurant.name}</TableCell>

                  <TableCell>{restaurant.rating}</TableCell>
                  <TableCell>{restaurant.address.addressLine}</TableCell>
                  <TableCell>{restaurant.phoneNumber}</TableCell>
                  <TableCell>{restaurant.email}</TableCell>
                  <TableCell>{restaurant.cuisine.join(", ")}</TableCell>
                  <TableCell>{restaurant.offers.join(", ")}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default AdminRestaurants;
