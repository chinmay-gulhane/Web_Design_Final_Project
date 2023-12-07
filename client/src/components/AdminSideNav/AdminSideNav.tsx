import React from "react";
import "./admin-side-nav.scss";
import { SidebarData as SidebarDataImported } from "./SidebarData";
import Link from "next/link";

// Use the same type definition for SidebarDataItem
interface SidebarDataItem {
  title: string;
  // icon: React.ReactElement; // Use React.ReactElement
  link: string;
}
interface SidebarProps {
  onSelect: (selected: string) => void;
}

const AdminSideNav: React.FC<SidebarProps> = ({ onSelect }) => {
  return (
    <>
      <div className="side-nav">
        <h2>Admin</h2>
        <ul className="side-bar-list">
          {SidebarDataImported.map((val: SidebarDataItem, key: number) => {
            return (
              <li className="row" key={key} onClick={() => onSelect(val.title)}>
                {/* <Link href={`/${val.link}`}> */}
                <div>{val.title}</div>
                {/* </Link> */}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default AdminSideNav;
