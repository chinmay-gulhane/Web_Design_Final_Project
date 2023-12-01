import React from "react";
import classes from "../../../styles/styles.module.css";
import CustomForm from "@/components/CustomForm";

const Register = () => {
  return (
    <div className={`${classes.register_image} ${classes.auth_page}`}>
      <CustomForm formType={"register"} />
    </div>
  );
};

export default Register;
