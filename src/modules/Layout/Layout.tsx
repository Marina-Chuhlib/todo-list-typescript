import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar/NavBar";

const Layout: React.FC = () => {
  return (
    <>
      <NavBar />
      <main>
        <Outlet />
      </main>
    </>
  );
};
export default Layout;
