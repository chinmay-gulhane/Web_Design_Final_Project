import RestaurantModel from "../../model/Restaurant.js";

// Creates restaurant
export const createRestaurant = async (newRestaurant) => {
    const restaurant = new RestaurantModel(newRestaurant);
    return await restaurant.save();
};

// Fetches restaurants
export const getAllRestaurants = async () => {
    try {
        const restaurants = await RestaurantModel.find().exec();
        return restaurants
    } catch (error) {
        console.error(error);
    }
};

// Get restaurant by id
export const findRestaurantById = async (id) => {
    console.log("search");
    const restaurant = await RestaurantModel.findById(id).exec();
    console.log("search");
    return restaurant;
};