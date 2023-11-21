import { response } from "express";
import * as restaurantService from '../../services/Restaurant/restaurant-service.js';
import { setResponse, setErrorResponse } from "../response-handler.js";

export const createRestaurantController = async (request, response) => {
    try {
        const newRestaurant = { ...request.body };
        const restaurant = await restaurantService.createRestaurant(newRestaurant);
        setResponse(response, restaurant);
    } catch (error) {
        setErrorResponse(response, error);
    }
};

export const findRestaurantById = async (request, response) => {
    try {
        const id = request.params.id;
        const restaurant = await restaurantService.findRestaurantById(id);
        setResponse(response, restaurant);
    } catch (error) {
        setErrorResponse(response, error);
    }
};