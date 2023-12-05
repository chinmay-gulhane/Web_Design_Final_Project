/* eslint-disable @next/next/no-img-element */
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
import "./Footer.css";
import logo from "./logo.jpg";
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import TranslateIcon from '@mui/icons-material/Translate';

import Image from "next/image";

import { useDarkMode } from "@/components/DarkModeContext";
import {useState, useEffect} from 'react';
import { useTheme } from "next-themes";
import { createTheme, ThemeProvider } from '@mui/material/styles';

export default function Footer() {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

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

  const { darkMode } = useDarkMode();

  return (


   <ThemeProvider theme={darkMode ? darkTheme : lightTheme}> 
   
    <footer className="footer">
    <Box sx={{ flexGrow: 1 ,
      backgroundColor: darkMode? "black" : "whitesmoke" , 
      color: darkMode ? 'white' : 'black',
       }}>

        <div className="footer-content">
            <div className="left-content">
        <p className="footer-name">
        <span className="first-name">Husky</span>
        <span className="last-name" style={{color: darkMode ? "white" : "black"}}>Bites</span>
        
        </p>
        
        <div className="Logo">
        <Image src={logo} 
        width={150}       
        height={150} 
         alt="Eeuu"/>
         </div>
        
        <div className="socials" >
            <span> 
            
            <FacebookIcon className="icon"/>
            <InstagramIcon className="icon" />
            <TwitterIcon className="icon" />

            </span>
            

        </div>

        </div>
        <div className="right-content" style={{color: darkMode ? "white" : "black"}}>
            <p>Get Help</p>
            <p>About Us</p>
            <p><TranslateIcon /> English</p>


        </div>

        </div>

        </Box>
    </footer>
    
    </ThemeProvider>
    
    
  );
}
