import React from "react";
import { useSelector } from "react-redux";
import ItemsTable from "./ItemsTable";

const AvailableSoon = () => {
  let items = useSelector((state) =>
    state.store.items.filter((item) => item?.status === "Available Soon")
  );
  return <ItemsTable items={items} priceColumn={true}  quantityColumn={true}  name='Available Soon Items'/>;
};

export default AvailableSoon;
