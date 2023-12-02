"use client"
import React, { useEffect } from "react";
import classes from "../../../styles/styles.module.css";
import CustomForm from "@/components/CustomForm";
import { useAppSelector } from "@/redux/store";
import Spinner from "@/components/Spinner/Spinner";

const Login: React.FC = () => {

  const loading = useAppSelector((state) => state.auth.loading);
  
  return (
    <div className={`${classes.login_image} ${classes.auth_page}`}>
      <CustomForm formType={"login"} />
      {loading && <Spinner />}
    </div>
  );
};

export default Login;
