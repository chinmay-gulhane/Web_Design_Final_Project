import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FoodItem from "@/models/foodItem";

const FoodCard: React.FC<{ foodItem: FoodItem }> = ({ foodItem }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={foodItem.foodImage}
        title={foodItem.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {foodItem.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Price: ${foodItem.price.toFixed(2)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Rating: {foodItem.rating}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Add to Cart</Button>
        <Button size="small">View Details</Button>
      </CardActions>
    </Card>
  );
};

export default FoodCard;
