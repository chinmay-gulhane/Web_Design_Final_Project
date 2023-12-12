import React, { ReactNode } from "react";
import { User } from "./auth";

interface SidebarDataItem {
  title: string;
  icon?: any;
  //   icon: React.ReactElement | React.ComponentType<any>;
  link: string;
}
export default SidebarDataItem;

export interface UserResponse {
  success: boolean;
  message: string;
  users: User[];
}
