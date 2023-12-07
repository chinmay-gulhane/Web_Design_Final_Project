// FoodItemsTable.tsx
import React, { useEffect, useState } from "react";
import {
  Button,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@material-ui/core";
import { AiFillEdit, AiOutlineDelete } from "react-icons/ai";
import "./restaurant-menu.scss";
import FoodItemModal from "./MenuItemModal";
import FoodItem from "@/models/foodItem";
import * as restaurantService from "@/services/restaurant-service";
import Restaurant from "@/models/restaurant";
import { useParams } from "next/navigation";

const initialFoodItems: FoodItem[] = [
  {
    _id: "",
    name: "Pizza",
    foodImage: "image1.jpg",
    restaurantId: "1",
    price: 10.99,
    rating: 4.5,
  },
  {
    _id: "",
    name: "Burger",
    foodImage: "image2.jpg",
    restaurantId: "2",
    price: 5.99,
    rating: 4.0,
  },
];

const FoodItemsTable: React.FC = () => {
  // const [restaurant, setRestaurants] = useState<Restaurant>();
  const [foodItems, setFoodItems] = useState<FoodItem[]>(initialFoodItems);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editFormData, setEditFormData] = useState<FoodItem | null>(null);
  const [formData, setFormData] = useState<FoodItem>({
    _id: "",
    name: "",
    foodImage: "",
    restaurantId: "",
    price: 0,
    rating: 0,
  });

  // const params = useParams();
  // useEffect(() => {
  // console.log("params", params);
  // const fetchData = async () => {
  // try {
  //   const data = await restaurantService.getRestaurantById(params.restaurant);
  //   setRestaurants(data);
  // } catch (err: unknown) {
  //   if (err instanceof Error) {
  //     setError(err);
  //   } else {
  //     setError(new Error("An unknown error occurred"));
  //   }
  // } finally {
  //   setLoading(false);
  // }
  // };

  // fetchData();
  // }, []);

  const handleAdd = () => {
    setFoodItems((prevItems) => [
      ...prevItems,
      {
        _id: "",
        name: formData.name,
        foodImage: formData.foodImage,
        restaurantId: formData.restaurantId,
        price: formData.price,
        rating: formData.rating,
      },
    ]);
    setOpenAddModal(false);
    setFormData({
      _id: "",
      name: "",
      foodImage: "",
      restaurantId: "",
      price: 0,
      rating: 0,
    });
  };

  const handleEdit = () => {
    setFoodItems((prevItems) =>
      prevItems.map((item) =>
        item.name === editFormData?.name
          ? {
              ...item,
              ...formData,
            }
          : item
      )
    );
    setOpenEditModal(false);
    setEditFormData(null);
    setFormData({
      _id: "",
      name: "",
      foodImage: "",
      restaurantId: "",
      price: 0,
      rating: 0,
    });
  };

  const handleDelete = (name: string) => {
    setFoodItems((prevItems) => prevItems.filter((item) => item.name !== name));
  };

  const handleEditClick = (item: FoodItem) => {
    setEditFormData(item);
    setFormData(item);
    setOpenEditModal(true);
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpenAddModal(true)}
      >
        Add Food Item
      </Button>

      {/* Table */}
      <TableContainer>
        <Table className="food-items-table">
          <TableHead>
            <TableRow>
              <TableCell>Food Item Name</TableCell>
              <TableCell>Food Image URL</TableCell>
              <TableCell>Food Item Price</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {foodItems.map((item) => (
              <TableRow key={item.name}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.foodImage}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleEditClick(item)}
                    startIcon={<AiFillEdit />}
                  >
                    Edit
                  </Button>{" "}
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDelete(item.name)}
                    startIcon={<AiOutlineDelete />}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modals */}
      <FoodItemModal
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        title="Add Food Item"
        formData={formData}
        onInputChange={handleInputChange}
        onSubmit={handleAdd}
      />

      <FoodItemModal
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
        title="Edit Food Item"
        formData={formData}
        onInputChange={handleInputChange}
        onSubmit={handleEdit}
      />
    </div>
  );
};

export default FoodItemsTable;
