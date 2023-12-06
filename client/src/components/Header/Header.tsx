"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import "./header.css";
import Drawer from "@mui/material/Drawer";
import Cart from "../Cart/CartComponent";
import Link from "next/link";
import { useAppSelector } from "@/redux/store";

export default function MenuAppBar() {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const cartItems = useAppSelector((state) => state.cart.items);

  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [darkMode, setDarkMode] = React.useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        backgroundColor: darkMode ? "#333" : "inherit",
        color: darkMode ? "#fff" : "inherit",
      }}
    >
      <AppBar position="fixed" color="default">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <div className="flex">
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: { sm: 0, md: 2 } }}
              onClick={handleDrawerOpen}
            >
              <MenuIcon />
            </IconButton>

            <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerClose}>
              <div className="drawer">
                <MenuItem onClick={handleDrawerClose}>Manage Profile</MenuItem>
                <MenuItem onClick={handleDrawerClose}>My Orders</MenuItem>
                <MenuItem onClick={handleDrawerClose}>Help</MenuItem>
              </div>
            </Drawer>

            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
              className="company-name"
            >
              <span className="company-first-word">Husky</span>
              <span className="company-last-word">Bites</span>
            </Typography>
          </div>
          <div className="user-actions">
            <span className="dark-mode" onClick={toggleDarkMode}>
              <DarkModeIcon />
            </span>
            <span className="cart">
              <Link href={`/cart`}>
                <ShoppingCartIcon className="" />
                <span className="cart-badge">{cartItems.length}</span>
              </Link>
              {/* <Cart /> */}
            </span>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
