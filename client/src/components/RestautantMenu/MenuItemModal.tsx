// FoodItemModal.tsx
import React, { useState } from "react";
import { Modal, TextField, Button } from "@mui/material";
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
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  const handleInputChange = (field: string, value: string | number) => {
    onInputChange(field, value);

    // Clear validation errors when the user starts typing
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [field]: "",
    }));
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};

    // Basic validation for Food Item Name (required)
    if (!formData.name.trim()) {
      errors.name = "Food Item Name is required";
    }

    // Basic validation for Food Image URL (required)
    if (!formData.foodImage.trim()) {
      errors.foodImage = "Food Image URL is required";
    }

    // Basic validation for Food Item Price (required and must be a positive number)
    if (
      formData.price === undefined ||
      isNaN(formData.price) ||
      formData.price <= 0
    ) {
      errors.price = "Food Item Price must be a positive number";
    }

    setValidationErrors(errors);

    // Return true if there are no errors, indicating that the form is valid
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    // Validate the form before submitting
    if (validateForm()) {
      // Call the onSubmit callback if the form is valid
      onSubmit();
    }
  };

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <div className="modal-content">
          <div className="modal-header">
            <h2>{title}</h2>
          </div>
          <div className="modal-body">
            <div className="field-div">
              <TextField
                className="w-80"
                label="Food Item Name"
                value={formData.name}
                error={!!validationErrors.name}
                helperText={validationErrors.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
            </div>
            <div className="field-div">
              <TextField
                className="w-80"
                label="Food Image URL"
                value={formData.foodImage}
                error={!!validationErrors.foodImage}
                helperText={validationErrors.foodImage}
                onChange={(e) => handleInputChange("foodImage", e.target.value)}
              />
            </div>
            <div className="field-div">
              <TextField
                className="w-80"
                label="Food Item Price"
                type="number"
                value={
                  formData.price === undefined ? "" : String(formData.price)
                }
                error={!!validationErrors.price}
                helperText={validationErrors.price}
                onChange={(e) =>
                  handleInputChange(
                    "price",
                    e.target.value !== "" ? parseFloat(e.target.value) : 0
                  )
                }
              />
            </div>
            <div className="action-btns-div">
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                {title === "Add Food Item" ? "Save" : "Update"}
              </Button>
              <Button
                className="cancel-btn"
                variant="contained"
                color="primary"
                onClick={onClose}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default FoodItemModal;
