import React from "react";
import Chats from "./Chats"
import Navbar from "./Navbar";
import Room from "./Room";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Navbar />
      <Room />
      <Chats />
    </div>
  );
};

export default Sidebar;