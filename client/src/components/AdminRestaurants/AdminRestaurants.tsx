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

  // Filter restaurants based on search query
  const filteredRestaurants = restaurants.filter((restaurant) => {
    const lowerCaseSearchQuery = searchQuery.toLowerCase();
    return (
      restaurant._id?.toLowerCase().includes(lowerCaseSearchQuery) ||
      restaurant.name.toLowerCase().includes(lowerCaseSearchQuery) ||
      restaurant.email.toLowerCase().includes(lowerCaseSearchQuery)
    );
  });

  return (
    <>
      <div className="body">
        <div className="header-div">
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
                {filteredRestaurants.map((restaurant) => (
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
      </div>
    </>
  );
};

export default AdminRestaurants;
