import Address from "./address";
import FoodItem from "./foodItem";

interface Restaurant {
  _id: string;
  name: string;
  foodItems: FoodItem[];
  rating: number;
  address: Address;
  phoneNumber: string;
  profilePhoto: string;
  email: string;
  password: string;
  cuisine: string[];
  offers: string[];
  __v: number;
}
