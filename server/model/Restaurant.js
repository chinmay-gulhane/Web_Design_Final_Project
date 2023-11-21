import mongoose, { Schema } from 'mongoose';
import FoodItemModel from './FoodItem.js';
import AddressModel from './Address.js';

const restaurantSchema = new Schema({
    id: {
        type: String,
        required: false,
    },
    foodItems: {
        type: [FoodItemModel.schema],
        required: false,
    },
    rating: {
        type: Number,
        required: false,
    },
    address: {
        type: AddressModel.schema,
        required: false,
    },
    phoneNumber: {
        type: String,
        required: false,
    },
    profilePhoto: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: false,
    },
    password: {
        type: String,
        required: false,
    },
    cuisine: {
        type: [String],
        required: false,
    },
    offers: {
        type: [String],
        required: false,
    },
});

const RestaurantModel = mongoose.model('Restaurant', restaurantSchema);

export default RestaurantModel;