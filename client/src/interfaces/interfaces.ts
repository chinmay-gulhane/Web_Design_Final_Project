export interface FoodItem {
  name: string;
  foodImage: string;
  restaurantId: string;
  price: number;
  rating: number;
  _id: string;
}

export interface FoodItemPayload {
  name: string;
  foodImage: string;
  restaurantId: string;
  price: number;
  rating: number;
}
