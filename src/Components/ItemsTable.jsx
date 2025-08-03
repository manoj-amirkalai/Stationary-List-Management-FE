import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { notification, Popconfirm, Table } from "antd";
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

  const [api, contextHolder] = notification.useNotification();
   const openNotification = (pauseOnHover) => () => {
    api.open({
      message: "Deleting Item",
      description: "Unable to Delete the item, please try again.",
      showProgress: true,
      pauseOnHover,
    });
  };

  const handleDeleteItem = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/deleteitem/${id}`);
      if (response.data.status === 200  ) {
        // Handle successful deletion, e.g., show notification or update state
        console.log("Item deleted successfully");
        // Optionally, you can dispatch an action to update the Redux store
        // Dispatch the initial get reducer to fetch items
        dispatch(intialgetReducer());
      }
    } catch (error) {
        openNotification(true)();
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
      {contextHolder}
            <EditOutlined
              style={{ color: "blue", cursor: "pointer", marginRight: "10px" }}
              onClick={() => {
                navigate(`/items/edititem/${record._id}`);
              }}
            />

            <Popconfirm
              title="Delete the task"
              description="Are you sure to delete this task?"
              onConfirm={() => {
                handleDeleteItem(record._id);
              }}
              okText="Yes"
              cancelText="No"
            >
              {" "}
              <DeleteOutlined style={{ color: "red", cursor: "pointer" }} />
            </Popconfirm>
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
      </div>
    </>
  );
};

export default ItemsTable;
