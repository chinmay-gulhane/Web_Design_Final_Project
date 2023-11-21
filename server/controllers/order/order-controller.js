import { response } from "express";
import * as orderService from '../../services/Order/order-service.js';
import { setResponse, setErrorResponse } from "../response-handler.js";


export const find = async (request, response) => {
    try{
        const params = {...request.query}; //cloning the object as dont want to manipulate real req
        const course = await orderService.search(params);
        setResponse(response,course,);
    } catch (error){
        setErrorResponse(response,error);
    }
} 

export const post = async(request, response) => {
    
    try {
        const newOrder = {...request.body}; // to get actual json 
        const course = await orderService.save(newOrder);
        setResponse(response, course);

    } catch (error){
        setErrorResponse(response, error);
    }
}

export const get = async (request, response) => {
    try {
        const id = request.params.id;
        const course = await orderService.find(id);
        setResponse(response,course);
    } catch (error) {
        setErrorResponse(response,error);       
    }
}

export const put = async (request, response) => {
    try {
        try {
            const id = request.params.id;
            const updatedOrder = {...request.body};
            const course = await orderService.update(updatedOrder ,id);
            setResponse(response,course);
        } catch (error) {
            setErrorResponse(response,error);       
        }       
    } catch (error) {
        
    }
}

export const remove = async (request, response) => {
    try {
        const id = request.params.id;
        const course = await orderService.remove(id);
        setResponse(response,{});        
    } catch (error) {
        setErrorResponse(response, error);       
    }
}