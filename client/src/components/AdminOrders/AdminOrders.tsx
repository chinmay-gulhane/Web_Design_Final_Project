"use client";
import React, { useEffect, useState } from "react";
import "./admin-orders.scss";
import * as orderService from "@/services/order-service";
import {
  TableContainer,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Table,
} from "@mui/material";
import { Order } from "@/models/order";

const AdminOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // const user: User | null = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await orderService.getAllOrders();
        setOrders(data);
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
      {/* components */}
      <div>
        <h2>Orders</h2>
        <div className="tbl-container">
          <TableContainer component={Paper}>
            <Table className="orders-tbl">
              <TableHead>
                <TableRow>
                  <TableCell className="table-header">Order ID</TableCell>
                  <TableCell className="table-header">Customer Name</TableCell>
                  <TableCell className="table-header">
                    Customer Phone Number
                  </TableCell>
                  <TableCell className="table-header">Status</TableCell>
                  <TableCell className="table-header">
                    Restaurant Name
                  </TableCell>
                  <TableCell className="table-header">Final Amount</TableCell>
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
    </>
  );
};

export default AdminOrders;
