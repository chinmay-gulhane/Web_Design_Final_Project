import { Order } from "@/models/order";
import axios, { AxiosResponse } from "axios";

const baseURL = "http://localhost:8080";
const API_URL = "/orders";

export const getAllOrders = async (): Promise<Order[]> => {
  try {
    const response: AxiosResponse<Order[]> = await axios.get(
      `${baseURL}${API_URL}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
