"use client";
import React, { useState, FormEvent, FormEventHandler } from "react";
import { getOtpService, loginService, registerService, updatePasswordService } from "@/services/auth-service";
import { useRouter } from "next/navigation";
import LoginForm from "./AuthenticationForms/LoginForm";
import RegisterForm from "./AuthenticationForms/RegisterForm";
import GenerateOtpForm from "./AuthenticationForms/GenerateOtpForm";
import UpdatePasswordForm from "./AuthenticationForms/UpdatePasswordForm";
import { CustomFormProps } from "@/models/auth";
import { Role } from "@/enums/constants";
import RestaurantRegiserForm from "./AuthenticationForms/RestaurantRegisterForm";

const CustomForm: React.FC<CustomFormProps> = ({ formType }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");

  const [hidePasswordUpdationForm, setHidePasswordUpdationForm] = useState(true);

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const router = useRouter();

  const formHandler: FormEventHandler<HTMLFormElement> = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formType === "login") {
      loginService({ email, password }).then((dispatchedResult: any) => {
        if (!dispatchedResult.error) {
          router.push("/restaurants");
        }
      });
    } else if (formType === "register") {
      registerService({
        firstName,
        lastName,
        email,
        password,
        phone,
        role: Role.USER,
      }).then((dispatchedResult: any) => {
        if (!dispatchedResult.error) {
          router.push("/login");
        }
      });
    } else if (formType === "forgot-password" && hidePasswordUpdationForm) {
      getOtpService(email).then((dispatchedResult: any) => {
        if (!dispatchedResult.error) {
          setHidePasswordUpdationForm(false);
        }
      });
    } else if (formType === "forgot-password" && !hidePasswordUpdationForm) {
      updatePasswordService({ email, otp, password }).then((dispatchedResult: any) => {
        if (!dispatchedResult.error) {
          router.push("/login");
        }
      });
    }
  };

  return (
    <>
      {formType === "register" && (
        <RegisterForm
          formHandler={formHandler}
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          phone={phone}
          setPhone={setPhone}
          showPassword={showPassword}
          handleClickShowPassword={handleClickShowPassword}
        />
      )}

      {formType === "restaurant-register" && (
        <RestaurantRegiserForm
          formHandler={formHandler}
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          phone={phone}
          setPhone={setPhone}
          showPassword={showPassword}
          handleClickShowPassword={handleClickShowPassword}
        />
      )}

      {formType === "login" && (
        <LoginForm
          formHandler={formHandler}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          showPassword={showPassword}
          handleClickShowPassword={handleClickShowPassword}
        />
      )}

      {formType === "forgot-password" && hidePasswordUpdationForm && (
        <GenerateOtpForm formHandler={formHandler} email={email} setEmail={setEmail} />
      )}

      {formType === "forgot-password" && !hidePasswordUpdationForm && (
        <UpdatePasswordForm
          formHandler={formHandler}
          email={email}
          setEmail={setEmail}
          otp={otp}
          setOtp={setOtp}
          password={password}
          setPassword={setPassword}
          showPassword={showPassword}
          handleClickShowPassword={handleClickShowPassword}
        />
      )}
    </>
  );
};

export default CustomForm;
