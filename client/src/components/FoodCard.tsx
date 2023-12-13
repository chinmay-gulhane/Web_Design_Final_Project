import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import FoodItem from "@/models/foodItem";
import Title from "./Title";
import AddToCartButton from "./Restaurant/AddToCartButton";
import Image from "next/image";

const FoodCard: React.FC<{
  foodItem: FoodItem;
  foodQuantity: number;
  addButtonIsVisible: boolean;
}> = ({ foodItem, foodQuantity, addButtonIsVisible }) => {
  return (
    <Card className="border w-full rounded-5 py-3 px-2 m-3 border-gray-200 shadow-md hover:shadow-lg transition duration-300">
      <CardContent className="flex w-full justify-between">
        <CardMedia
          sx={{ height: 120, width: 150 }}
          className="rounded-md mx-3 transform transition-transform hover:scale-110"
          image={
            typeof foodItem?.image === "string"
              ? foodItem.image
              : "/default-image.jpg"
          }
          title={foodItem.name}
        />
        <div className="flex flex-col mx-2">
          <div className="flex items-center gap-3">
            <Title title={foodItem.name} variant="h5"></Title>
            <div>
              <Image
                width={20}
                height={20}
                src="https://img.icons8.com/color/48/rating-circled.png"
                alt="rating-circled"
              />
              <span className="form-control-color">{foodItem.rating}</span>
            </div>
          </div>
          <div className="flex w-full justify-between ">
            <Typography variant="body2" color="text.secondary" className="">
              ${foodItem.price.toFixed(2)}
            </Typography>
          </div>
          {addButtonIsVisible ? (
            <AddToCartButton
              foodItem={foodItem}
              foodItemQuantity={foodQuantity}
            />
          ) : (
            <></>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default FoodCard;
