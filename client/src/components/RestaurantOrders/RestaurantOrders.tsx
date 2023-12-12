import React, { useEffect, useState } from "react";
import "./restaurant-orders.scss";

import * as orderService from "@/services/order-service";
import { Order, OrderItem } from "@/models/order";
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
  Modal,
  Backdrop,
  Fade,
  List,
  ListItem,
  ListItemText,
  InputBase,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { toast } from "react-toastify";

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
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

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
      const orderToUpdate = orders.find((order) => order._id === orderId);

      if (orderToUpdate) {
        const updatedOrder = await orderService.updateOrder(orderId, {
          status: orderToUpdate.status,
        });

        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === updatedOrder._id ? updatedOrder : order
          )
        );
        toast.success("Order status updated successfully");
      }
    } catch (error) {
      toast.error("Error updating order status");
    }
  };

  const handleViewOrderItems = (order: Order) => {
    setSelectedOrder(order);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const filteredOrders = orders.filter((order) => {
    const lowerCaseSearchQuery = searchQuery.toLowerCase();
    return (
      order._id?.toLowerCase().includes(lowerCaseSearchQuery) ||
      order.customerName.toLowerCase().includes(lowerCaseSearchQuery) ||
      order.status.toLowerCase().includes(lowerCaseSearchQuery)
    );
  });

  return (
    <div>
      <div className="header-div">
        <div className="page-header">Orders</div>
        <div>
          <div className="search-bar">
            <Paper
              component="form"
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: 400,
              }}
              onSubmit={handleSearchSubmit}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search for an order..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
                <SearchIcon />
              </IconButton>
            </Paper>
          </div>
        </div>
      </div>
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
                <TableCell className="table-header" align="center">
                  Final Amount
                </TableCell>
                <TableCell className="table-header" align="center">
                  Status
                </TableCell>
                <TableCell className="table-header" align="center">
                  Order Items
                </TableCell>
                <TableCell className="table-header" align="center">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order._id}>
                  <TableCell>{order._id}</TableCell>
                  <TableCell>{order.customerName}</TableCell>
                  <TableCell>{order.customerPhoneNumber}</TableCell>
                  <TableCell align="center">{order.finalAmount}</TableCell>
                  <TableCell>
                    <Select
                      className="status-dropdown"
                      value={order.status}
                      onChange={(event: any) =>
                        handleStatusChange(event, order._id ? order._id : "")
                      }
                    >
                      <MenuItem value="Placed">Placed</MenuItem>
                      <MenuItem value="Cooking">Cooking</MenuItem>
                      <MenuItem value="Delivered">Delivered</MenuItem>
                    </Select>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleViewOrderItems(order)}
                    >
                      View
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() =>
                        handleUpdateStatus(order._id ? order._id : "")
                      }
                    >
                      Update Status
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      {/* Modal for Order Items */}
      <Modal open={isModalOpen} onClose={handleCloseModal} closeAfterTransition>
        <Fade in={isModalOpen}>
          <div className="order-modal-content">
            <h2>Order Items</h2>
            {selectedOrder && (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell align="center">Price</TableCell>
                      <TableCell align="center">Quantity</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedOrder.orderItems.map((item: OrderItem) => (
                      <TableRow key={item._id}>
                        <TableCell align="center">
                          {item.foodItem.name}
                        </TableCell>
                        <TableCell align="center">
                          {item.foodItem.price}
                        </TableCell>
                        <TableCell align="center">{item.quantity}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
            <div className="action-btn-div">
              <Button
                variant="contained"
                color="primary"
                onClick={handleCloseModal}
              >
                Okay
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default RestaurantOrders;
