// Importing necessary libraries
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
  Stack, // New import for Material-UI Stack
  Pagination, // New import for Material-UI Pagination
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Order } from "@/models/order";
import { toast } from "react-toastify";

interface AdminOrdersProps {
  ordersData: Order[];
}

// Main component
const AdminOrders: React.FC<AdminOrdersProps> = ({ ordersData }) => {
  // State for orders, loading, error, search query, sorting, and pagination
  const [orders, setOrders] = useState<Order[]>(ordersData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("createdDateTime");
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch orders on component mount
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const data = await orderService.getAllOrders();
  //       setOrders(data);
  //     } catch (err: unknown) {
  //       if (err instanceof Error) {
  //         setError(err);
  //       } else {
  //         setError(new Error("An unknown error occurred"));
  //       }
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // Sort orders by latest createdDateTime
  useEffect(() => {
    const sortedOrders = [...orders].sort((a, b) => {
      const dateA = a.createdDateTime ? new Date(a.createdDateTime) : null;
      const dateB = b.createdDateTime ? new Date(b.createdDateTime) : null;

      if (dateA && dateB) {
        return (dateA as any) - (dateB as any);
      } else if (dateA) {
        return -1;
      } else if (dateB) {
        return 1;
      }

      return 0;
    });

    setOrders(sortedOrders);
  }, [orders]);

  // Handle search form submission
  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  // Filter orders based on search query
  const filteredOrders = orders.filter((order) => {
    const lowerCaseSearchQuery = searchQuery.toLowerCase();
    return (
      order._id?.toLowerCase().includes(lowerCaseSearchQuery) ||
      order.customerName.toLowerCase().includes(lowerCaseSearchQuery) ||
      order.status.toLowerCase().includes(lowerCaseSearchQuery)
    );
  });

  // Calculate the range of orders to display on the current page
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedOrders = filteredOrders.slice(startIndex, endIndex);

  // Handle page change in pagination
  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setPage(newPage);
  };

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
                {displayedOrders.map((order) => (
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
        {/* <div className="pagination">
          <Stack spacing={2}>
            <Pagination
              count={Math.ceil(filteredOrders.length / itemsPerPage)}
              page={page}
              onChange={handleChangePage}
            />
          </Stack>
        </div> */}
      </div>
    </>
  );
};

export default AdminOrders;
