import { User } from "./auth";

interface SidebarDataItem {
  title: string;
  //   icon: React.ReactElement | React.ComponentType<any>;
  link: string;
}

export interface UserResponse {
  success: boolean;
  message: string;
  users: User[];
}
