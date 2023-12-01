import { FoodItem } from "./foodItem";

export interface Restaurant {
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

interface Address {
  geolocation: {
    latitude: string;
    longitude: string;
  };
  addressLine: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  _id: string;
}
