import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import HomeIcon from "@mui/icons-material/Home";

// SidebarData in SidebarData file
const AdminSidebarData: SidebarDataItem[] = [
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

export default AdminSidebarData;