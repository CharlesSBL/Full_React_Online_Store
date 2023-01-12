import React from "react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Outlet></Outlet>
      </div>
    </div>
  );
}
