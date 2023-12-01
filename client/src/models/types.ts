export interface Product {
  _id: string;
  name: string;
  rating: number;
  profilePhoto: string;
}

export interface RatingProps {
  value: number; // assuming value is a number
  text: string;
  color: string;
}
