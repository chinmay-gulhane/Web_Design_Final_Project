import { setErrorResponse } from "../../../controllers/response-handler.js";
import FoodItemModel from "../../../model/FoodItem.js";
import RestaurantModel from "../../../model/Restaurant.js";

// Creates foodItem
export const createFoodItem = async (newFoodItem, restaurantId) => {
    const restaurant = await RestaurantModel.findById(restaurantId).exec();
    if (!restaurant) {
        throw new Error('Restaurant not found');
    }
    const foodItem = new FoodItemModel(newFoodItem);
    restaurant.foodItems.push(foodItem);
    restaurant.save();
    return await foodItem.save();
};

// Fetches foodItems
export const getAllFoodItems = async (restaurantId) => {
    try {
        const restaurant = await RestaurantModel.findById(restaurantId).exec();
        const foodItems = restaurant.foodItems;
        return foodItems
    } catch (error) {
        console.error(error);
    }
};

// Get foodItem by id
export const findFoodItemById = async (foodItemId, restaurantId) => {
    let foodItem = await FoodItemModel.findById(foodItemId).exec();
    if (!foodItem) {
        const restaurant = await RestaurantModel.findById(restaurantId).exec();
        for (let restaurantFoodItem of restaurant.foodItems) {
            if (foodItemId === restaurantFoodItem.id) {
                foodItem = restaurantFoodItem;
                break;
            }
        }
    }
    return foodItem;
};

// Update foodItem
export const updateFoodItem = async (id, foodItemUpdateData) => {
    const foodItem = await FoodItemModel.findByIdAndUpdate(id, foodItemUpdateData).exec();
    return foodItem;
}
// Delete foodItem
export const deleteFoodItem = async (id) => {
    return await FoodItemModel.findByIdAndDelete(id).exec();
}