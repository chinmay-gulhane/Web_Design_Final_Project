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
    <Card className="border w-full md:w-[45%] rounded-5 py-3 px-2 m-3 border-gray-200 shadow-md hover:shadow-lg transition duration-300">
      <CardContent className="flex w-full justify-center">
        {/* <div className="flex"> */}
        <CardMedia
          sx={{ height: 100, width: 100 }}
          className="rounded-md mx-3 transform transition-transform hover:scale-110"
          image={
            typeof foodItem?.image === "string"
              ? foodItem.image
              : "/default-image.jpg"
          }
          title={foodItem.name}
        />
        <div className="flex flex-col mx-2">
          <div className="flex items-center">
            <Title
              title={foodItem.name}
              variant="h5"
              // className="text-xl font-semibold mb-2"
            ></Title>
            <div>
              <Image
                width={20}
                height={20}
                src="https://img.icons8.com/color/48/rating-circled.png"
                alt="rating-circled"
              />
              {foodItem.rating}
            </div>
          </div>
          {/* <Typography variant="body2" color="text.secondary" className="mb-1">
              Rating: {foodItem.rating}
            </Typography> */}
          <div className="flex w-full justify-between ">
            <Typography variant="body2" className="text-gray-600">
              Very nice food...
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              className="mb-1 ms-5"
            >
              ${foodItem.price.toFixed(2)}
            </Typography>
          </div>
          {/* <div className="my-2">
            <AddToCartButton
              foodItem={foodItem}
              foodItemQuantity={foodQuantity}
            />
          </div> */}
          {addButtonIsVisible ? (
            // <div>
            <AddToCartButton
              foodItem={foodItem}
              foodItemQuantity={foodQuantity}
            />
          ) : (
            // </div>
            <></>
          )}
        </div>
        {/* </div> */}
      </CardContent>
    </Card>
  );
};

export default FoodCard;
