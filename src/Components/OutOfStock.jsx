import React from "react";
import { useSelector } from "react-redux";
import ItemsTable from "./ItemsTable";

const OutOfStock = () => {
  let items = useSelector((state) =>
    state.store.items.filter((item) => item?.status === "Out Of Stock")
  );
  return <ItemsTable items={items} priceColumn={false}  quantityColumn={false} name='Out of Stock Items' />;
};

export default OutOfStock;
