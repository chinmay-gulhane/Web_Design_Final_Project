import React from "react";
import { Card } from "react-bootstrap";
import { CardContent, CardMedia, Typography } from "@mui/material";
import "./restaurant-card.scss";
import Restaurant from "@/models/restaurant";

import { useDarkMode } from "@/components/DarkModeContext";
import {useState, useEffect} from 'react';
import { useTheme } from "next-themes";
import { createTheme, ThemeProvider } from '@mui/material/styles';



const Products: React.FC<{ restaurant: Restaurant }> = ({ restaurant }) => {


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
    <>
      {/* <h1>Restaurent card</h1> */}
      <Card className="restaurant-card" style={{color: darkMode ? "white" : "black" , 
      backgroundColor: darkMode ? "black": "white"}}>
        {/* Image Section */}
        <CardMedia
          component="img"
          height="140" // Set the desired height for the image section
          image={restaurant.profilePhoto} // Replace with your image path
          alt="Your Image Alt Text"
          className="restaurant-image"
        />
        {/* Text Section */}
        <CardContent className="card-text-div">
          <Typography variant="h5" component="div" className="card-text">
            {/* Restaureant Name */}
            <div className="restaurant-name">{restaurant.name}</div>
            {/* Restaurant Rating */}
            <div className="restaurant-rating-div" style={{color: darkMode ? "white" : "black",
          backgroundColor: darkMode ? "white" : "black"}}>
              <div className="restaurant-rating-text" style={{color: darkMode ? "black" : "white"}}>{restaurant.rating}</div>
            </div>
          </Typography>
          {/* <Typography variant="body2" color="text.secondary">
            Some description or text content goes here.
          </Typography> */}
        </CardContent>
      </Card>

      {/* <Card>
        <Link href={""}>
          <Card.Img src={restaurant.image} variant="top"></Card.Img>
        </Link>

        <Card.Body>
          <Link href={""}>
            <Card.Title as="div" className="restaurant-title">
              <strong>{restaurant.name}</strong>
            </Card.Title>
          </Link>
          <Card.Text as="div">
            <Ratings
            value={restaurant.rating}
            text={`${restaurant.numReviews} reviews`}
            color={""}
          />
          </Card.Text>
          <Card.Text as="h3">${restaurant.price}</Card.Text>
        </Card.Body>
      </Card> */}
    </>
    </ThemeProvider>
  );
};

export default Products;
