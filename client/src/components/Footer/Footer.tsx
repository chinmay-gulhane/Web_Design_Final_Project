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
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import TranslateIcon from "@mui/icons-material/Translate";
import CopyrightIcon from "@mui/icons-material/Copyright";

import Image from "next/image";

import { useState, useEffect } from "react";

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
      fontFamily: "Roboto, sans-serif", // Set your preferred font family
    },
  };
  return (
    <footer className="footer">
      <Box
        sx={{
          flexGrow: 1,
          backgroundColor: "whitesmoke",
          color: "red",
        }}
      >
        <div className="footer-content">
          <div className="left-content">
            {/* <div className="Logo"> */}
            <Image
              src={logo}
              width={150}
              height={150}
              alt="Eeuu"
              className="image"
            />
            {/* </div> */}
            <div className="footer-name">
              <p>
                <span className="first-name">Husky</span>
                <span className="last-name" style={{ color: "black" }}>
                  Bites
                </span>
              </p>
              <div className="copyright">
                <p>
                  Copyright <CopyrightIcon className="copy-logo" /> 2023 - 2016
                  HuskyBites
                </p>
                <p>Shree</p>
              </div>
            </div>
          </div>

          <div className="center-content">
            <span>
              <FacebookIcon className="icon" /> |
              <InstagramIcon className="icon" /> |
              <TwitterIcon className="icon" />
            </span>
          </div>

          <div className="right-content" style={{ color: "black" }}>
            <p>Get Help</p>
            <p>About Us</p>
            <p>
              <TranslateIcon /> English
            </p>
          </div>
        </div>
      </Box>
    </footer>
  );
}
