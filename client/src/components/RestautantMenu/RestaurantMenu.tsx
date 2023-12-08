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
import * as foodItemService from "@/services/fooditem-service";
import Restaurant from "@/models/restaurant";
import { useParams } from "next/navigation";
import { FoodItemPayload } from "@/interfaces/interfaces";

interface FoodItemsTableProps {
  menuItems: FoodItem[];
  restaurantId: string;
}

const FoodItemsTable: React.FC<FoodItemsTableProps> = ({
  menuItems,
  restaurantId,
}) => {
  const initialFoodItems = menuItems;

  // const [restaurant, setRestaurants] = useState<Restaurant>();
  const [foodItems, setFoodItems] = useState<FoodItem[]>(initialFoodItems);
  // const [restaurantId, setRestaurantId] = useState<string>();
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editFormData, setEditFormData] = useState<FoodItem | null>(null);
  const [formData, setFormData] = useState<FoodItem>({
    _id: "",
    name: "",
    foodImage: "",
    restaurantId: restaurantId,
    price: 0,
    rating: 0,
  });

  const handleAdd = async () => {
    const payload: FoodItemPayload = {
      name: formData.name,
      foodImage: formData.foodImage,
      restaurantId: restaurantId,
      price: formData.price,
      rating: formData.rating,
    };

    const newFoodItem = await foodItemService.createFoodItem(
      restaurantId,
      payload
    );
    setFoodItems((prevItems) => [...prevItems, newFoodItem]);
    setOpenAddModal(false);
    setFormData({
      _id: "",
      name: "",
      foodImage: "",
      restaurantId: restaurantId,
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
      restaurantId: restaurantId,
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
