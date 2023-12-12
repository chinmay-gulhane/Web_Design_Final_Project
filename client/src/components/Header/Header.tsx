"use client";
import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import Link from "next/link";
import "./header.css";
import { AppDispatch, useAppSelector } from "@/redux/store";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import ListIcon from "@mui/icons-material/List";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { authActions } from "@/redux/reducers/authSlice";

export default function PrimarySearchAppBar() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);

  const dispatch: AppDispatch = useDispatch();

  const user = useAppSelector((state) => state.auth.user);
  const cartItems = useAppSelector((state) => state.cart.cart);
  const router = useRouter();

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const navigateToCartPage = () => {
    router.push("/cart");
    handleMobileMenuClose();
  };

  const navigateToOrdersPage = () => {
    // for now routing to home page
    router.push("/restaurants");
    handleMenuClose();
    handleMobileMenuClose();
  };

  const navigateToLoginPage = () => {
    router.push("/login");
    handleMenuClose();
    handleMobileMenuClose();
  };

  const navigateToRegisterPage = () => {
    router.push("/register");
    handleMenuClose();
    handleMobileMenuClose();
  };

  const navigateToRestaurantRegisterPage = () => {
    router.push("/register-restaurant");
    handleMenuClose();
    handleMobileMenuClose();
  };

  const handleSignOut = () => {
    let token = localStorage.getItem("token");
    if (token) {
      localStorage.removeItem("token");
    }
    dispatch(authActions.logout());
    router.replace("/login");
    handleMenuClose();
    handleMobileMenuClose();
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={navigateToOrdersPage}>My Orders</MenuItem>
      <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {user ? (
        <div>
          <MenuItem onClick={navigateToCartPage}>
            <IconButton size="large" color="inherit">
              <Badge badgeContent={cartItems.length ? cartItems.length : "0"} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            <span>Cart</span>
          </MenuItem>
          <MenuItem onClick={navigateToOrdersPage}>
            <IconButton size="large" color="inherit">
              <ListIcon />
            </IconButton>
            <span>My Orders</span>
          </MenuItem>
          <MenuItem onClick={handleSignOut}>
            <IconButton size="large" color="inherit">
              <LogoutIcon />
            </IconButton>
            <span>Sign Out</span>
          </MenuItem>
        </div>
      ) : (
        <div>
          <MenuItem onClick={navigateToLoginPage}>
            <IconButton size="large" color="inherit">
              <LoginIcon />
            </IconButton>
            <span>Login</span>
          </MenuItem>
          <MenuItem onClick={navigateToRegisterPage}>
            <IconButton size="large" color="inherit">
              <HowToRegIcon />
            </IconButton>
            <span>Register as user</span>
          </MenuItem>
          <MenuItem onClick={navigateToRestaurantRegisterPage}>
            <IconButton size="large" color="inherit">
              <RestaurantIcon />
            </IconButton>
            <span>Register as restaurtant</span>
          </MenuItem>
        </div>
      )}
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" color="default">
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            <Link href={user ? "/restaurants" : "/login"} className="no-underline">
              <span className="company-first-word">Husky</span>
              <span className="company-last-word">Bites</span>
            </Link>
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" }, marginRight: "20px", columnGap: "15px" }}>
            {user && (
              <>
                <Link href="/cart" className="text-black">
                  <IconButton size="large" color="inherit">
                    <Badge badgeContent={cartItems.length ? cartItems.length : "0"} color="error">
                      <ShoppingCartIcon />
                    </Badge>
                  </IconButton>
                </Link>
              </>
            )}
            {user && (
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            )}
          </Box>
          <Box sx={{ display: { xs: "flex", md: `${user ? "none" : "flex"}`  } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
