// import React from "react";
// import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import HomeIcon from '@mui/icons-material/Home';
import SidebarDataItem from "@/models/types";




// SidebarData in SidebarData file
const AdminSidebarData: SidebarDataItem[] = [
  {
    title: "Home",
    link: "/home",
  },
  {
    title: "Users",
    // icon: <HomeIcon />,
    link: "/users",
  },
  {
    title: "Restaurants",
    // icon: <HomeIcon />,
    link: "/restaurants",
  },
  {
    title: "Orders",
    // icon: <HomeIcon/>,
    link: "/orders",
  },
];

export default AdminSidebarData;