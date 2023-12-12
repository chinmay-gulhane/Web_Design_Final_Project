"use client";
import React, { useEffect, useState } from "react";
import "./admin-restaurant.scss";
import * as restaurantService from "@/services/restaurant-service";
import Restaurant from "@/models/restaurant";
import {
  TableContainer,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Table,
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
        <div className="tbl-container">
          <TableContainer component={Paper}>
            <Table className="restaurant-tbl">
              <TableHead>
                <TableRow>
                  <TableCell className="table-header">
                    Restaurant Name
                  </TableCell>
                  <TableCell className="table-header">Rating</TableCell>
                  <TableCell className="table-header">Address</TableCell>
                  <TableCell className="table-header">Phone Number</TableCell>
                  <TableCell className="table-header">Email</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {restaurants.map((restaurant) => (
                  <TableRow key={restaurant._id} className="table-row">
                    <TableCell className="table-cell">
                      {restaurant.name}
                    </TableCell>
                    <TableCell className="table-cell">
                      {restaurant.rating}
                    </TableCell>
                    <TableCell className="table-cell">
                      {restaurant.address.addressLine}
                    </TableCell>
                    <TableCell className="table-cell">
                      {restaurant.phoneNumber}
                    </TableCell>
                    <TableCell className="table-cell">
                      {restaurant.email}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </>
  );
};

export default AdminRestaurants;
