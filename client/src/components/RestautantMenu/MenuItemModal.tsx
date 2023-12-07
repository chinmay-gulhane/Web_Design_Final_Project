// FoodItemModal.tsx
import React from "react";
import { Modal, TextField, Button } from "@material-ui/core";
import "./restaurant-menu.scss";
import FoodItem from "@/models/foodItem";

interface FoodItemModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  formData: FoodItem;
  onInputChange: (field: string, value: string | number) => void;
  onSubmit: () => void;
}

const FoodItemModal: React.FC<FoodItemModalProps> = ({
  open,
  onClose,
  title,
  formData,
  onInputChange,
  onSubmit,
}) => {
  const handleInputChange = (field: string, value: string | number) => {
    onInputChange(field, value);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="modal-content">
        <h2>{title}</h2>
        <TextField
          label="Food Item Name"
          value={formData.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
        />
        <TextField
          label="Food Image URL"
          value={formData.foodImage}
          onChange={(e) => handleInputChange("foodImage", e.target.value)}
        />
        <TextField
          label="Food Item Price"
          type="number"
          value={formData.price === undefined ? "" : String(formData.price)}
          onChange={(e) =>
            handleInputChange(
              "price",
              e.target.value !== "" ? parseFloat(e.target.value) : 0
            )
          }
        />
        <Button variant="contained" color="primary" onClick={onSubmit}>
          {title === "Add Food Item" ? "Add" : "Update"}
        </Button>
      </div>
    </Modal>
  );
};

export default FoodItemModal;
