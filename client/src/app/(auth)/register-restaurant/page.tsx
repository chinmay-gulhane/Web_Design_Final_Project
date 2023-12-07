"use client"
import React from "react";
import classes from "../../../styles/styles.module.css";
import CustomForm from "@/components/CustomForm";
import { useAppSelector } from "@/redux/store";
import Spinner from "@/components/Spinner/Spinner";

const RestaurantRegister = () => {
    const loading = useAppSelector((state) => state.auth.loading);
  
    return (
      <div className={`${classes.register_image} ${classes.auth_page}`}>
        <CustomForm formType={"restaurant-register"} />
        {loading && <Spinner />}
      </div>
    );
}

export default RestaurantRegister