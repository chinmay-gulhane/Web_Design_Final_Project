// OrderDetails.tsx
"use client";
import React, { useEffect, useState } from "react";
import { Order } from "@/models/order";
import OrderCard from "@/components/CustomerOrder/OrderCard"; // Adjust the path accordingly
import { User } from "@/models/auth";
import { useAppSelector } from "@/redux/store";

const OrderDetails: React.FC = () => {
  const [pastOrders, setPastOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const user: User | null = useAppSelector((state) => state.auth.user);
  const userId = user ? user._id : null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // Replace with your API endpoint
        const response = await fetch(
          "http://localhost:8080/orders/search?page=1&pageSize=10&userId=" +
            userId
        );
        const data = await response.json();
        setPastOrders(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h5 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
        Past Orders
      </h5>
      {isLoading && <p>Loading...</p>}
      {!isLoading && pastOrders.length === 0 && <p>No past orders found.</p>}
      {!isLoading && pastOrders.length > 0 && (
        <div className="flex flex-wrap justify-content-around">
          {pastOrders.map((order) => (
            <OrderCard key={order._id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
