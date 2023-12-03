import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import HomeIcon from "@mui/icons-material/Home";

// Use the same type definition for SidebarDataItem
interface SidebarDataItem {
  title: string;
  //   icon: React.ReactElement | React.ComponentType<any>;
  link: string;
}

// SidebarData in SidebarData file
export const SidebarData: SidebarDataItem[] = [
  {
    title: "Home",
    // icon: HomeIcon,
    link: "/home",
  },
  {
    title: "Users",
    // icon: HomeIcon,
    link: "/users",
  },
  {
    title: "Restaurants",
    // icon: HomeIcon,
    link: "/restaurants",
  },
  {
    title: "Orders",
    // icon: HomeIcon,
    link: "/orders",
  },
];
