interface FoodItem {
  _id: string;
  name: string;
  foodImage: string;
  restaurantId: string;
  price: number;
  rating: number;
  image?: File | null;
}

export interface FoodItemPayload {
  name: string;
  foodImage: string;
  restaurantId: string;
  price: number;
  rating: number;
  image?: File | null;
}

export interface CartItem {
  foodItem: FoodItem;
  quantity: number;
}

export default FoodItem;
