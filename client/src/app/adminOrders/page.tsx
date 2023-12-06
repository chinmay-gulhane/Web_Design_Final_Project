"use client";
import React, { useEffect, useState } from "react";
import { Row, Col, Table } from "react-bootstrap";
import "./admin-orders.scss";
import * as orderService from "@/services/order-service";
import RestaurantCard from "@/components/RestaurantCard/RestaurantCard";
import Link from "next/link";
import { useAppSelector } from "@/redux/store";
import { User } from "@/models/auth";
import AdminSideNav from "@/components/AdminSideNav/AdminSideNav";
import {
  TableContainer,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { Order } from "@/models/order";

const AdminRestaurants: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // const user: User | null = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await orderService.getAllOrders();
        setOrders(data);
        console.log("orders", data);
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
      <div className="main-div">
        {/* navbar */}
        <div className="admin-side-nav">
          <AdminSideNav></AdminSideNav>
        </div>
        {/* components */}
        <div className="admin-main-content">
          <h2>Orders</h2>
          <div className="body">
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Order ID</TableCell>
                    <TableCell>Customer Name</TableCell>
                    <TableCell>Customer Phone Number</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Restaurant Name</TableCell>
                    <TableCell>Final Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order._id}>
                      <TableCell>{order._id}</TableCell>
                      <TableCell>{order.customerName}</TableCell>
                      <TableCell>{order.customerPhoneNumber}</TableCell>
                      <TableCell>{order.status}</TableCell>
                      <TableCell>{order.restaurantName}</TableCell>
                      <TableCell>{order.finalAmount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminRestaurants;
