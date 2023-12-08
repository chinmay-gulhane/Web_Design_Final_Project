// FoodItemsTable.tsx
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
import { AiFillEdit, AiOutlineDelete } from "react-icons/ai";
import "./restaurant-menu.scss";
import FoodItemModal from "./MenuItemModal";
import FoodItem from "@/models/foodItem";
import * as foodItemService from "@/services/fooditem-service";
import { FoodItemPayload } from "@/interfaces/interfaces";
import Paper from "@mui/material/Paper";
import { FaEdit, FaTrash } from "react-icons/fa";

interface FoodItemsTableProps {
  menuItems: FoodItem[];
  restaurantId: string;
}

const FoodItemsTable: React.FC<FoodItemsTableProps> = ({
  menuItems,
  restaurantId,
}) => {
  // Initial state setup
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

  // Add a new food item
  const handleAdd = async () => {
    const payload: FoodItemPayload = {
      name: formData.name,
      foodImage: formData.foodImage,
      restaurantId: restaurantId,
      price: formData.price,
      rating: formData.rating,
    };

    // Call API to create a new food item
    const newFoodItem = await foodItemService.createFoodItem(
      restaurantId,
      payload
    );

    // Update local state with the new food item
    setFoodItems((prevItems) => [...prevItems, newFoodItem]);
    setOpenAddModal(false);

    // Reset the form data
    setFormData({
      _id: "",
      name: "",
      foodImage: "",
      restaurantId: restaurantId,
      price: 0,
      rating: 0,
    });
  };

  // Edit an existing food item
  const handleEdit = async () => {
    try {
      if (editFormData) {
        // Call API to update the existing food item
        const updatedFoodItem = await foodItemService.updateFoodItem(
          restaurantId,
          editFormData._id,
          formData
        );

        // Update local state with the updated food item
        setFoodItems((prevItems) =>
          prevItems.map((item) =>
            item._id === updatedFoodItem._id ? updatedFoodItem : item
          )
        );

        setOpenEditModal(false);
        setEditFormData(null);

        // Reset the form data
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
      // Handle error, e.g., display an error message
    }
  };

  // Initiate the delete process
  const handleDeleteClick = (name: string) => {
    // Set the item to be deleted and open the delete confirmation modal
    setEditFormData(foodItems.find((item) => item.name === name) || null);
    setOpenDeleteModal(true);
  };

  // Confirm the delete action
  const handleDeleteConfirm = async () => {
    if (editFormData) {
      try {
        // Call API to delete the selected food item
        await foodItemService.deleteFoodItem(restaurantId, editFormData._id);

        // Update local state after deletion
        setFoodItems((prevItems) =>
          prevItems.filter((item) => item._id !== editFormData._id)
        );

        setOpenDeleteModal(false);
      } catch (error) {
        console.error("Error deleting food item:", error);
        // Handle error, e.g., display an error message
      }
    }
  };

  // Cancel the delete action
  const handleDeleteCancel = () => {
    setOpenDeleteModal(false);
  };

  // Edit an existing food item
  const handleEditClick = (item: FoodItem) => {
    setEditFormData(item);
    setFormData(item);
    setOpenEditModal(true);
  };

  // Handle input changes in the form
  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  // Handle search input changes
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  // Filter food items based on search term
  const filteredFoodItems = foodItems.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {/* Header */}
      <div className="header-div">
        <div className="title-div w-30">
          <span className="page-header">Menu</span>
        </div>
        {/* Search Bar */}
        <div className="search-bar w-40">
          <TextField
            label="Search Food Items"
            variant="outlined"
            className="w-80"
            onChange={(e) => handleSearchChange(e.target.value)}
          />
        </div>
        <div className="add-food-item-btn-div w-30">
          {/* Add Food Item button */}
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

      {/* Table Container */}
      <div className="tbl-container">
        {/* Table */}
        <TableContainer component={Paper}>
          <Table className="food-items-table">
            {/* Table Header */}
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
            {/* Table Body */}
            <TableBody>
              {filteredFoodItems.map((item) => (
                <TableRow key={item._id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.foodImage}</TableCell>
                  <TableCell align="center">{item.price} $</TableCell>
                  {/* Edit and Delete buttons */}
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

      {/* Modals */}
      {/* Add Food Item Modal */}
      <FoodItemModal
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        title="Add Food Item"
        formData={formData}
        onInputChange={handleInputChange}
        onSubmit={handleAdd}
      />

      {/* Edit Food Item Modal */}
      <FoodItemModal
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
        title="Edit Food Item"
        formData={formData}
        onInputChange={handleInputChange}
        onSubmit={handleEdit}
      />

      {/* Delete Confirmation Modal */}
      <Dialog open={openDeleteModal} onClose={handleDeleteCancel}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this food item?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {/* Cancel and Delete buttons */}
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
