import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axiosInstance from "@/services/axios-service";
import { loginData, loginErrorResponse, registerData, updatePasswordPayLoadType } from "@/models/auth";
import { loginSuccessResponse } from "@/models/auth";

export const loginAction = createAsyncThunk(
  "auth/login",
  async (loginData: loginData) => {
    toast.dismiss();
    try {
      const response = await axiosInstance.post("/auth/login", loginData);
      const data = await response.data;
      if (data.success) {
        localStorage.setItem("token", `${data.token}`);
      }
      toast.success(data.message, {
        autoClose: 900,
      });
      // window.location.replace("/restaurants");
      console.log("data", data);
      return data;
    } catch (error: any) {
      toast.error(error.response.data.error, {
        autoClose: 900,
      });
      throw new Error(error.response.data.error);
    }
  }
);

export const registerAction = createAsyncThunk(
  "auth/register",
  async (registerData: registerData) => {
    toast.dismiss();
    try {
      const response = await axiosInstance.post("/auth/register", registerData);
      const data = await response.data;
      if (data.success) {
        toast.success(data.message, {
          autoClose: 900,
        });
        // window.location.replace("/login");
      }
      return data;
    } catch (error: any) {
      toast.error(error.response.data.error, {
        autoClose: 900,
      });
      throw new Error(error.response.data.error);
    }
  }
);

export const generateOtpAction = createAsyncThunk(
  "auth/generateOtp",
  async (email: string) => {
    toast.dismiss();
    try {
      const response = await axiosInstance.patch("/auth/generate-otp", { email });
      const data = await response.data;
      if (data.success) {
        toast.success(data.message, {
          autoClose: 900,
        });
        // window.location.replace("/login");
      }
      return data;
    } catch (error: any) {
      toast.error(error.response.data.error, {
        autoClose: 900,
      });
      throw new Error(error.response.data.error);
    }
  }
);

export const updatePasswordAction = createAsyncThunk(
  "auth/updatePassword",
  async (updatePasswordData: updatePasswordPayLoadType) => {
    toast.dismiss();
    try {
      const response = await axiosInstance.patch("/auth/update-password", updatePasswordData);
      const data = await response.data;
      if (data.success) {
        toast.success(data.message, {
          autoClose: 900,
        });
        // window.location.replace("/login");
      }
      return data;
    } catch (error: any) {
      toast.error(error.response.data.error, {
        autoClose: 900,
      });
      throw new Error(error.response.data.error);
    }
  }
);


