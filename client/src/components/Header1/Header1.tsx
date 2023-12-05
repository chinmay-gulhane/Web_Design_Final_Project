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
import "./header1.css";
import Drawer from "@mui/material/Drawer";
// import { ThemeProvider } from "next-themes";
import {useState, useEffect} from 'react';
import { useTheme } from "next-themes";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDarkMode } from "../DarkModeContext";


export default function MenuAppBar() {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

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

  const commonThemeOptions = {
    typography: {
      fontFamily: 'Roboto, sans-serif', // Set your preferred font family
    },
  };

  const lightTheme = createTheme({
    ...commonThemeOptions,
    palette: {
      mode: 'light', // Enable light mode
      primary: {
        main: 'rgb(245, 245, 245)', // Set your primary color for light mode
      },
      secondary: {
        main: 'rgb(0, 255, 0)', // Set your secondary color for light mode
      }
      // You can customize other palette colors as needed
    },
  });
  const darkTheme = createTheme({
    ...commonThemeOptions,
    palette: {
      mode: 'dark', // Enable dark mode
      primary: {
        main: 'rgb(255,0,0)', // Set your primary color for dark mode
      },
      secondary: {
        main: 'rgb(0,255,0)', // Set your secondary color for dark mode
      }
      // You can customize other palette colors as needed
    },
  });

  const { theme,setTheme } = useTheme();

  // const [darkMode, setDarkMode] = React.useState(false);

  // const toggleDarkMode = () => {
  
  //   setDarkMode(!darkMode);

    
  //   setTheme(theme === 'dark' ? 'light' : 'dark');
  // };

  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
    <Box sx={{ flexGrow: 1 ,
      // backgroundColor: darkMode? "rgb(255,0,0)" : "rgb(0,0,255)" , 
      // color: darkMode ? 'rgb(255, 255, 255)' : 'rgb(0, 0, 0)',
       }}>
      
      <AppBar position="fixed" color="default">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
  anchor="left"
  open={drawerOpen}
  onClose={handleDrawerClose}
>
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
            <span className="company-last-word" style={{ color: 'inherit' }}>Bites</span>
            <span className="cart">
              <ShoppingCartIcon />
            </span>
            <span className="dark-mode" onClick={toggleDarkMode}>
              <DarkModeIcon />
            </span>
            
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
    </ThemeProvider>
  );
}
