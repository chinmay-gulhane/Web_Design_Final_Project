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
  Stack,
  Pagination,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useAppSelector } from "@/redux/store";

interface AdminUsersProps {
  // usersData: User[];
}

const AdminUsers: React.FC<AdminUsersProps> = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const itemsPerPage = 10;
  const userState = useAppSelector((state) => state.admin.users);

  // Filter users based on search query
  const filteredUsers = userState.filter((user) => {
    const lowerCaseSearchQuery = searchQuery.toLowerCase();
    return (
      user._id?.toLowerCase().includes(lowerCaseSearchQuery) ||
      user.firstName.toLowerCase().includes(lowerCaseSearchQuery) ||
      user.lastName.toLowerCase().includes(lowerCaseSearchQuery) ||
      user.email.toLowerCase().includes(lowerCaseSearchQuery)
    );
  });

  // Calculate the range of users to display on the current page
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedUsers = filteredUsers.slice(startIndex, endIndex);

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
    setPage(1); // Reset to the first page when changing page size
  };

  return (
    <div>
      <div className="admin-header-div">
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
              {displayedUsers.map((user) => (
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
      <div className="pagination">
        <Stack spacing={2}>
          <Pagination
            count={Math.ceil(filteredUsers.length / itemsPerPage)}
            page={page}
            onChange={handleChangePage}
            showFirstButton
            showLastButton
          />
        </Stack>
      </div>
    </div>
  );
};

export default AdminUsers;
