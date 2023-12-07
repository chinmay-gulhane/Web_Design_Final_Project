interface FoodItem {
  _id: string;
  name: string;
  foodImage: string;
  restaurantId: string;
  price: number;
  rating: number;
}

export interface CartItem {
  foodItem: FoodItem;
  quantity: number;
}

export default FoodItem;
