import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Table } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../constant";
import { useDispatch } from "react-redux";
import { intialgetReducer } from "../Store/Slice";

const ItemsTable = ({ items, quantityColumn, priceColumn, name, edit }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const rowIndexItems = items.map((item, index) => ({
    ...item,
    index: index + 1,
  }));

  const handleDeleteItem = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/deleteitem/${id}`);
      if (response.status === 200) {
        // Handle successful deletion, e.g., show notification or update state
        console.log("Item deleted successfully");
        // Optionally, you can dispatch an action to update the Redux store
        // dispatch(intialgetReducer());
      }

      // Dispatch the initial get reducer to fetch items
      dispatch(intialgetReducer());
    } catch (error) {
      console.error("Error deleting item:", error);
      // Handle error, e.g., show notification
    }
  };

  const columns = [
    {
      title: "S.No",
      dataIndex: "index",
      key: "index",
      ellipsis: true,
      width: quantityColumn ? 0.5 : 0.4, // Adjust width based on quantityColumn
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ellipsis: true,
      width: 4,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      ellipsis: true,
      width: 0.5,
      hidden: !priceColumn,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      ellipsis: true,
      width: 0.6,
      hidden: !quantityColumn,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      ellipsis: true,
      width: 0.8,
    },
    {
      title: "",
      dataIndex: "_id",
      key: "_id",
      ellipsis: true,
      width: 0.5,
      hidden: !edit,
      render: (text, record) => {
        return (
          <span>
            <EditOutlined
              style={{ color: "blue", cursor: "pointer", marginRight: "10px" }}
              onClick={() => {
                navigate(`/items/edititem/${record._id}`);
              }}
            />

            <DeleteOutlined
              style={{ color: "red", cursor: "pointer" }}
              onClick={() => {
                handleDeleteItem(record._id);
              }}
            />
          </span>
        );
      },
    },
  ];

  return (
    <>
      <h1>{name}</h1>
    <div style={{ width: "90vw", marginTop: "25px", padding: "0 5vw" }}>
      <Table columns={columns} dataSource={rowIndexItems} />
    </div></>
  );
};

export default ItemsTable;
