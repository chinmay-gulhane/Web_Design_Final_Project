import React, { useState } from "react";
import "./admin-restaurant.scss";
import Restaurant from "@/models/restaurant";
import {
  TableContainer,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Table,
  InputBase,
  IconButton,
  Stack,
  Pagination,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface AdminRestaurantsProps {
  restaurantsData: Restaurant[];
}

const AdminRestaurants: React.FC<AdminRestaurantsProps> = ({
  restaurantsData,
}) => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>(restaurantsData);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const itemsPerPage = 10;

  // Filter restaurants based on search query
  const filteredRestaurants = restaurants.filter((restaurant) => {
    const lowerCaseSearchQuery = searchQuery.toLowerCase();
    return (
      restaurant._id?.toLowerCase().includes(lowerCaseSearchQuery) ||
      restaurant.name.toLowerCase().includes(lowerCaseSearchQuery) ||
      restaurant.email.toLowerCase().includes(lowerCaseSearchQuery)
    );
  });

  // Calculate the range of restaurants to display on the current page
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedRestaurants = filteredRestaurants.slice(startIndex, endIndex);

  // Handle page change in pagination
  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    const newSize = event.target.value as number;
    setPageSize(newSize);
    setPage(1);
  };

  return (
    <>
      <div className="body">
        <div className="admin-header-div">
          <div className="page-header">Restaurants</div>
          <div className="search-bar">
            <Paper
              component="form"
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: 400,
                marginBottom: "16px",
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
        </div>
        <div className="tbl-container">
          <TableContainer component={Paper}>
            <Table className="restaurant-tbl">
              <TableHead>
                <TableRow>
                  <TableCell className="table-header">
                    Restaurant Name
                  </TableCell>
                  <TableCell className="table-header">Rating</TableCell>
                  <TableCell className="table-header">Phone Number</TableCell>
                  <TableCell className="table-header">Email</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {displayedRestaurants.map((restaurant) => (
                  <TableRow key={restaurant._id} className="table-row">
                    <TableCell className="table-cell">
                      {restaurant.name}
                    </TableCell>
                    <TableCell className="table-cell">
                      {restaurant.rating}
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
        <div className="pagination">
          <Stack spacing={2}>
            <Pagination
              count={Math.ceil(filteredRestaurants.length / itemsPerPage)}
              page={page}
              onChange={handleChangePage}
            />
          </Stack>
        </div>
      </div>
    </>
  );
};

export default AdminRestaurants;
