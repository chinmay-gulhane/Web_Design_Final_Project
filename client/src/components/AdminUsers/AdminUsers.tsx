import React, { useState } from "react";
import "./admin-users.scss";
import { User } from "@/models/auth";
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  InputBase,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface AdminUsersProps {
  usersData: User[];
}

const AdminUsers: React.FC<AdminUsersProps> = ({ usersData }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Filter users based on search query
  const filteredUsers = usersData.filter((user) => {
    const lowerCaseSearchQuery = searchQuery.toLowerCase();
    return (
      user._id?.toLowerCase().includes(lowerCaseSearchQuery) ||
      user.firstName.toLowerCase().includes(lowerCaseSearchQuery) ||
      user.lastName.toLowerCase().includes(lowerCaseSearchQuery) ||
      user.email.toLowerCase().includes(lowerCaseSearchQuery)
    );
  });

  return (
    <div>
      <div className="header-div">
        <div className="page-header">Users</div>
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
              placeholder="Search for a user"
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
          <Table className="users-tbl">
            <TableHead>
              <TableRow>
                <TableCell className="table-header">User ID</TableCell>
                <TableCell className="table-header">First Name</TableCell>
                <TableCell className="table-header">Last Name</TableCell>
                <TableCell className="table-header">Email</TableCell>
                <TableCell className="table-header">Phone</TableCell>
                {/* <TableCell className="table-header">Role</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user._id}</TableCell>
                  <TableCell>{user.firstName}</TableCell>
                  <TableCell>{user.lastName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  {/* <TableCell>{user.role}</TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default AdminUsers;
