import * as React from "react";
import "./AdminDashboard.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from '@mui/icons-material/Person';
import RamenDiningIcon from '@mui/icons-material/RamenDining';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

const AdminDashboard = () => {
  const styles = {
    largeIcon: {
      width: 60,
      height: 60,
    },
  };

  return (
    <div className="flex flex-col">
      <div className="text-3xl my-2">
        <span className="font-bold">Hi Admin 👋, </span>&nbsp;
        <span className="text-xl mt-2">Welcome to Husky Bites</span>
      </div>

      <div className="card-container">
          <div className="card purple">
            <div>
              <h2>2050</h2>
              <h4>Total Orders</h4>
            </div>
            <div>
              <ShoppingCartIcon sx={{ fontSize: 80 }} />
            </div>
          </div>

          <div className="card pink">
            <div>
              <h2>2050</h2>
              <h4>Total Users</h4>
            </div>
            <div>
              <PersonIcon sx={{ fontSize: 80 }} />
            </div>
          </div>

          <div className="card green">
            <div>
              <h2>2050</h2>
              <h4>Total Restaurants</h4>
            </div>
            <div>
              <RamenDiningIcon sx={{ fontSize: 80 }} />
            </div>
          </div>

          <div className="card yellow">
            <div>
              <h2>2050</h2>
              <h4>Total Revenue</h4>
            </div>
            <div>
              <MonetizationOnIcon sx={{ fontSize: 80 }} />
            </div>
          </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
