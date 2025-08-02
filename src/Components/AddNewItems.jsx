import React, { useEffect, useState } from "react";
import { Typography, Button, Input, Select, notification } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { API_URL } from "../constant";
import { intialgetReducer } from "../Store/Slice";

const AddNewItems = () => {
  const dispatch = useDispatch();
  const [api, contextHolder] = notification.useNotification();
  const [newItem, setNewItem] = useState({
    name: "",
    quantity: 0,
    price: 0,
    status: "Available Soon",
  });
  const navigate = useNavigate();
  const id = useParams().id;
  const numberId = id;
  useEffect(() => {
    if (id) {
      setNewItem(item);
    } else {
      setNewItem({
        name: "",
        quantity: 0,
        price: 0,
        status: "Available Soon",
      });
    }
  }, [id]);
  const [item] = useSelector((state) =>
    state.store.items.filter((item) => item._id === id)
  );

  console.log("New Item:", newItem);

  const openNotification = (pauseOnHover) => () => {
    api.open({
      message: "Notification Title",
      description:
        "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
      showProgress: true,
      pauseOnHover,
    });
  };

  const onChangeItem = (event) => {
    event.preventDefault();
    setNewItem({
      ...newItem,
      [event.target.name]: event.target.value,
    });
  };

  const onChangeStatus = (value) => {
    const status = {
      available: "Available",
      availablesoon: "Available Soon",
      outofstock: "Out Of Stock",
    };

    setNewItem({
      ...newItem,
      status: status[value],
    });
  };

  const onReset = () => {
    setNewItem(
      item || {
        name: "",
        quantity: 0,
        price: 0,
        status: "Available Soon",
      }
    );
  };
  const onSubmit = async () => {
    openNotification(true);
    if (newItem.name.trim().length > 0) {
      // Dispatch the action to add the new item
      if (!id) {
        try {
          const response = await axios.post(`${API_URL}/postitem`, newItem);
          console.log("Item posted successfully:", response.data);
          dispatch(intialgetReducer());
          alert("New item added successfully!");
        } catch (error) {
          console.error("Error updating item:", error);
        }
      } else {
        try {
          const response = await axios.put(
            `${API_URL}/putitem/${numberId}`,
            newItem
          );
          console.log("Item updated successfully:", response.data);

          // Dispatch the initial get reducer to fetch items
          dispatch(intialgetReducer());
          alert("New item added successfully!");
        } catch (error) {
          console.error("Error updating item:", error);
        }
      }
      setNewItem({
        name: "",
        quantity: 0,
        price: 0,
        status: "Available Soon",
      });
    } else {
      alert("Please fill Atleast Item Name.");
    }
  };
  return (
    <div style={{ width: "50vw", padding: "5vh 25vw" }}>
      {contextHolder}
      <div style={{ backgroundColor: "#616264ff",color:'white', padding: "10px 20px 30px 20px", borderRadius: "10px" }}>
      <Typography.Title level={5}><span style={{color:"white"}}>Add New Item</span></Typography.Title>
      <Typography.Title level={5}><span style={{color:"white"}}>Item Name</span></Typography.Title>
      <Input
        name="name"
        value={newItem.name}
        onInput={onChangeItem}
        placeholder="Item name"
      />
      <Typography.Title level={5}><span style={{color:"white"}}>Item Quantity</span></Typography.Title>
      <Input
        name="quantity"
        value={newItem.quantity}
        onInput={onChangeItem}
        type="number"
        placeholder=""
      />
      <Typography.Title level={5}><span style={{color:"white"}}>Item Price</span></Typography.Title>
      <Input
        name="price"
        value={newItem.price}
        onInput={onChangeItem}
        type="number"
        placeholder=""
      />
      <Typography.Title level={5}><span style={{color:"white"}}>Item Status</span></Typography.Title>
      <Select
        name="status"
        value={newItem.status || "Available"}
        showSearch
        placeholder="Select a person"
        optionFilterProp="label"
        onChange={onChangeStatus}
        style={{ width: "100%" }}
        options={[
          {
            value: "available",
            label: "Available",
          },
          {
            value: "availablesoon",
            label: "Available Soon",
          },
          {
            value: "outofstock",
            label: "Out Of Stock",
          },
        ]}
      />
      <div
        style={{
          display: "flex",
          gap: "20px",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <Button color="primary" variant="solid" onClick={onSubmit}>
          {" "}
          {id ? "Update Item" : "Add Item"}   
        </Button>
        <Button color="danger" variant="solid" onClick={onReset}>
          Reset
        </Button>
        <Button
          color="default"
          variant="solid"
          onClick={() => navigate("/items/allitems")}
        >
          Canel
        </Button>
      </div></div>
    </div>
  );
};

export default AddNewItems;
