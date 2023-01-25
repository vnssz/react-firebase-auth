import { Menubar } from "primereact/menubar";
import React from "react";
import useAuth from "../firebase/useAuth";

const Navbar = () => {
  
  const items = [
    {
      label: "Home",
      icon: "pi pi-fw pi-home",
      url: "/",
    },
    {
      label: "Login",
      icon: "pi pi-fw pi-sign-in",
      url: "/login",
    },
    // {
    //   label: "Register",
    //   url: "/register",
    // },
  ];

  return <Menubar model={items} />;
};

export default Navbar;
