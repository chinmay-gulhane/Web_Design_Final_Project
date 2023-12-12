import React, { useEffect, useState } from "react";
import "./restaurant-orders.scss";

import * as orderService from "@/services/order-service";
import { Order } from "@/models/order";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  MenuItem,
  Select,
  Button,
} from "@mui/material";

interface RestaurantOrdersProps {
  restaurantId: string;
  ordersData: Order[];
}

const RestaurantOrders: React.FC<RestaurantOrdersProps> = ({
  restaurantId,
  ordersData,
}) => {
  const initialOrders = ordersData;
  const [orders, setOrders] = useState<Order[]>(initialOrders);

  const handleStatusChange = (event: any, orderId: string) => {
    const updatedOrders = orders.map((order) =>
      order._id === orderId
        ? { ...order, status: event.target.value as string }
        : order
    );
    setOrders(updatedOrders);
  };

  const handleUpdateStatus = async (orderId: string) => {
    try {
      // Call your order update service method here
      // For example: await orderService.updateOrderStatus(orderId, updatedStatus);
      console.log(`Update status for order ${orderId}`);
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await orderService.searchOrders(
          0,
          50,
          undefined,
          restaurantId
        );
        setOrders(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error("Error fetching orders:", err);
        } else {
          console.error("An unknown error occurred");
        }
      }
    };

    fetchData();
  }, [restaurantId]);

  return (
    <div>
      <h2>Orders</h2>
      <div className="body">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Customer Name</TableCell>
                <TableCell>Customer Phone Number</TableCell>
                <TableCell>Restaurant Name</TableCell>
                <TableCell>Final Amount</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders ? (
                orders.map((order) => (
                  <TableRow key={order._id}>
                    <TableCell>{order._id}</TableCell>
                    <TableCell>{order.customerName}</TableCell>
                    <TableCell>{order.customerPhoneNumber}</TableCell>
                    <TableCell>{order.restaurantName}</TableCell>
                    <TableCell>{order.finalAmount}</TableCell>
                    <TableCell>
                      <Select
                        className="status-dropdown"
                        value={order.status}
                        onChange={(event: any) =>
                          handleStatusChange(event, order._id)
                        }
                      >
                        <MenuItem value="Placed">Placed</MenuItem>
                        <MenuItem value="Cooking">Cooking</MenuItem>
                        <MenuItem value="Delivered">Delivered</MenuItem>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleUpdateStatus(order._id)}
                      >
                        Update Status
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7}>Loading...</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default RestaurantOrders;
