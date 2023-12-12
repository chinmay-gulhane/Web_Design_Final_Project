import React from "react";
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
} from "@mui/material";

interface AdminUsersProps {
  usersData: User[];
}

const AdminUsers: React.FC<AdminUsersProps> = ({ usersData }) => {
  return (
    <div>
      <h2>Users</h2>
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
              {usersData ? (
                usersData.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell>{user._id}</TableCell>
                    <TableCell>{user.firstName}</TableCell>
                    <TableCell>{user.lastName}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                    {/* <TableCell>{user.role}</TableCell> */}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6}>Loading...</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default AdminUsers;
