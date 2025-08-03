import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { intialgetReducer } from "../Store/Slice";
import { useEffect } from "react";
import { Button, notification, Spin } from "antd";
import  './Style.css'

  const styles = {
    
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
    padding: "0 20px",
    marginTop: "400px",
  },
  heading: {
    fontSize: "3rem",
    color: "#333",
    marginBottom: "20px",
  },
  subtext: {
    fontSize: "1.2rem",
    color: "black",
    marginBottom: "30px",
  },
  button: {
    padding: "12px 24px",
    fontSize: "1rem",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

const WelcomePage = () => {
  const { getLoader } = useSelector((state) => state.store);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Dispatch the initial get reducer to fetch items
  useEffect(() => {
    dispatch(intialgetReducer());
  }, []);
  useEffect(() => {
    if (getLoader) {
      openNotification(true)();
    }
  }, [getLoader]);

  const [api, contextHolder] = notification.useNotification();
  const openNotification = (pauseOnHover) => () => {
    api.open({
      message: "Fetching Data",
      description: "Please wait,Getting Data From Store.",
      showProgress: true,
      pauseOnHover,
    });
  };
  return (
    <div style={styles.container} className="welcome-page">
      {contextHolder}
      <h2 style={styles.heading}>Welcome to My Stationary Shop</h2>
      <p style={styles.subtext}>
        Discover a variety of quality stationery items for all your needs.
      </p>
      {getLoader ? (
        <Spin size="large"></Spin>
      ) : (
        <Button
          color="primary"
          variant="solid"
          onClick={() => {
            navigate("/items/availableitems");
          }}
        >
          Explore Products
        </Button>
      )}
    </div>
  );
};

export default WelcomePage;
