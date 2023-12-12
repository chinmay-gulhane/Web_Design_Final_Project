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
  MenuItem,
  Select,
  Button,
  Modal,
  Backdrop,
  Fade,
  InputBase,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Order } from "@/models/order";
import { toast } from "react-toastify";

const AdminOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("createdDateTime");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const ordersPerPage = 10; // Number of orders to display per page

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

  // Sort orders by latest createdDateTime
  useEffect(() => {
    const sortedOrders = [...orders].sort((a, b) => {
      const dateA = a.createdDateTime ? new Date(a.createdDateTime) : null;
      const dateB = b.createdDateTime ? new Date(b.createdDateTime) : null;

      if (dateA && dateB) {
        return (dateA as any) - (dateB as any); // Explicitly cast to 'any'
      } else if (dateA) {
        return -1; // a comes first
      } else if (dateB) {
        return 1; // b comes first
      }

      return 0; // both dates are undefined
    });

    setOrders(sortedOrders);
  }, [orders]);

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

  // Paginate orders
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <>
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
                  placeholder="Search for an order"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <IconButton
                  type="submit"
                  sx={{ p: "10px" }}
                  aria-label="search"
                >
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
                  <TableCell className="table-header">Status</TableCell>
                  <TableCell className="table-header">
                    Restaurant Name
                  </TableCell>
                  <TableCell className="table-header">Final Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentOrders.map((order) => (
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
          {/* <div className="pagination">
            {Array.from(
              { length: Math.ceil(filteredOrders.length / ordersPerPage) },
              (_, i) => (
                <Button key={i + 1} onClick={() => paginate(i + 1)}>
                  {i + 1}
                </Button>
              )
            )}
          </div> */}
        </div>
      </div>
    </>
  );
};

export default AdminOrders;
