import React, { useState } from "react";
import {
  Button,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField, // Import TextField for the search bar
} from "@mui/material";
import { FaEdit, FaTrash } from "react-icons/fa";
import "./restaurant-menu.scss";
import FoodItemModal from "./MenuItemModal";
import FoodItem, { FoodItemPayload } from "@/models/foodItem";
import * as foodItemService from "@/services/fooditem-service";
import Paper from "@mui/material/Paper";

interface FoodItemsTableProps {
  menuItems: FoodItem[];
  restaurantId: string;
}

const FoodItemsTable: React.FC<FoodItemsTableProps> = ({
  menuItems,
  restaurantId,
}) => {
  const initialFoodItems = menuItems;
  const [foodItems, setFoodItems] = useState<FoodItem[]>(initialFoodItems);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [editFormData, setEditFormData] = useState<FoodItem | null>(null);
  const [formData, setFormData] = useState<FoodItem>({
    _id: "",
    name: "",
    foodImage: "",
    restaurantId: restaurantId,
    price: 0,
    rating: 0,
  });
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleAdd = async () => {
    const payload: FoodItemPayload = {
      name: formData.name,
      foodImage: formData.foodImage,
      image: formData.image,
      restaurantId: restaurantId,
      price: formData.price,
      rating: formData.rating,
    };

    console.log("payload", payload);

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

  const handleEdit = async () => {
    try {
      if (editFormData) {
        const updatedFoodItem = await foodItemService.updateFoodItem(
          restaurantId,
          editFormData._id,
          formData
        );

        setFoodItems((prevItems) =>
          prevItems.map((item) =>
            item._id === updatedFoodItem._id ? updatedFoodItem : item
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
      }
    } catch (error) {
      console.error("Error updating food item:", error);
    }
  };

  const handleDeleteClick = (name: string) => {
    setEditFormData(foodItems.find((item) => item.name === name) || null);
    setOpenDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (editFormData) {
      try {
        await foodItemService.deleteFoodItem(restaurantId, editFormData._id);

        setFoodItems((prevItems) =>
          prevItems.filter((item) => item._id !== editFormData._id)
        );

        setOpenDeleteModal(false);
      } catch (error) {
        console.error("Error deleting food item:", error);
      }
    }
  };

  const handleDeleteCancel = () => {
    setOpenDeleteModal(false);
  };

  const handleEditClick = (item: FoodItem) => {
    setEditFormData(item);
    setFormData(item);
    setOpenEditModal(true);
  };

  const handleInputChange = (
    field: string,
    value: string | number | File | null
  ) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const filteredFoodItems = foodItems.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="header-div">
        <div className="title-div w-30">
          <span className="page-header">Menu</span>
        </div>
        <div className="search-bar w-40">
          <TextField
            label="Search Food Items"
            variant="outlined"
            className="w-80"
            onChange={(e) => handleSearchChange(e.target.value)}
          />
        </div>
        <div className="add-food-item-btn-div w-30">
          <Button
            className="add-food-item-btn"
            variant="contained"
            color="primary"
            onClick={() => setOpenAddModal(true)}
          >
            Add Food Item
          </Button>
        </div>
      </div>

      <div className="tbl-container">
        <TableContainer component={Paper}>
          <Table className="food-items-table">
            <TableHead>
              <TableRow>
                <TableCell className="table-header">Food Item Name</TableCell>
                <TableCell className="table-header">Food Image URL</TableCell>
                <TableCell className="table-header" align="center">
                  Food Item Price
                </TableCell>
                <TableCell className="table-header" align="center">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredFoodItems.map((item) => (
                <TableRow key={item._id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>
                    {item.image && (
                      <img
                        src={`${item.image}`}
                        alt="Food Item"
                        className="food-item-image"
                      />
                    )}
                  </TableCell>
                  <TableCell align="center">{item.price} $</TableCell>
                  <TableCell align="center">
                    <Button
                      className="edit-btn"
                      variant="contained"
                      onClick={() => handleEditClick(item)}
                    >
                      <FaEdit />
                    </Button>{" "}
                    <Button
                      className="delete-btn"
                      variant="contained"
                      onClick={() => handleDeleteClick(item.name)}
                    >
                      <FaTrash />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

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

      <Dialog open={openDeleteModal} onClose={handleDeleteCancel}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this food item?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FoodItemsTable;
