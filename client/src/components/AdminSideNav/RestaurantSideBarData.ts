import React from "react";
// import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import HomeIcon from "@mui/icons-material/Home";
import SidebarDataItem from "@/models/types";

// SidebarData in SidebarData file
export const RestaurantSidebarData: SidebarDataItem[] = [
  {
    title: "Home",
    // icon: HomeIcon,
    link: "/home",
  },
  {
    title: "Menu",
    // icon: HomeIcon,
    link: "/restaurants",
  },
  {
    title: "Orders",
    // icon: HomeIcon,
    link: "/orders",
  },
];
