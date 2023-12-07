import { Order } from "./order";
import { FormEvent, Dispatch, SetStateAction } from "react";

export interface CustomFormProps {
  formType: string;
}

export type loginData = {
  email: string;
  password: string;
};

export type registerData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  role: string
};

export type updatePasswordPayLoadType = {
  email: string;
  otp: string;
  password: string;
};

export type User = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  orderHistory: Order[];
  createdAt: string;
  updatedAt: string;
};

export type loginSuccessResponse = {
  success: boolean;
  message: string;
  user: User | null;
  token: string;
};

export type loginErrorResponse = {
  success: boolean;
  message: string;
  error: string;
};

export interface LoginFormProps {
  formHandler: (e: FormEvent<HTMLFormElement>) => void;
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
  showPassword: boolean;
  handleClickShowPassword: () => void;
}

export interface RegisterFormProps {
  formHandler: (e: FormEvent<HTMLFormElement>) => void;
  firstName: string;
  setFirstName: Dispatch<SetStateAction<string>>;
  lastName: string;
  setLastName: Dispatch<SetStateAction<string>>;
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
  phone: string;
  setPhone: Dispatch<SetStateAction<string>>;
  showPassword: boolean;
  handleClickShowPassword: () => void;
}

export interface GenerateOtpFormProps {
  formHandler: (e: FormEvent<HTMLFormElement>) => void;
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
}

export interface UpdatePasswordFormProps {
  formHandler: (e: FormEvent<HTMLFormElement>) => void;
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  otp: string;
  setOtp: Dispatch<SetStateAction<string>>;
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
  showPassword: boolean;
  handleClickShowPassword: () => void;
}

