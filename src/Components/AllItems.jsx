
import { useSelector } from "react-redux";
import ItemsTable from "./ItemsTable";

const AllItems = () => {

  const {items,admin} = useSelector((state) => state.store);
  return <ItemsTable items={items} priceColumn={true}  quantityColumn={true} edit={admin} name='All Items'/>
   
}; 

export default AllItems;
