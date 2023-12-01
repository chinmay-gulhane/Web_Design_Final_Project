import React, { FormEvent } from "react";
import classes from "../../../styles/styles.module.css";
import CustomForm from "@/components/CustomForm";

const Login: React.FC = () => {
  return (
    <div className={`${classes.login_image} ${classes.auth_page}`}>
      <CustomForm formType={"login"} />
    </div>
  );
};

export default Login;
