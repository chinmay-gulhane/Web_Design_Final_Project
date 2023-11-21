import mongoose, { Schema } from 'mongoose';

const FoodItemSchema = new Schema({
    id: {
        type: String,
        required: false
    },
    foodImage: {
        type: String,
        required: false
    },
    restaurantId: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: false
    },
    rating: {
        type: Number,
        required: false
    }
});

const FoodItemModel = mongoose.model('FoodItem', FoodItemSchema);

export default FoodItemModel;