import React from "react";
import "./side-nav.scss";

interface SidebarProps {
  onSelect: (selected: string) => void;
  sidebarData: SidebarDataItem[];
}

const SideNav: React.FC<SidebarProps> = ({ onSelect, sidebarData }) => {
  return (
    <>
      <div className="side-nav">
        <ul className="side-bar-list">
          {sidebarData.map((val: SidebarDataItem, key: number) => {
            return (
              <li className="row" key={key} onClick={() => onSelect(val.title)}>
                <div>{val.title}</div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default SideNav;
