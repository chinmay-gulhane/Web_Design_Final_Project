import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FoodItem from "@/models/foodItem";
import Title from "./Title";
import AddToCartButton from "./Restaurant/AddToCartButton";

const FoodCard: React.FC<{ foodItem: FoodItem; foodQuantity: number }> = ({
  foodItem,
  foodQuantity,
}) => {
  return (
    <Card className="border rounded-5 py-3 px-2 m-3 border-gray-200 shadow-md hover:shadow-lg transition duration-300">
      <CardContent className="flex justify-content-around items-center">
        <div className="flex height:5rem">
          <CardMedia
            sx={{ height: 100, width: 100 }}
            className="rounded-md mx-3 transform transition-transform hover:scale-110"
            image="/images/restaurant.jpg"
            title={foodItem.name}
          />
          <div className="flex flex-col">
            <Title
              title={foodItem.name}
              variant="h5"
              // className="text-xl font-semibold mb-2"
            ></Title>
            <Typography variant="body2" color="text.secondary" className="mb-1">
              Price: ${foodItem.price.toFixed(2)}
            </Typography>
            <Typography variant="body2" color="text.secondary" className="mb-1">
              Rating: {foodItem.rating}
            </Typography>
            <Typography variant="body2" className="text-gray-600">
              Very nice food...
            </Typography>
          </div>
        </div>
        <div className="">
          <AddToCartButton
            foodItem={foodItem}
            foodItemQuantity={foodQuantity}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default FoodCard;
