import { useSelector } from "react-redux";
import ItemsTable from "./ItemsTable";

const AvailableItems = () => {
  const items = useSelector((state) =>
    state.store.items.filter((item) => item?.status === "Available")
  );
  
  return <ItemsTable items={items} priceColumn={true}  quantityColumn={true}  name='Available Items'/>;
};

export default AvailableItems;
