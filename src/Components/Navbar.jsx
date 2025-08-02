import { Link, Outlet, useLocation } from "react-router-dom";
import "./Style.css";
import { useState } from "react";
const Navbar = () => {
  const location = useLocation();
  const [active, setActive] = useState(location.pathname.split("/")[2]);
  return (
    <div className="navbar">
      <Link
        to="/items/availableitems"
        onClick={() => {
          setActive("availableitems");
        }}
        className={
          active === "availableitems" ? `navbar_list active` : "navbar_list"
        }
      >
        Available Items
      </Link>
      <Link
        to="/items/availablesoon"
        onClick={() => {
          setActive("availablesoon");
        }}
        className={
          active === "availablesoon" ? `navbar_list active` : "navbar_list"
        }
      >
        Available Soon
      </Link>
      <Link
        to="/items/outofstock"
        onClick={() => {
          setActive("outofstock");
        }}
        className={
          active === "outofstock" ? `navbar_list active` : "navbar_list"
        }
      >
        Out Of Stock
      </Link>
      <Link
        to="/items/allitems"
        onClick={() => {
          setActive("allitems");
        }}
        className={
          active === "allitems" ? `navbar_list active` : "navbar_list"
        }
      >
        All Items
      </Link>
      <Link
        to="/items/addnewitem"
        onClick={() => {
          setActive("addnewitem");
        }}
        className={
          active === "addnewitem" ? `navbar_list active` : "navbar_list"
        }
      >
        Add New Item
      </Link>

      <Link
        to="/items/admin"
        onClick={() => {
          setActive("admin");
        }}
        className={
          active === "admin" ? `navbar_list active` : "navbar_list"
        }admin
      >
        Admin
      </Link>
    </div>
  );
};

export default Navbar;
