
import { useSelector } from "react-redux";
import ItemsTable from "./ItemsTable";

const AllItems = () => {

  const items = useSelector((state) => state.store.items);
  return <ItemsTable items={items} priceColumn={true}  quantityColumn={true} edit={true} name='All Items'/>
   
}; 

export default AllItems;
