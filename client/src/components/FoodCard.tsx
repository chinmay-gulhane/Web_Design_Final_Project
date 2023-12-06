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
    <Card className="border border-gray-200 shadow-md hover:shadow-lg transition duration-300">
      <CardContent className="flex justify-between items-center">
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
        <div className="w-1/3">
          <CardMedia
            sx={{ height: 140 }}
            image="/images/restaurant.jpg"
            title={foodItem.name}
          />
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
