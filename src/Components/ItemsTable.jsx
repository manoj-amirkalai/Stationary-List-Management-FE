import React, { useState, useRef } from "react";
import { DeleteOutlined, EditOutlined, SearchOutlined } from "@ant-design/icons";
import { notification, Popconfirm, Table, Input, Button, Space } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../constant";
import { useDispatch, useSelector } from "react-redux";
import { intialgetReducer } from "../Store/Slice";
import "./Style.css";

const ItemsTable = ({ items, quantityColumn, priceColumn, name, edit }) => {
  const {admin} = useSelector((state) => state.store);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const rowIndexItems = items.map((item, index) => ({
    ...item,
    index: index + 1,
    key: item._id,
  }));

  const [api, contextHolder] = notification.useNotification();
  const openNotification = (pauseOnHover) => () => {
    api.open({
      message: "Deleting Item",
      description: "Unable to delete the item, please try again.",
      showProgress: true,
      pauseOnHover,
    });
  };

  const handleDeleteItem = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/deleteitem/${id}`);
      if (response.data.status === 200) {
        console.log("Item deleted successfully");
        dispatch(intialgetReducer());
      }
    } catch (error) {
      openNotification(true)();
      console.error("Error deleting item:", error);
    }
  };

  // Search
  const searchInput = useRef(null);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]?.toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });

  const columns = [
    {
      title: "S.No",
      dataIndex: "index",
      key: "index",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      ...getColumnSearchProps("name"),
    },
    priceColumn && {
      title: "Price",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.price - b.price,
    },
    quantityColumn && {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      sorter: (a, b) => a.quantity - b.quantity,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    (edit && admin) && {
      title: "Actions",
      key: "actions",
      fixed: "right",
      render: (_, record) => (
        <>
          {contextHolder}
          <EditOutlined
            style={{ color: "blue", cursor: "pointer", marginRight: "10px" }}
            onClick={() => navigate(`/items/edititem/${record._id}`)}
          />
          <Popconfirm
            title="Delete the item"
            description="Are you sure to delete this item?"
            onConfirm={() => handleDeleteItem(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <DeleteOutlined style={{ color: "red", cursor: "pointer" }} />
          </Popconfirm>
        </>
      ),
    },
  ].filter(Boolean);

  return (
    <div style={{ width: "90vw", overflowX: "auto", marginTop: "25px", padding: "0 5vw" }} className="items-table">
      <Table
        columns={columns}
        dataSource={rowIndexItems}
        scroll={{ x: "max-content" }}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default ItemsTable;
